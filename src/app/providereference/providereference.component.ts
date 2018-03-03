import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-providereference',
  templateUrl: './providereference.component.html',
  styleUrls: ['./providereference.component.css']
})
export class ProvidereferenceComponent implements OnInit {
  userImg: string;
  
  constructor() {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  }

}
