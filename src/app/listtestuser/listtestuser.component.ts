import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-listtestuser',
  templateUrl: './listtestuser.component.html',
  styleUrls: ['./listtestuser.component.css']
})
export class ListtestuserComponent implements OnInit {
  userImg: string;
  years = [];
  ind: number;
  p: number;
  ind2: number;
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

  constructor(private router:Router, private dataService:DataService) {
  	this.sVis = false;
  	this.sVis2 = false;
    this.dataService.assignedTest2()
      .subscribe(
            data => {
              for(var i=0;i<data.content.length;i++) {
                this.myLists.push(data.content[i].test);
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
    this.dataService.assignedTestSpec(e.target.id)
      .subscribe(
            data => {
              console.log(data);
              if(data.test.type=="OBJECTIVE") {
                this.sVis = true;
                this.sVis2 = false;
              }
              else {
                this.sVis2 = true;
                this.sVis = false;
              }
              for(var i=0;i<data.questions.length;i++) {
                this.questions.push(data.questions[i]);
              }
            }
        );
  }

  saveTest() {
  	var kSub = [];
  	var k = [];
    if(!this.sVis) {
      for(var i=0;i<this.questions.length;i++) {
        var myName = 'ans2-' + this.questions[i].id;
        if((<HTMLInputElement>document.getElementById(myName)).value) {
          var corr = (<HTMLInputElement>document.getElementById(myName)).value;
        }
        else {
          var corr = "";
        }
        kSub.push({
            "question": {
              "id": parseInt(this.questions[i].id)
            },
            "response": corr
        });
      }
      console.log(kSub);
      this.dataService.submitsTest(kSub, this.myId.nativeElement.value)
      .subscribe(
            data => {
              alert('Response Recorded');
            }
          );
    }
    else {
      for(var i=0;i<this.questions.length;i++) {
        var myName = 'corr-' + this.questions[i].id;
        if((<HTMLInputElement>document.getElementById(myName)).value) {
          var corr = "option" + (<HTMLInputElement>document.getElementById(myName)).value;
        }
        else {
          var corr = "";
        }
        k.push({
            "question": {
              "id": parseInt(this.questions[i].id)
            },
            "correct": corr
        });
      }
      this.dataService.submitsTest(k, this.myId.nativeElement.value)
      .subscribe(
            data => {
              alert('Response Recorded');
            }
          );
    }
  } 

  goBack() {
    document.getElementById('received').style.display = 'none';
    document.getElementById('tab').style.display = 'block';
  }

}
