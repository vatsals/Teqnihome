import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';
import { FilterPipe } from '../filter.pipe';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.component.html',
  styleUrls: ['./searchuser.component.css'],
  providers: [FilterPipe]
})
export class SearchuserComponent implements OnInit {
  userImg: string;
  p: number;
  @ViewChild('searchterm') sterm;
  @ViewChild('uterm') uterm;
  @ViewChild('fType') fType;
  myArray = [ {
  	name: 'Vatsal',
  	img: '/assets/images/user.png',
  	mail: 'vatsal@gmail.com',
  	req: 'Send Request'
  }, 
  {
  	name: 'Arvind',
  	img: '/assets/images/user.png',
  	mail: 'arvind@g.com',
  	req: 'Request Approved'
  },
  {
  	name: 'Rachit',
  	img: '/assets/images/user.png',
  	mail: 'vatsal@gmail.com',
  	req: 'Approval Pending'
  }, 
  {
  	name: 'Nikhil',
  	img: '/assets/images/user.png',
  	mail: 'arvind@g.com',
  	req: 'Request Approved'
  },
  {
  	name: 'Guryash',
  	img: '/assets/images/user.png',
  	mail: 'vatsal@gmail.com',
  	req: 'Send Request'
  }, 
  {
  	name: 'Harshit',
  	img: '/assets/images/user.png',
  	mail: 'arvind@g.com',
  	req: 'Request Approved'
  }
  ];
  userExist: boolean;
  userMsg: boolean;
  myFriends: any;
  imgArr = [];

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
  	this.userImg = '/assets/images/user.png';
    this.userExist = false;
    this.userMsg = false;
  }

  ngOnInit() {
  }

  card(link) {
    this.router.navigate(['/specard', link]);
  }

  search() {
    this.userExist = false;
    this.userMsg = false;
    var k = { "name": this.sterm.nativeElement.value };
    this.dataService.search(k)
      .subscribe(
            data => {
                this.myFriends = data;
                this.myFriends = this.myFriends.views;
                if(this.myFriends.length>0) {
                  this.userExist = true;
                  this.userMsg = false;
                  for(var s=0;s<this.myFriends.length;s++) {
                    if(this.myFriends[s].card.cardImage) {
                       this.imgArr[s] = 'data:image/*;base64,' + this.myFriends[s].card.cardImage;
                       this.imgArr[s] = this.sanitizer.bypassSecurityTrustUrl(this.imgArr[s]);
                    }
                    else {
                      this.imgArr[s] = '/assets/images/user.png';
                    }
                  }
                }
                else {
                  this.userExist = false;
                  this.userMsg = true;
                }
              },
            err => {
              // alert('No user found');
            }
        );
  }

  sendReq() {
    var k = {
              "friend": {
                "username": this.uterm.nativeElement.innerText
              },
              "friendType": this.fType.nativeElement.value
            };
    this.dataService.sendRequest(k)
      .subscribe(
            data => {
                
              }
        );
  }

}
