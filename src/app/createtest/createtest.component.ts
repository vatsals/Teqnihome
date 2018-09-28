import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-createtest',
  templateUrl: './createtest.component.html',
  styleUrls: ['./createtest.component.css']
})
export class CreatetestComponent implements OnInit {
  userImg: string;
  years = [];
  ind: number;
  ind2: number;
  myLists = [];
  myLists2 = [];
  sVis: boolean;
  sVis2: boolean;
  @ViewChild('myId') myId;
  @ViewChild('grade') gd;
  @ViewChild('testname') testname;
  @ViewChild('type') type;

  constructor(private router:Router, private dataService:DataService) {
  	this.sVis = false;
  	this.sVis2 = false;
  	this.ind = 1;
  	this.myLists = [
  	{
  		"id": this.ind
  	}
  	];
  	this.ind2 = 1;
  	this.myLists2 = [
  	{
  		"id": this.ind2
  	}
  	];
  }

  ngOnInit() {
  }

  addRowMain() {
  	this.ind = this.ind + 1;
  	this.myLists.push({
  		"id": this.ind
  	});
  }

  addRowMain2() {
  	this.ind2 = this.ind2 + 1;
  	this.myLists2.push({
  		"id": this.ind2
  	});
  }

  removeRow(e) {
  	for(var i = this.myLists.length - 1; i >= 0; i--) {
        if(parseInt(this.myLists[i].id) == parseInt(e.target.id)) {
           this.myLists.splice(i, 1);
        }
    }
  }

  removeRow2(e) {
  	for(var i = this.myLists2.length - 1; i >= 0; i--) {
        if(parseInt(this.myLists2[i].id) == parseInt(e.target.id)) {
           this.myLists2.splice(i, 1);
        }
    }
  }

  onSubmitForm(e) {
    if(!this.sVis) var type = "SUBJECTIVE";
    else var type = "OBJECTIVE";
  	var k = {
      "name": this.testname.nativeElement.value, 
      "type": type
    }
    //console.log(k);
    this.dataService.addsTest(k)
      .subscribe(
            data => {
              alert('Test Added Successfully');
            }
        );
  }

  fetchYes() {
    this.sVis = true;
    this.sVis2 = false;
  }

  fetchNo() {
    this.sVis = false;
    this.sVis2 = true;
  }

}
