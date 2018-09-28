import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  user = {
    email: '',
    uname: '',
    dob: '',
    compId: '',
    empType: 'Normal'
  }
  @ViewChild('fDate') fDate;
  public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'mm/dd/yyyy',
    };

  public model2: any = { date: { year: 1990, month: new Date().getMonth() + 1, day: new Date().getDate() } };
  
  constructor(private router:Router, private dataService:DataService) { 
  }

  ngOnInit() {
  }

  onSubmitForm({value, valid}) {
    if(JSON.parse(localStorage.getItem('user'))) {
      var oname = JSON.parse(localStorage.getItem('user')).organisation;
      var zip = JSON.parse(localStorage.getItem('user')).zipCode;
    }
    var newfdate = this.fDate.selectionDayTxt;
    var k = {
        "emailId": value.email,
        "name": value.uname,
        "organisation": oname,
        "employeeType": value.uname,
        "key": value.compId,
        "dateOfBirth": newfdate,
        "zipCode": zip
    };
    this.dataService.savesTask(k)
      .subscribe(
            data => {
              alert('Employee Added');
            }
        );
  }

}
