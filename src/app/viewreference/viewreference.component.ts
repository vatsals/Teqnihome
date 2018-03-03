import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewreference',
  templateUrl: './viewreference.component.html',
  styleUrls: ['./viewreference.component.css']
})
export class ViewreferenceComponent implements OnInit {
  userImg: string;
  
  constructor() {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  }

}
