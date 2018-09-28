import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';

@Component({
  selector: 'app-cardreq',
  templateUrl: './cardreq.component.html',
  styleUrls: ['./cardreq.component.css']
})
export class CardreqComponent implements OnInit {
  userImg: string;
  p: number;

  myFriends = [];

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute) {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
    this.dataService.cardReqRec(this.dataService.accessToken)
      .subscribe(
            data => {
            	this.myFriends = data.content;
              }
        );
  }

  edit() {
  	this.router.navigate(['card/editcard']);
  }

  confirm(id) {
  	this.dataService.cardReqAcc(id)
      .subscribe(
            data => {
            	alert('Request accepted');
            	this.dataService.cardReqRec(this.dataService.accessToken)
			      .subscribe(
			            data => {
			            	this.myFriends = data.content;
			              }
			        );
              }
        );
  }

  delete(id) {
  	this.dataService.cardReqRem(id)
      .subscribe(
            data => {
            	alert('Request rejected');
            	this.dataService.cardReqRec(this.dataService.accessToken)
			      .subscribe(
			            data => {
			            	this.myFriends = data.content;
			              }
			        );
              }
        );
  }

}
