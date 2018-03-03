import { Component, OnInit } from '@angular/core';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.component.html',
  styleUrls: ['./searchuser.component.css'],
  providers: [FilterPipe]
})
export class SearchuserComponent implements OnInit {
  userImg: string;
  myArray = [ {
  	name: 'Vatsal',
  	img: '/assets/images/user.png',
  	mail: 'vatsal@gmail.com',
  	req: 'Send Request'
  }, 
  {
  	name: 'Arvind',
  	img: '/assets/images/user.png',
  	mail: 'arvind@g.com',
  	req: 'Request Approved'
  },
  {
  	name: 'Rachit',
  	img: '/assets/images/user.png',
  	mail: 'vatsal@gmail.com',
  	req: 'Approval Pending'
  }, 
  {
  	name: 'Nikhil',
  	img: '/assets/images/user.png',
  	mail: 'arvind@g.com',
  	req: 'Request Approved'
  },
  {
  	name: 'Guryash',
  	img: '/assets/images/user.png',
  	mail: 'vatsal@gmail.com',
  	req: 'Send Request'
  }, 
  {
  	name: 'Harshit',
  	img: '/assets/images/user.png',
  	mail: 'arvind@g.com',
  	req: 'Request Approved'
  }
  ];

  constructor() {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  }

}
