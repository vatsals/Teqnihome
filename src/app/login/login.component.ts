import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn: boolean;
  conf: boolean;
  sent: boolean;
  userImg: string;
  username: string;
  password: string;
  userp: boolean;
  userc: boolean;
  matchp: boolean;
  matchc: boolean;
  captcha: any;
  tokenParam: TokenParams;
  @ViewChild('userPassword') userPassword;
  
  user = {
    name: '',
    email: '',
    password: '',
    confpassword: ''
  }

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute) { 
    this.loggedIn  = false;
    this.userp  = false;
    this.conf  = false;
    this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
    
  }

  onSubmit({value, valid}) {
    // console.log(this.captcha);
    this.dataService.signUp(value.name, value.password, value.email, this.captcha)
      .subscribe(
            data => {
              this.sent = true;
            },
            err => {
              this.sent = false;
            }
        );
  }

  checkStrength(event) {
    if(event.match(/^(?=.*[a-z])(?=.)(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)) {
      this.userc  = true;
      this.userp  = false;
    }
    else {
      this.userc  = false;
      if(event.length>0) {
        this.userp  = true;
      }
      else {
        this.userp  = false;
      }
    }
  }

  checkPass(event, value) {
    // console.log(event);
    if(event == value) {
      this.conf  = true;
    }
    else {
      this.conf  = false;
    }
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

}
