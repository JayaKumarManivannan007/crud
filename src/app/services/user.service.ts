import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private data: User[] = [
    { id:1, name:'Jese Leos', role:'Administrator', status:'Active', social:['f','o','t','g'], promote:false, rating:4.7, lastLogin:'2022-11-20' },
    { id:2, name:'Bonnie Green', role:'Viewer', status:'Active', social:['f','o','t','g'], promote:true, rating:3.9, lastLogin:'2022-11-23' },
    { id:3, name:'Leslie Livingston', role:'Moderator', status:'Inactive', social:['f','o'], promote:false, rating:4.8, lastLogin:'2022-11-19' },
    { id:4, name:'Micheal Gough', role:'Moderator', status:'Active', social:['f','o','t','g'], promote:true, rating:5.0, lastLogin:'2022-11-27' },
    { id:5, name:'Joseph McFall', role:'Viewer', status:'Active', social:['f','o','t','g'], promote:false, rating:4.2, lastLogin:'2022-11-20' },
    { id:6, name:'Robert Brown', role:'Viewer', status:'Inactive', social:['f','o'], promote:false, rating:4.5, lastLogin:'2022-11-20' },
    { id:7, name:'Karen Nelson', role:'Viewer', status:'Inactive', social:['f','o','t','g'], promote:false, rating:4.1, lastLogin:'2022-11-18' },
    { id:8, name:'Helene Engels', role:'Moderator', status:'Active', social:['f','o','t','g'], promote:true, rating:3.8, lastLogin:'2022-11-27' },
    { id:9, name:'Lana Byrd', role:'Viewer', status:'Active', social:['f','o'], promote:false, rating:4.8, lastLogin:'2022-11-20' },
    { id:10, name:'Neil Sims', role:'Moderator', status:'Inactive', social:['f','o'], promote:false, rating:5.0, lastLogin:'2022-11-20' }
  ];

  private subject = new BehaviorSubject<User[]>(this.data);
  public users$ = this.subject.asObservable();

  list(): Observable<User[]> { return this.users$; }

  create(user: Partial<User>) {
    const id = Math.max(0, ...this.data.map(d=>d.id)) + 1;
    const newUser: User = { id, name: user.name || '', role: user.role || 'Viewer', status: user.status || 'Active', social: user.social || [], promote: !!user.promote, rating: user.rating || 0, lastLogin: user.lastLogin || '' };
    this.data = [newUser, ...this.data];
    this.subject.next(this.data);
    return newUser;
  }

  update(id: number, patch: Partial<User>) {
    this.data = this.data.map(u => u.id === id ? { ...u, ...patch } : u);
    this.subject.next(this.data);
    return this.data.find(u=>u.id===id);
  }

  delete(id: number) {
    this.data = this.data.filter(u=>u.id !== id);
    this.subject.next(this.data);
  }

  getById(id: number) {
    return this.data.find(u => u.id === id) || null;
  }
}
