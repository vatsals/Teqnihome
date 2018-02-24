import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matchedjobs',
  templateUrl: './matchedjobs.component.html',
  styleUrls: ['./matchedjobs.component.css']
})
export class MatchedjobsComponent implements OnInit {
  userImg: string;
  
  constructor() {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  }

}
