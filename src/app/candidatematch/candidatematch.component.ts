import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';

@Component({
  selector: 'app-candidatematch',
  templateUrl: './candidatematch.component.html',
  styleUrls: ['./candidatematch.component.css']
})
export class CandidatematchComponent implements OnInit {
  userImg: string;
  p: number;
  @ViewChild('linkOne') linkOne;
  myJobs = [];
  myCands = [];

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute) {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  	this.dataService.allJobs()
      .subscribe(
            data => {
              this.myJobs = data;
              var val = this.myJobs[0].id;
              this.dataService.offerMatch(val)
              .subscribe(
                    data => {
                        for(var i=0;i<data.content.length;i++) {
                          this.myCands.push(data.content[i]);
                        }
                      }
                );
              }
        );
  }

  onLinkChange(val) {
    this.myCands = [];
    this.dataService.offerMatch(val)
      .subscribe(
            data => {
                for(var i=0;i<data.content.length;i++) {
                  this.myCands.push(data.content[i]);
                } 
              }
        );
  }

  viewRes(id) {
  	this.router.navigate(['specresume', id]);
  }

}
