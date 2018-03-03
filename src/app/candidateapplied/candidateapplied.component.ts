import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidateapplied',
  templateUrl: './candidateapplied.component.html',
  styleUrls: ['./candidateapplied.component.css']
})
export class CandidateappliedComponent implements OnInit {
  userImg: string;
  
  constructor() {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  }

}
