import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-createissue',
  templateUrl: './createissue.component.html',
  styleUrls: ['./createissue.component.css']
})
export class CreateissueComponent implements OnInit {
   user = {
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

  constructor(private router:Router, private dataService:DataService) {
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

  ngOnInit() {
  }

  fetchEmp(e) {
    this.dataService.fetchEmps(e.target.value)
      .subscribe(
            data => {
              this.emps = data.responseEntity;
              this.user.assign = data.responseEntity[0];
            }
        );
    this.dataService.fetchSprints(e.target.value)
      .subscribe(
            data => {
              this.sprints = data.responseEntity;
              this.user.sprint = data.responseEntity[0].sprintName;
            }
        );
  }

  onSubmitForm({value, valid}) {
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
        "createdBy": Cname
    };
    console.log(k);
    this.dataService.addsTask(k)
      .subscribe(
            data => {
              alert('Task Added');
            }
        );
  }
}
