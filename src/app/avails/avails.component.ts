import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-avails',
  templateUrl: './avails.component.html',
  styleUrls: ['./avails.component.css']
})
export class AvailsComponent implements OnInit {
  public selectedTime = '09:00';
  public selectedTime2 = '17:00';

  constructor(private router:Router, private dataService:DataService, private atp: AmazingTimePickerService) {

  }

  ngOnInit() {
  }

  open() {
      const amazingTimePicker = this.atp.open({
          theme: 'material-blue',
      });
      amazingTimePicker.afterClose().subscribe(time => {
          this.selectedTime = time;
      });
  }

  open2() {
      const amazingTimePicker = this.atp.open({
          theme: 'material-blue',
      });
      amazingTimePicker.afterClose().subscribe(time => {
          this.selectedTime2 = time;
      });
  }

  onSubmitForm({value, valid}) {
    var k = {
        "availableStartTime": this.selectedTime + ":00",
        "availableEndTime": this.selectedTime2 + ":00",
        "timeSlot": 15
    };
    console.log(k);
    this.dataService.timeAddition(k)
      .subscribe(
            data => {
              alert('Time slot added');
            }
        );
  }

}
