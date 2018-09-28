import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';

@Component({
  selector: 'app-jobsearch',
  templateUrl: './jobsearch.component.html',
  styleUrls: ['./jobsearch.component.css']
})
export class JobsearchComponent implements OnInit {
  userImg: string;
  p: number;
  @ViewChild('searchterm') sterm;
  myJobs = [];
  dates = [];
  
  constructor(private dragulaService: DragulaService, private router:Router, private dataService:DataService) {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {

  }

  search() {
  	var k = { "searchTerm": this.sterm.nativeElement.value };
  	this.dataService.jobSearch(k)
      .subscribe(
            data => {
              	for(var i=0;i<data.content.length;i++) {
              		this.myJobs.push(data.content[i]);
                  var date = new Date(this.myJobs[i].created);
                  var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
                  var day = ("0" + date.getDate()).slice(-2);
                  this.dates[i] = [day, mnth,date.getFullYear()].join("/");
              	}
              }
        );
  }

  routeOne(e) {
  	this.router.navigate(['/showoffer', e.target.id]);
  }

  apply(e) {
    this.dataService.offerApply(e.target.id)
      .subscribe(
            data => {
                alert('Applied');
              }
        );
  }

  routeThree(e) {
  	this.router.navigate(['']);
  }

}
