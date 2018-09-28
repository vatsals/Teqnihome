import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  projs = [];
  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute) { 
    this.dataService.fetchProjects()
      .subscribe(
            data => {
              if(data.responseEntity) {
                for(var i=0;i<data.responseEntity.length;i++) {
                	this.projs.push({
                		"name": data.responseEntity[i].projectName, 
                		"id": data.responseEntity[i].id
                	});
                }
              }
            }
        );
  }

  ngOnInit() {
  }

  goto(event) {
  	this.router.navigate([event]);
  }

  gotoProj(name, id) {
    var et = "project/" + name;
    this.router.navigate([et]);
  }

  gotoProj2(name, id) {
    var et = "projectboard/" + name;
    this.router.navigate([et]);
  }
}
