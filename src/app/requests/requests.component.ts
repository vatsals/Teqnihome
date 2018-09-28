import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  userImg: string;
  p: number;
  user1 = [];
  user2 = [];
  @ViewChild('recd') recd;
  @ViewChild('recId') recId;
  @ViewChild('frdId') frdId;
  @ViewChild('frid') frid;
  @ViewChild('uterm') uterm;
  @ViewChild('fname') fname;
  @ViewChild('fType') fType;

  myFriends = [];
  myFriends2 = [];

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
    this.dataService.friendRequests(this.dataService.accessToken)
      .subscribe(
            data => {
                this.myFriends = data;
              }
        );
      this.dataService.myFriends(this.dataService.accessToken)
      .subscribe(
            data => {
                this.myFriends2 = data;
              }
        );
  }

  confirm(e, id) {
    var i = (<HTMLInputElement>document.getElementById(id)).value;
    var k = {
      "friendName": e.target.id, 
      "friendType": i
    };
    this.dataService.confirmRequest(k)
      .subscribe(
            data => {
                alert('Now you are friends with ' + e.target.id);
                this.dataService.friendRequests(this.dataService.accessToken)
                .subscribe(
                      data => {
                          this.myFriends = data;
                        }
                  );
              }
        );
  }

  deleteFriend(e) {
    var k = e.target.id;
    this.dataService.friendDelete(k)
      .subscribe(
            data => {
                alert('Removed ' + e.target.id + ' from your friend list');
              }
        );
  }

  dispRec() {
    this.recd.nativeElement.style.display = 'block';
    this.recId.nativeElement.style.fontWeight = '600';
    this.recId.nativeElement.style.fontSize = '15px';
    this.frdId.nativeElement.style.fontWeight = '200';
    this.frdId.nativeElement.style.fontSize = '14px';
    this.frid.nativeElement.style.display = 'none';
  }

  dispFrd() {
    this.frid.nativeElement.style.display = 'flex';
    this.recId.nativeElement.style.fontWeight = '200';
    this.recId.nativeElement.style.fontSize = '14px';
    this.frdId.nativeElement.style.fontWeight = '600';
    this.frdId.nativeElement.style.fontSize = '15px';
    this.recd.nativeElement.style.display = 'none';
  }

}
