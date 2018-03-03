import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friendspage',
  templateUrl: './friendspage.component.html',
  styleUrls: ['./friendspage.component.css']
})
export class FriendspageComponent implements OnInit {
  userImg: string;

  constructor() {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  }

}
