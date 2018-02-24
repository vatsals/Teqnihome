import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  userImg: string;
  
  constructor() {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  }

  dispRec() {
  	document.getElementById('received').style.display = 'block';
  	document.getElementById('recId').style.fontWeight = '600';
  	document.getElementById('recId').style.fontSize = '15px';
  	document.getElementById('frdId').style.fontWeight = '200';
  	document.getElementById('frdId').style.fontSize = '14px';
  	document.getElementById('friends').style.display = 'none';
  }

  dispFrd() {
  	document.getElementById('friends').style.display = 'block';
  	document.getElementById('recId').style.fontWeight = '200';
  	document.getElementById('recId').style.fontSize = '14px';
  	document.getElementById('frdId').style.fontWeight = '600';
  	document.getElementById('frdId').style.fontSize = '15px';
  	document.getElementById('received').style.display = 'none';
  }

}
