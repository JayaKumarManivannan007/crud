import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit, OnDestroy {
    Math = Math; 
users: User[] = [];
  filtered: User[] = [];
  subs: Subscription[] = [];
  q = '';
  page = 1;
  perPage = 10;
  total = 0;
  selected = new Set<number>();
  // modal state
  showForm = false;
  editing: User | null = null;
  showConfirm = false;
  confirmId: number | null = null;

  constructor(public svc: UserService) {}

  ngOnInit() {
    this.subs.push(this.svc.list().subscribe(users => {
      this.users = users;
      this.applyFilter();
    }));
    window.addEventListener('open-add-user', this.openAddHandler);
  }
  ngOnDestroy(){
    this.subs.forEach(s=>s.unsubscribe());
    window.removeEventListener('open-add-user', this.openAddHandler);
  }

  private openAddHandler = () => this.openAdd();

  applyFilter(){
    const q = this.q.trim().toLowerCase();
    this.filtered = this.users.filter(u => !q || u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q));
    this.total = this.filtered.length;
    if ((this.page-1)*this.perPage >= this.total) this.page = 1;
  }

  pageItems(): User[] {
    const start = (this.page-1)*this.perPage;
    return this.filtered.slice(start, start + this.perPage);
  }

  toggleSelect(id: number, e: Event){
    const checked = (e.target as HTMLInputElement).checked;
    if (checked) this.selected.add(id); else this.selected.delete(id);
  }

  selectAll(e: Event){
    const check = (e.target as HTMLInputElement).checked;
    if (check) this.pageItems().forEach(i => this.selected.add(i.id)); else this.selected.clear();
  }

  // modal operations
  openAdd(){
    this.editing = null;
    this.showForm = true;
  }
  openEdit(u: User){
    this.editing = { ...u };
    this.showForm = true;
  }
  closeForm(refresh = false){
    this.showForm = false;
    this.editing = null;
    if (refresh) this.applyFilter();
  }
  saveUser(user: User){
    if (user.id) {
      this.svc.update(user.id, user);
    } else {
      this.svc.create(user);
    }
    this.closeForm(true);
  }

  askDelete(id: number){
    this.confirmId = id;
    this.showConfirm = true;
  }
  confirmDelete(doDelete: boolean){
    if (doDelete && this.confirmId!=null){
      this.svc.delete(this.confirmId);
      this.selected.delete(this.confirmId);
      this.applyFilter();
    }
    this.confirmId = null;
    this.showConfirm = false;
  }

  togglePromote(u: User){
    this.svc.update(u.id, { promote: !u.promote });
  }

  bulkDelete(){
    const ids = Array.from(this.selected);
    ids.forEach(id => this.svc.delete(id));
    this.selected.clear();
    this.applyFilter();
  }

  changePage(p: number){ if (p>=1 && p<=Math.ceil(this.total/this.perPage)) this.page = p; }

  avatarGradient(id: number){
  // deterministic simple gradients by id
  const arr = ['#fbc2eb,#a18cd1', '#f6d365,#fda085', '#c1fba4,#7bdcb5', '#a1c4fd,#c2e9fb'];
  return `linear-gradient(135deg, ${arr[id%arr.length]})`;
}


}
