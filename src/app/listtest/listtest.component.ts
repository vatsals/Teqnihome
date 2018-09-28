import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-listtest',
  templateUrl: './listtest.component.html',
  styleUrls: ['./listtest.component.css']
})
export class ListtestComponent implements OnInit {
  userImg: string;
  years = [];
  ind: number;
  p: number;
  ind2: number;
  myLists = [];
  questions = [];
  myLists2 = [];
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
    this.dataService.fetchesTest()
      .subscribe(
            data => {
              for(var i=0;i<data.content.length;i++) {
                this.myListsMain.push({
                   "id": data.content[i].id,
                   "type": data.content[i].type,
                   "name": data.content[i].name
                })
                this.ind = data.content[i].id;
              }
            }
        );
    this.ind = this.ind + 1;
  	this.myLists = [
  	{
  		"id": this.ind,
      "question": "",
      "option1": "",
      "option2": "",
      "option3": "",
      "option4": ""
  	}
  	];
    this.ind2 = this.ind + 1;
  	this.myLists2 = [
  	{
  		"id": this.ind2,
      "question": "",
      "option1": "",
      "option2": "",
      "option3": "",
      "option4": ""
  	}
  	];
  }

  ngOnInit() {
  }

  addRowMain() {
  	this.ind = this.ind + 1;
  	this.myLists.push({
  		"id": this.ind,
      "question": "",
      "option1": "",
      "option2": "",
      "option3": "",
      "option4": ""
  	});
  }

  addRowMain2() {
  	this.ind2 = this.ind2 + 1;
  	this.myLists2.push({
  		"id": this.ind2,
      "question": "",
      "marks": ""
  	});
  }

  removeInst(e) {
    this.dataService.removesTest(e.target.id)
      .subscribe(
            data => {
              alert('Test Deleted');
            }
        );
  }

  removeRow(e) {
    this.dataService.removesQuestion(e.target.id)
      .subscribe(
            data => {
              alert('Question Deleted');
            }
        );
  	for(var i = this.myLists.length - 1; i >= 0; i--) {
        if(parseInt(this.myLists[i].id) == parseInt(e.target.id)) {
           this.myLists.splice(i, 1);
        }
    }
  }

  removeRow2(e) {
    this.dataService.removesQuestion(e.target.id)
      .subscribe(
            data => {
              alert('Question Deleted');
            }
        );
  	for(var i = this.myLists2.length - 1; i >= 0; i--) {
        if(parseInt(this.myLists2[i].id) == parseInt(e.target.id)) {
           this.myLists2.splice(i, 1);
        }
    }
  }

  onSubmitForm(e) {
  	// if(this.ind) {
  	// 	for(var i=1;i<=this.myLists.length;i++) {
	  // 		var myName = 'ques-' + i;
	  //   	var stime = (<HTMLInputElement>document.getElementById(myName)).value;
	  //   	console.log(stime);
	  // 	}
  	// }
  	// else {
  	// 	for(var i=1;i<=this.myLists2.length;i++) {
	  // 		var myName = 'ques2-' + i;
	  //   	var stime = (<HTMLInputElement>document.getElementById(myName)).value;
	  //   	console.log(stime);
	  // 	}
  	// }
  }

  fetchYes() {
    this.sVis = true;
    this.sVis2 = false;
  }

  fetchNo() {
    this.sVis = false;
    this.sVis2 = true;
  }

  addQues(e) {
    this.myId.nativeElement.value = e.target.id;
  	document.getElementById('received').style.display = 'block';
    document.getElementById('tab').style.display = 'none';
    this.dataService.fetchesTestSpec(e.target.id)
      .subscribe(
            data => {
              this.myLists = [];
              this.myLists2 = [];
              if(data.test.type=="OBJECTIVE") {
                for(var t=0;t<data.questions.length;t++) {
                  if(data.questions[t].option1) {
                    this.myLists.push(data.questions[t]);
                  }
                }
                var len = this.myLists.length;
                for(var p=0;p<len;p++) {
                  this.ind = this.myLists[p].id;
                }
                this.sVis = true;
                this.sVis2 = false;
              }
              else {
                for(var t=0;t<data.questions.length;t++) {
                  if(!data.questions[t].option1) {
                    this.myLists2.push(data.questions[t]);
                  }
                }
                var len = this.myLists2.length;
                for(var p=0;p<len;p++) {
                  this.ind2 = this.myLists2[p].id;
                }
                this.sVis = false;
                this.sVis2 = true;
              }
              console.log(data.questions);
            }
        );
  }

  addQuestion(e) {
    var myName = 'ques-' + e.target.id;
    var ques = (<HTMLInputElement>document.getElementById(myName)).value;
    var myName = 'ans1-' + e.target.id;
    var ans1 = (<HTMLInputElement>document.getElementById(myName)).value;
    var myName = 'ans2-' + e.target.id;
    var ans2 = (<HTMLInputElement>document.getElementById(myName)).value;
    var myName = 'ans3-' + e.target.id;
    var ans3 = (<HTMLInputElement>document.getElementById(myName)).value;
    var myName = 'ans4-' + e.target.id;
    var ans4 = (<HTMLInputElement>document.getElementById(myName)).value;
    var myName = 'corr-' + e.target.id;
    var corr = "option" + (<HTMLInputElement>document.getElementById(myName)).value;
    var myName = 'marks-' + e.target.id;
    var marks = parseFloat((<HTMLInputElement>document.getElementById(myName)).value);

    var k = [{
        "correct": corr,
        "marks": marks,
        "option1": ans1,
        "option2": ans2,
        "option3": ans3,
        "option4": ans4,
        "question": ques
    }]
    this.dataService.addsQues(k, this.myId.nativeElement.value)
      .subscribe(
            data => {
              alert('Question Added');
            }
          );
  }

  addQuestion2(e) {
    var myName = 'ques2-' + e.target.id;
    var ques = (<HTMLInputElement>document.getElementById(myName)).value;
    var myName = 'marks2-' + e.target.id;
    var marks = parseFloat((<HTMLInputElement>document.getElementById(myName)).value);
    var k = [{
        "marks": marks,
        "question": ques
    }]
    this.dataService.addsQues(k, this.myId.nativeElement.value)
      .subscribe(
            data => {
              alert('Question Added');
            }
          );
  }

  goBack() {
    document.getElementById('received').style.display = 'none';
    document.getElementById('tab').style.display = 'block';
  }

}
