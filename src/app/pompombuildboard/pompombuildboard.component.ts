import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-pompombuildboard',
  templateUrl: './pompombuildboard.component.html',
  styleUrls: ['./pompombuildboard.component.css']
})
export class PompombuildboardComponent implements OnInit {
  userImg: string;
  blankImg: string;
  projs = [];
  emps = [];
  sprints = [];
  myLists: any;
  created: any;
  updated: any;
  progress: any;
  remain: any;
  estimated: any;
  id: any; 
  sub: any;

  constructor(private router:Router, private dataService:DataService, private route: ActivatedRoute) { 
  	this.userImg = '/assets/images/user.png';
  	this.blankImg = '/assets/images/blank.jpg';
  }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
       this.id = params.id;
    });
  }

  report() {
    this.router.navigate(['burndown']);
  }

}
