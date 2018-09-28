import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
//import { TokenParams } from '../Classes/TokenParams';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  userImg: string;
  sent: boolean;
  inval: boolean;
  dupl: boolean;
  //tokenParam: TokenParams;
  
  user = {
    email: ''
  }

  constructor(private router:Router, private dataService:DataService) {
    this.userImg = '/assets/images/user.png';
    this.sent = false;
    this.inval = false;
    this.dupl = false;
  }

  ngOnInit() {
  }

  onSubmit({value, valid}) {
    if(value.email!='') {
      this.sent = true;
      this.inval = false;
      this.dupl = false;
    }
    // this.dataService.forgotmail(value.email)
    //   .subscribe(
    //         data => {
    //           this.sent = true;
    //           this.inval = false;
    //           this.dupl = false;
    //         },
    //         err => {
    //           if(err.status==401) {
    //             this.inval = false;
    //             this.sent = false;
    //             this.dupl = true;
    //           }
    //           else {
    //             this.inval = true;
    //             this.sent = false;
    //             this.dupl = false;
    //           }
    //         }
    //     );
  }

}
