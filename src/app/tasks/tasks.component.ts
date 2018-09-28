import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
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
  @ViewChild('myId') myId;
  @ViewChild('time3') time3;
  @ViewChild('desc3') desc3;
  @ViewChild('assign4') assign4;

  constructor(private router:Router, private dataService:DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params.id;
       this.dataService.sprintDetails(this.id)
      .subscribe(
            data => {
              this.myLists = data.responseEntity;
              //console.log(this.myLists);
              var Cdate = new Date(data.responseEntity.createdAt).toUTCString();
              this.created = Cdate;
              var Cdate = new Date(data.responseEntity.updatedAt).toUTCString();
              this.updated = Cdate;
              this.progress = ((data.responseEntity.estimatedTime-data.responseEntity.remainingTime)/data.responseEntity.estimatedTime)*100;
              this.estimated = 100;
              this.remain = 100-((data.responseEntity.estimatedTime-data.responseEntity.remainingTime)/data.responseEntity.estimatedTime)*100;
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

  edit(pname) {
    this.myId.nativeElement.value = this.id;
    this.user2.project = pname;
    this.fetchEmp2(pname);
    this.user2.desc = this.myLists.description;
    this.user2.time = this.myLists.estimatedTime;
    this.user2.taskTitle = this.myLists.title;
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
    document.getElementById('received').style.display = 'flex';
    this.ngOnInit();
  }

  log() {
    document.getElementById('received3').style.display = 'block';
    document.getElementById('received').style.display = 'none';
  }

  assign() {
    document.getElementById('received4').style.display = 'block';
    document.getElementById('received').style.display = 'none';
  }

  accept() {
    var k = {
        "id": this.myLists.id,
        "taskId": this.myLists.taskId,
        "orgName": this.myLists.orgName,
        "projectName": this.myLists.projectName,
        "assignee": this.myLists.assignee,
        "zipCode": this.myLists.zipCode,
        "title": this.myLists.title,
        "description": this.myLists.description,
        "type": this.myLists.type,
        "estimatedTime": this.myLists.estimatedTime,
        "remainingTime": this.myLists.remainingTime,
        "totalTimeTaken": this.myLists.totalTimeTaken,
        "status": "Accepted",
        "sprintName": this.myLists.sprintName,
        "summary": this.myLists.summary,
        "createdAt": this.myLists.createdAt,
        "createdBy": this.myLists.createdBy,
        "updatedAt": this.myLists.updatedAt
    }
    this.dataService.updatesTask(k)
      .subscribe(
            data => {
              alert('Success');
            }
        );
    document.getElementById('received3').style.display = 'none';
    document.getElementById('received').style.display = 'flex';
    this.ngOnInit();
  }

  review() {
    var k = {
        "id": this.myLists.id,
        "taskId": this.myLists.taskId,
        "orgName": this.myLists.orgName,
        "projectName": this.myLists.projectName,
        "assignee": this.myLists.assignee,
        "zipCode": this.myLists.zipCode,
        "title": this.myLists.title,
        "description": this.myLists.description,
        "type": this.myLists.type,
        "estimatedTime": this.myLists.estimatedTime,
        "remainingTime": 0,
        "totalTimeTaken": 0,
        "status": "Review",
        "sprintName": this.myLists.sprintName,
        "summary": this.myLists.summary,
        "createdAt": this.myLists.createdAt,
        "createdBy": this.myLists.createdBy,
        "updatedAt": this.myLists.updatedAt
    }
    this.dataService.updatesTask(k)
      .subscribe(
            data => {
              alert('Success');
            }
        );
    document.getElementById('received3').style.display = 'none';
    document.getElementById('received').style.display = 'flex';
    this.ngOnInit();
  }

  qna() {
    var k = {
        "id": this.myLists.id,
        "taskId": this.myLists.taskId,
        "orgName": this.myLists.orgName,
        "projectName": this.myLists.projectName,
        "assignee": this.myLists.assignee,
        "zipCode": this.myLists.zipCode,
        "title": this.myLists.title,
        "description": this.myLists.description,
        "type": this.myLists.type,
        "estimatedTime": this.myLists.estimatedTime,
        "remainingTime": 0,
        "totalTimeTaken": 0,
        "status": "QA",
        "sprintName": this.myLists.sprintName,
        "summary": this.myLists.summary,
        "createdAt": this.myLists.createdAt,
        "createdBy": this.myLists.createdBy,
        "updatedAt": this.myLists.updatedAt
    }
    this.dataService.updatesTask(k)
      .subscribe(
            data => {
              alert('Success');
            }
        );
    document.getElementById('received3').style.display = 'none';
    document.getElementById('received').style.display = 'flex';
    this.ngOnInit();
  }

  complete() {
    var k = {
        "id": this.myLists.id,
        "taskId": this.myLists.taskId,
        "orgName": this.myLists.orgName,
        "projectName": this.myLists.projectName,
        "assignee": this.myLists.assignee,
        "zipCode": this.myLists.zipCode,
        "title": this.myLists.title,
        "description": this.myLists.description,
        "type": this.myLists.type,
        "estimatedTime": this.myLists.estimatedTime,
        "remainingTime": 0,
        "totalTimeTaken": 0,
        "status": "Completed",
        "sprintName": this.myLists.sprintName,
        "summary": this.myLists.summary,
        "createdAt": this.myLists.createdAt,
        "createdBy": this.myLists.createdBy,
        "updatedAt": this.myLists.updatedAt
    }
    this.dataService.updatesTask(k)
      .subscribe(
            data => {
              alert('Success');
            }
        );
    document.getElementById('received3').style.display = 'none';
    document.getElementById('received').style.display = 'flex';
    this.ngOnInit();
  }

  onSubmitForm3({value, valid}) {
    var k = {
        "id": this.myLists.id,
        "taskId": this.myLists.taskId,
        "orgName": this.myLists.orgName,
        "projectName": this.myLists.projectName,
        "assignee": this.myLists.assignee,
        "zipCode": this.myLists.zipCode,
        "title": this.myLists.title,
        "description": this.myLists.description,
        "type": this.myLists.type,
        "estimatedTime": this.myLists.estimatedTime,
        "remainingTime": this.myLists.remainingTime,
        "totalTimeTaken": this.time3.nativeElement.value.toString(),
        "status": this.myLists.status,
        "sprintName": this.myLists.sprintName,
        "summary": this.myLists.summary,
        "createdAt": this.myLists.createdAt,
        "createdBy": this.myLists.createdBy,
        "updatedAt": this.myLists.updatedAt
    }
    this.dataService.updatesTask(k)
      .subscribe(
            data => {
              alert('Success');
            }
        );
    document.getElementById('received3').style.display = 'none';
    document.getElementById('received').style.display = 'flex';
    this.ngOnInit();
  }

  onSubmitForm4({value, valid}) {
    var k = {
        "id": this.myLists.id,
        "taskId": this.myLists.taskId,
        "orgName": this.myLists.orgName,
        "projectName": this.myLists.projectName,
        "assignee": this.assign4.nativeElement.value,
        "zipCode": this.myLists.zipCode,
        "title": this.myLists.title,
        "description": this.myLists.description,
        "type": this.myLists.type,
        "estimatedTime": this.myLists.estimatedTime,
        "remainingTime": this.myLists.remainingTime,
        "totalTimeTaken": this.myLists.totalTimeTaken,
        "status": this.myLists.status,
        "sprintName": this.myLists.sprintName,
        "summary": this.myLists.summary,
        "createdAt": this.myLists.createdAt,
        "createdBy": this.myLists.createdBy,
        "updatedAt": this.myLists.updatedAt
    }
    console.log(k);
    // this.dataService.updatesTask(k)
    //   .subscribe(
    //         data => {
    //           alert('Success');
    //         }
    //     );
    document.getElementById('received4').style.display = 'none';
    document.getElementById('received').style.display = 'flex';
    this.ngOnInit();
  }

  goBack2() {
    document.getElementById('received2').style.display = 'none';
    document.getElementById('received').style.display = 'flex';
  }

  goBack3() {
    document.getElementById('received3').style.display = 'none';
    document.getElementById('received').style.display = 'flex';
  }

  goBack4() {
    document.getElementById('received4').style.display = 'none';
    document.getElementById('received').style.display = 'flex';
  }

}
