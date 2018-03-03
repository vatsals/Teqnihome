import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public date = moment();
  public dateForm: FormGroup;
  public isReserved = null;
  public isReservedDay = null;
  public daysArr;
  @ViewChild('recId') recId;
  @ViewChild('frdId') frdId;
  @ViewChild('month') month;
  @ViewChild('days') days;
  @ViewChild('currDate') currDate;

  constructor(private fb: FormBuilder) {
    this.initDateRange();
  }

   public initDateRange() {
    return (this.dateForm = this.fb.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required]
    }));
  }

  ngOnInit() {
    this.daysArr = this.createCalendar(this.date);
  }

  public createCalendar(month) {
    let firstDay = moment(month).startOf('M');
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDay).add(n, 'd');
      });

    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    return days;
  }

  public nextMonth() {
    this.date.add(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }

  public previousMonth() {
    this.date.subtract(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }

  public todayCheck(day) {
    if (!day) {
      return false;
    }
    return moment().format('L') === day.format('L');
  }

  public reserve() {
    if (!this.dateForm.valid) {
      return;
    }
    let dateFromMoment = this.dateForm.value.dateFrom;
    let dateToMoment = this.dateForm.value.dateTo;
    this.isReserved = `Reserved from ${dateFromMoment} to ${dateToMoment}`;
  }

  public isSelected(day) {
    if (!day) {
      return false;
    }
    let dateFromMoment = moment(this.dateForm.value.dateFrom, 'MM/DD/YYYY');
    let dateToMoment = moment(this.dateForm.value.dateTo, 'MM/DD/YYYY');
    if (this.dateForm.valid) {
      return (
        dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)
      );
    }
    if (this.dateForm.get('dateFrom').valid) {
      return dateFromMoment.isSame(day);
    }
  }

  public selectedDate(day) {
    let dayFormatted = day.format('MM/DD/YYYY');
    if (this.dateForm.valid) {
      this.dateForm.setValue({ dateFrom: null, dateTo: null });
      return;
    }
    if (!this.dateForm.get('dateFrom').value) {
      this.dateForm.get('dateFrom').patchValue(dayFormatted);
    } else {
      this.dateForm.get('dateTo').patchValue(dayFormatted);
    }
  }

  public createCalendarDay(day) {
    let firstDay = moment(day).startOf('D');
    let days = Array.apply(null, { length: 24 })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDay).add(n, 'h');
      });

    return days;
  }

  public nextDay() {
    this.date.add(1, 'd');
    this.daysArr = this.createCalendarDay(this.date);
  }

  public previousDay() {
    this.date.subtract(1, 'd');
    this.daysArr = this.createCalendarDay(this.date);
  }

  public todayCheckDay(day) {
    if (!day) {
      return false;
    }
    return moment().format('L') === day.format('L');
  }

  public reserveDay() {
    if (!this.dateForm.valid) {
      return;
    }
    let dateFromMoment = this.dateForm.value.dateFrom;
    let dateToMoment = this.dateForm.value.dateTo;
    let myDate = this.currDate.nativeElement.innerHTML;
    this.isReservedDay = `Reserved from ${dateFromMoment} to ${dateToMoment} on ${myDate}`;
  }

  public isSelectedDay(day) {
    if (!day) {
      return false;
    }
    let dateFromMoment = moment(this.dateForm.value.dateFrom, 'hA');
    let dateToMoment = moment(this.dateForm.value.dateTo, 'hA');
    console.log(dateFromMoment + ' : ' + dateToMoment);
    if (this.dateForm.valid) {
      return (
        dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)
      );
    }
    if (this.dateForm.get('dateFrom').valid) {
      return dateFromMoment.isSame(day);
    }
  }

  public selectedDay(day) {
    let dayFormatted = day.format('hA');
    if (this.dateForm.valid) {
      this.dateForm.setValue({ dateFrom: null, dateTo: null });
      return;
    }
    if (!this.dateForm.get('dateFrom').value) {
      this.dateForm.get('dateFrom').patchValue(dayFormatted);
    } else {
      this.dateForm.get('dateTo').patchValue(dayFormatted);
    }
  }

  dispRec() {
    this.daysArr = this.createCalendar(this.date);
    this.month.nativeElement.style.display = 'block';
    this.recId.nativeElement.style.fontWeight = '600';
    this.recId.nativeElement.style.fontSize = '17px';
    this.frdId.nativeElement.style.fontWeight = '200';
    this.frdId.nativeElement.style.fontSize = '16px';
    this.days.nativeElement.style.display = 'none';
  }

  dispFrd() {
    this.daysArr = this.createCalendarDay(this.date);
    this.days.nativeElement.style.display = 'flex';
    this.recId.nativeElement.style.fontWeight = '200';
    this.recId.nativeElement.style.fontSize = '16px';
    this.frdId.nativeElement.style.fontWeight = '600';
    this.frdId.nativeElement.style.fontSize = '17px';
    this.month.nativeElement.style.display = 'none';
  }

}
