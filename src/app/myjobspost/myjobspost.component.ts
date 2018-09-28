import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';

@Component({
  selector: 'app-myjobspost',
  templateUrl: './myjobspost.component.html',
  styleUrls: ['./myjobspost.component.css']
})
export class MyjobspostComponent implements OnInit {
  userImg: string;
  p: number;
  myJobs = [];
  
  constructor(private dragulaService: DragulaService, private router:Router, private dataService:DataService) {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
    this.myJobs = [];
  	this.dataService.myJobs()
      .subscribe(
            data => {
                this.myJobs = data;
              }
        );
  }

  routeOne(id) {
  	this.router.navigate(['editoffer', id]);
  }

  routeTwo(id) {
  	this.dataService.jobDelete(id)
      .subscribe(
            data => {
                alert('Job Deleted');
                this.ngOnInit();
              }
        );
  }

  routeThree(id) {
  	this.router.navigate(['showoffer', id]);
  }

}
