import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myjobspost',
  templateUrl: './myjobspost.component.html',
  styleUrls: ['./myjobspost.component.css']
})
export class MyjobspostComponent implements OnInit {
  userImg: string;
  
  constructor() {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  }

}
