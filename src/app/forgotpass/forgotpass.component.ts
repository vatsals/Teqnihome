import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  userImg: string;
  sent: boolean;
  
  user = {
    email: ''
  }

  constructor(private router:Router) {
    this.userImg = '/assets/images/user.png';
    this.sent = false;
  }

  ngOnInit() {
  }

  onSubmit({value, valid}) {
    this.sent = true;
    if(valid) {
      // console.log(value);
    }
    else {
      console.log('Form Invalid');
    }
  }

}
