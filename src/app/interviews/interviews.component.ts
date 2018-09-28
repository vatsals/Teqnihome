// import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as moment from 'moment';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  def: {
    primary: '#197CD3',
    secondary: '#e3bc08'
  }
};

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {
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
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class=""></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class=""></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  constructor(private modal: NgbModal, private router:Router, private dataService:DataService) {
    this.viewDate = startOfDay(new Date());
  }

  events: CalendarEvent[] = [];

  ngOnInit() {
    this.events.push({
      start: startOfDay(new Date()),
      title: 'No interviews on this day',
      color: colors.yellow,
      actions: this.actions
    });
    this.dataService.interDate()
      .subscribe(
            data => {
              // console.log(data);
              this.viewDate = startOfDay(new Date());
              for(var i=0;i<data.length;i++) {
                var sdt = new Date(data[i].jobApplication.interviewTime);
                var edt = new Date(data[i].jobApplication.interviewTime);
                var tH = sdt.getHours(); var tM = sdt.getMinutes();
                var ttl = 'Interview with ' + data[i].resume.name + '. Mode: ' + data[i].jobApplication.interviewMode + '. Details: ' + data[i].jobApplication.interviewModeDetail + '. Time: ' + tH + ' : ' + tM;
                  this.events.push( {
                    start: sdt,
                    title: ttl,
                    color: colors.def,
                    actions: this.actions
                  });
                }
                // console.log(this.events);
              }
        );
  }

  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // document.getElementById('mCont').style.display = 'flex';
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  close() {
    document.getElementById('mCont').style.display = 'none';
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

}
