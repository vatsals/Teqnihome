import { Component, OnInit, ViewChild } from '@angular/core';
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
  }

  ngOnInit() {
  }

  onSubmit({value, valid}) {
    this.dataService.login(value.email, value.password)
      .subscribe(
            data => {
              this.tokenParam = data;
              this.dataService.accessToken = this.tokenParam.token;
              console.log(this.dataService.accessToken);
            }
        );

    // if(valid) {
    //   // console.log(value);
    //   if(value.email=='v@v.com' && value.password=='admin123') {
    //     this.loggedIn = true;
    //     this.alt.nativeElement.style.display = 'none';
    //     this.altSucc.nativeElement.style.display = 'flex';
    //     setTimeout(()=>{ 
    //         this.altSucc.nativeElement.style.display = 'none';
    //    },8000);
    //   }
    //   else {
    //     this.alt.nativeElement.style.display = 'flex';
    //     setTimeout(()=>{ 
    //         this.alt.nativeElement.style.display = 'none';
    //    },8000);
    //   }
    // }
    // else {
    //   console.log('Form Invalid');
    // }
  }

  logout(event) {
    this.loggedIn = false;
  }

  goto(event) {
  	// var target = event.target || event.srcElement || event.currentTarget;
   //  var idAttr = target.attributes.id;
   //  var value = idAttr.nodeValue;
  	// console.log(value);
    this.navRemove.nativeElement.classList.remove('in');
  	this.router.navigate([event]);
  }

}
