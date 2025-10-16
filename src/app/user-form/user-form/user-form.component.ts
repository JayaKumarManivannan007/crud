import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    @Input() user: User | null = null;
  @Output() close = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<User>();

  model: User = { id:0, name:'', role:'Viewer', status:'Active', social:[], promote:false, rating:0, lastLogin:'' };

  ngOnInit(){
    if (this.user) this.model = { ...this.user };
  }

  submit(){
    // basic validation
    if (!this.model.name) return alert('Name required');
    this.save.emit(this.model);
  }
  doClose(){ this.close.emit(false); }

}
