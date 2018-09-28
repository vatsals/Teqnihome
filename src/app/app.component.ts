import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {
  	localStorage.setItem('sign', JSON.stringify({ sig: true}));
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  signUp() {
    return JSON.parse(localStorage.getItem('sign'));
  }
}
