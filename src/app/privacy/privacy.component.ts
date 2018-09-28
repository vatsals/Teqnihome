import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  userImg: string;
  p: number;
  myFriends = [];

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute) {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  	var k = { "fieldsRequested": "homeAddressPrivacy" };
    this.dataService.cardReqFields(k)
      .subscribe(
            data => {
            	this.myFriends = data.content;
              }
        );
  }

  onChange(val) {
    var k = { "fieldsRequested": val };
    this.dataService.cardReqFields(k)
      .subscribe(
            data => {
            	this.myFriends = data.content;
              }
        );
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
