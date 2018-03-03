import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidatematch',
  templateUrl: './candidatematch.component.html',
  styleUrls: ['./candidatematch.component.css']
})
export class CandidatematchComponent implements OnInit {
  userImg: string;
  
  constructor() {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  }

}
