import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  username: string;
  password: string;
  logo: any;
  carduserId: string;
  cardReq: number;matchedJob: number; friendReq: number; interviewReq: number; refreeReq: number; 
  referenceReq: number;
  tokenParam: TokenParams;
  @ViewChild('alert') alt;
  @ViewChild('alertSucc') altSucc;
  @ViewChild('umail') umail;
  @ViewChild('upass') upass;
  @ViewChild('navRemove') navRemove;

  user = {
    email: '',
    password: ''
  }
  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute) { 
    this.loggedIn  = false;
    this.logo = '/assets/images/logo.png';
  }

  ngOnInit() {
    this.setNav();
  }

  keyDownFunction(event) {
      if(event.keyCode == 13) {
      
      }
    }

  setNav() {
    this.dataService.cardRequests(this.dataService.accessToken)
      .subscribe(
            data => {
              this.cardReq = data.cardRequest;
              this.matchedJob = data.matchedJob;
              this.friendReq = data.friendRequest;
              this.interviewReq = data.interviewRequest;
              this.refreeReq = data.refereeRequest;
              this.referenceReq = data.referenceRequest;
              }
        );
       this.dataService.cardShow(this.dataService.accessToken)
      .subscribe(
            data => {
                if(data.card!=null) {
                  this.carduserId = data.card.userId;
                }
                else {
                  this.carduserId = 'User';
                }
              }
        );
  }

  navGo(e) {
    this.router.navigate([e.target.id]);
  }

  onSubmit({value, valid}) {
    this.dataService.login(value.email, value.password)
      .subscribe(
            data => {
              this.dataService.accessToken = 'bearer ' + data.access_token;
              var tok = 'bearer ' + data.access_token;
             if(this.dataService.accessToken) {
                localStorage.setItem('user', JSON.stringify({ logged: true, token: tok}));
                this.alt.nativeElement.style.display = 'none';
                this.altSucc.nativeElement.style.display = 'flex';
                setTimeout(()=>{ 
                    this.altSucc.nativeElement.style.display = 'none';
               },200);
                location.reload();
              }
            },
            err => {
                this.alt.nativeElement.style.display = 'flex';
                setTimeout(()=>{ 
                    this.alt.nativeElement.style.display = 'none';
               },8000);
            }
        );
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('sign');
    return localStorage.removeItem('user');
  }

  goto(event) {
    this.navRemove.nativeElement.classList.remove('in');
  	this.router.navigate([event]);
  }

}
