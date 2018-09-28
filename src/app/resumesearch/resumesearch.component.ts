import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-resumesearch',
  templateUrl: './resumesearch.component.html',
  styleUrls: ['./resumesearch.component.css']
})
export class ResumesearchComponent implements OnInit {
  userImg: string;
  p: number;
  myResumes = [];
  myJobs = [];
  @ViewChild('myBn') myBn;
  @ViewChild('sterm') sterm;
  @ViewChild('resid') resid;
  @ViewChild('linkOne') linkOne;

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute) {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  }

  search() {
    this.myResumes = [];
    this.myJobs = [];
  	var k = { "searchTerm": this.sterm.nativeElement.value };
  	this.dataService.searchResume(k)
      .subscribe(
            data => {
                for(var i=0;i<data.content.length;i++) {
                  this.myResumes.push(data.content[i]);
                } 
              }
        );
      this.dataService.allJobs()
      .subscribe(
            data => {
              this.myJobs = data;
            }
       );
  }

  viewRes(id) {
  	this.router.navigate(['resume', id]);
  }

  shortRes(id) {
    this.resid.nativeElement.value = id;
    this.myBn.nativeElement.click();
  }

  shortResFinal() {
    this.dataService.shortResume(this.resid.nativeElement.value, this.linkOne.nativeElement.value)
      .subscribe(
            data => {
              alert('Shortlisted');
              this.search();
            }
       );
      
  }

}
