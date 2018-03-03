import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumesearch',
  templateUrl: './resumesearch.component.html',
  styleUrls: ['./resumesearch.component.css']
})
export class ResumesearchComponent implements OnInit {
  userImg: string;
  
  constructor() {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  }

}
