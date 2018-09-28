import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-pompombuild',
  templateUrl: './pompombuild.component.html',
  styleUrls: ['./pompombuild.component.css']
})
export class PompombuildComponent implements OnInit {
  user = {
    project: 999,
    start: '',
    end: '',
    holidays: ''
  }
  user2 = {
    project: 999,
    taskType: 'Feature',
    taskTitle: '',
    prior: 10,
    sprint: 999,
    assign: 999,
    time: '',
    desc: ''
  }
  projs = [];
  emps = [];
  sprints = [];
  myLists = [];
  created = [];
  progress = [];
  id: any;
  sub: any;
  @ViewChild('holid') holid;
  @ViewChild('myId') myId;
  @ViewChild('newDate') newDate;
  @ViewChild('fDate') fDate;
  @ViewChild('sDate') sDate;
  @ViewChild('eDate') eDate;
  public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'mm/dd/yyyy',
    };

  public model2: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };
  public model3: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };
  public model4: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };

  constructor(private router:Router, private dataService:DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params.id;
       this.dataService.fetchProjectDetails(this.id)
      .subscribe(
            data => {
              this.projs = [];
              this.emps = [];
              this.sprints = [];
              this.myLists = [];
              this.created = [];
              this.progress = [];
              this.myLists = data.responseEntity;
              this.myLists.sort((a, b) => {
                  if (a.sprintName.toLowerCase() < b.sprintName.toLowerCase()) return -1;
                  else if (a.sprintName.toLowerCase() > b.sprintName.toLowerCase()) return 1;
                  else return 0;
                });
              for(var i=0;i<this.myLists.length;i++) {
                var Cdate = new Date(this.myLists[i].createdAt).toUTCString();
                this.created.push(Cdate);
                this.progress.push(((this.myLists[i].estimatedTime-this.myLists[i].remainingTime)/this.myLists[i].estimatedTime)*100);
              }
            }
        );
    });
    this.dataService.fetchProjects()
      .subscribe(
            data => {
              for(var i=0;i<data.responseEntity.length;i++) {
                this.projs.push({
                  "name": data.responseEntity[i].projectName, 
                  "id": data.responseEntity[i].id
                });
              }
            }
        );
  }

  ngAfterViewInit() {
  }

  addTask() {
    this.router.navigate(['createissue']);
  }

  view(e) {
    this.router.navigate(['viewtask/' + e.target.id]);
  }

  edit(e) {
    this.myId.nativeElement.value = e.target.id;
    this.user2.project = this.id;
    this.fetchEmp2(this.id);
    for(var t=0;t<this.myLists.length;t++) {
      if(this.myLists[t].id==e.target.id) {
        this.user2.desc = this.myLists[t].description;
        this.user2.time = this.myLists[t].estimatedTime;
        this.user2.taskTitle = this.myLists[t].title;
      }
    }
    document.getElementById('myCd2').style.display = 'flex';
    document.getElementById('myCd').style.display = 'none';
    document.getElementById('received').style.display = 'none';
    document.getElementById('received2').style.display = 'block';
  }

  fetchEmp(e) {
    this.dataService.fetchEmps(e.target.value)
      .subscribe(
            data => {
              this.emps = data.responseEntity;
              this.user2.assign = data.responseEntity[0];
            }
        );
    this.dataService.fetchSprints(e.target.value)
      .subscribe(
            data => {
              this.sprints = data.responseEntity;
              this.user2.sprint = data.responseEntity[0].sprintName;
            }
        );
  }

  fetchEmp2(e) {
    this.dataService.fetchEmps(e)
      .subscribe(
            data => {
              this.emps = data.responseEntity;
              this.user2.assign = data.responseEntity[0];
            }
        );
    this.dataService.fetchSprints(e)
      .subscribe(
            data => {
              this.sprints = data.responseEntity;
              this.user2.sprint = data.responseEntity[0].sprintName;
            }
        );
  }

  onSubmitForm({value, valid}) {
    if(JSON.parse(localStorage.getItem('user'))) {
      var oname = JSON.parse(localStorage.getItem('user')).organisation;
      var zip = JSON.parse(localStorage.getItem('user')).zipCode;
      var Cname = JSON.parse(localStorage.getItem('user')).emailId;
    }
    var st = this.sDate.selectionDayTxt + ' 00:00';
    var et = this.eDate.selectionDayTxt + ' 00:00';
    var myDate = new Date(st);
    var result = myDate.getTime();
    var myDate2 = new Date(et);
    var result2 = myDate2.getTime();
    var k = {
        "startDate": result,
        "endDate": result2,
        "createdBy": Cname,
        "orgName": oname,
        "projName": value.project,
        "zipCode": zip,
        "holidays": this.holid.nativeElement.value
    };
    this.dataService.addsSprint(k)
      .subscribe(
            data => {
              alert('Sprint Added');
            }
        );
    document.getElementById('myCd').style.display = 'none';
  	document.getElementById('myCd2').style.display = 'flex';
  }

  onSubmitForm2({value, valid}) {
    if(JSON.parse(localStorage.getItem('user'))) {
      var oname = JSON.parse(localStorage.getItem('user')).organisation;
      var zip = JSON.parse(localStorage.getItem('user')).zipCode;
      var Cname = JSON.parse(localStorage.getItem('user')).name;
    }
    var k = {
        "orgName": oname,
        "projectName": value.project,
        "type": value.taskType,
        "title": value.taskTitle,
        "sprintName": value.sprint,
        "status": false,
        "assignee": value.assign,
        "estimatedTime": value.time.toString(),
        "description": value.desc,
        "zipCode": zip,
        "id": this.myId.nativeElement.value,
        "createdBy": Cname
    };
    console.log(k);
    this.dataService.addsTask(k)
      .subscribe(
            data => {
            }
        );
    alert('Task Updated');
    document.getElementById('received2').style.display = 'none';
    document.getElementById('received').style.display = 'block';
    this.ngOnInit();
  }

  addSprint() {
  	document.getElementById('myCd').style.display = 'flex';
  	document.getElementById('myCd2').style.display = 'none';
  }

  goBack() {
    document.getElementById('myCd').style.display = 'none';
    document.getElementById('myCd2').style.display = 'flex';
  }

  goBack2() {
    document.getElementById('received2').style.display = 'none';
    document.getElementById('received').style.display = 'block';
  }

  saveDate() {
  	var nD = this.fDate.selectionDayTxt;
  	var fD = this.holid.nativeElement.value?this.holid.nativeElement.value + ', ' + nD:nD;
  	this.holid.nativeElement.value = fD;
  }

}
