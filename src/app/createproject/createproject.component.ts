import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {
  user = {
    projname: '',
    projlead: ''
  }
  constructor(private router:Router, private dataService:DataService) { 
  }

  ngOnInit() {
  }

  onSubmitForm({value, valid}) {
    if(JSON.parse(localStorage.getItem('user'))) {
      var oname = JSON.parse(localStorage.getItem('user')).organisation;
      var omail = JSON.parse(localStorage.getItem('user')).emailId;
      var zip = JSON.parse(localStorage.getItem('user')).zipCode;
    }
    var k = {
        "projectName": value.projname,
        "createdBy": omail,
        "orgName": oname,
        "zipCode": zip,
        "teamLead": value.projlead
    };
    console.log(k);
    this.dataService.addsProject(k)
      .subscribe(
            data => {
              alert('Project Added successfully');
            }
        );
  }

}
