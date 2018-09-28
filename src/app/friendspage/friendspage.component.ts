import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';

@Component({
  selector: 'app-friendspage',
  templateUrl: './friendspage.component.html',
  styleUrls: ['./friendspage.component.css']
})
export class FriendspageComponent implements OnInit {
  userImg: string;
  p: number;

  myFriends = [];

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute) {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  	this.dataService.myFriends(this.dataService.accessToken)
      .subscribe(
            data => {
              	this.myFriends = data;
              }
        );
  }

  card(link) {
    this.router.navigate(['/specard', link]);
  }

  deleteFriend(e) {
  	var k = e.target.id;
  	this.dataService.friendDelete(k)
      .subscribe(
            data => {
              	alert('Removed ' + e.target.id + ' from your friend list');
              	this.dataService.myFriends(this.dataService.accessToken)
			      .subscribe(
			            data => {
			              	this.myFriends = data;
			              }
			        );
              }
        );
  }
}
