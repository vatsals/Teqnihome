import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';

@Component({
  selector: 'app-viewreference',
  templateUrl: './viewreference.component.html',
  styleUrls: ['./viewreference.component.css']
})
export class ViewreferenceComponent implements OnInit {
  userImg: string;
  p: number;
  myRefers = [];
  allRefers = [];
  allDetails = [];
  sTime = [];
  eTime = [];
  @ViewChild('myBn') myBn;
  
  constructor(private dragulaService: DragulaService, private router:Router, private dataService:DataService) {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  	this.dataService.viewRefer()
        .subscribe(
              data => {
                this.myRefers = data;
              }
          );
  }

  viewRes(id) {
  	this.router.navigate(['specresume', id]);
  }

  openRef(appid, resid) {
    this.dataService.referAll(appid, resid)
        .subscribe(
              data => {
                this.allRefers = data.references;
                this.allDetails = data.details;
                var i, sT, eT;
                if(this.allDetails) {
                  for(i=0;i<this.allDetails.length;i++) {
                     sT = this.allDetails[i].employmentStartDate;
                     this.sTime[i] = new Date(sT).toDateString();
                     eT = this.allDetails[i].employmentEndDate;
                     this.eTime[i] = new Date(eT).toDateString();
                  }
                }
              }
          );
    this.myBn.nativeElement.click();
  }

}
