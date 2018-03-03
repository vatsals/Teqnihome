import { Component, OnInit } from '@angular/core';
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
  userImg: string;
  username: string;
  password: string;
  tokenParam: TokenParams;
  
  user = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute) { 
    this.loggedIn  = false;
    this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
    // console.log(this.activeRoute.snapshot.params);
    // console.log(this.dataService.myData);
    // console.log(this.dataService.fetchData());
  }

  onSubmit({value, valid}) {
    if(valid) {
      // console.log(value);
    }
    else {
      console.log('Form Invalid');
    }
  }

}
