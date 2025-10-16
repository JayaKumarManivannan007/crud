import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
openAdd() {
    window.dispatchEvent(new CustomEvent('open-add-user'));
  }
  onSettings(){ alert('Table settings - placeholder'); }
}
