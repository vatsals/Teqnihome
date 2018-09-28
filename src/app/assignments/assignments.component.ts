import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  userImg: string;
  p: number;
  years = [];
  ind: number;
  ind2: number;
  marks: any;
  m2: any;
  myLists = [];
  questions = [];
  myListsMain = [];
  sVis: boolean;
  sVis2: boolean;
  @ViewChild('myId') myId;
  @ViewChild('grade') gd;
  @ViewChild('fDate') fDate;
  @ViewChild('gid2') gid2;
  @ViewChild('gradeId') gradeId;
  @ViewChild('subId') subId;
  @ViewChild('divId') divId;
  @ViewChild('gid') gid;
  @ViewChild('lastdate') lastdate;
  @ViewChild('duration') duration;
  @ViewChild('scoreFinal') scoreFinal;

  constructor(private router:Router, private dataService:DataService) {
  	this.sVis = false;
  	this.sVis2 = false;
    this.dataService.assignLists()
      .subscribe(
            data => {
              for(var i=0;i<data.length;i++) {
              	var k = {};
              	k = data[i].test;
              	k["aid"] = data[i].id;
              	k["aby"] = data[i].assignedUser;
                this.myLists.push(k);
              }
            }
        );
  }

  ngOnInit() {
  }

  fetchTest(e) {
  	this.questions = [];
  	this.myId.nativeElement.value = e.target.id;
  	document.getElementById('received').style.display = 'block';
    document.getElementById('tab').style.display = 'none';
    this.dataService.assignedTestSpecResp(e.target.id)
      .subscribe(
            data => {
            	console.log(data);
              if(data[0].test.type=="OBJECTIVE") {
                this.sVis = true;
                this.sVis2 = false;
              }
              else {
                this.sVis2 = true;
                this.sVis = false;
              }
              for(var i=0;i<data.length;i++) {
              	var k = {};
              	k = data[i].question;
              	k["correct"] = data[i].correct;
              	k["response"] = data[i].response;
                this.questions.push(k);
              }
            }
        );
  }

  saveTest() {
  	var k = [];
  	this.marks = 0;
  	for(var i=0;i<this.questions.length;i++) {
  		var myName = 'score-' + this.questions[i].id;
  		if((<HTMLInputElement>document.getElementById(myName)).value) {
  			this.m2 =  parseFloat(((<HTMLInputElement>document.getElementById(myName)).value));
  		}
  		else {
  			this.m2 = 0;
  		}
	    this.marks = parseFloat(this.marks) + parseFloat(this.m2);
  	}
  	//this.scoreFinal.nativeElement.value = this.marks;
  	alert('Score: ' + this.marks);
    this.dataService.submitsScore(this.myId.nativeElement.value, this.marks)
      .subscribe(
            data => {
              alert('Score Submitted');
            }
          );
  }

  goBack() {
    document.getElementById('received').style.display = 'none';
    document.getElementById('tab').style.display = 'block';
  }

}
