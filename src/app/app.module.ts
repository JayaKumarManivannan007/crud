import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { UserFormComponent } from './user-form/user-form/user-form.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete/confirm-delete.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
     AppComponent,
    UsersTableComponent,
    UserFormComponent,
    ConfirmDeleteComponent
  ],
  imports: [
     BrowserModule,
    FormsModule
  ],
   providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
