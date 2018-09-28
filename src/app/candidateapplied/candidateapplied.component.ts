import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';
import {CalendarprimModule} from 'primeng/calendar';
import {IMyDpOptions} from 'mydatepicker';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-candidateapplied',
  templateUrl: './candidateapplied.component.html',
  styleUrls: ['./candidateapplied.component.css']
})
export class CandidateappliedComponent implements OnInit {
  userImg: string;
  assignee: string;
  p: number;
  offerDate = [];
  interviewDate = [];
  @ViewChild('linkTwo') linkTwo;
  @ViewChild('linkRes') linkRes;
  @ViewChild('linkRes2') linkRes2;
  @ViewChild('dateinterDate') dateinterDate;
  @ViewChild('interMode') interMode;
  @ViewChild('interMode2') interMode2;
  @ViewChild('interDate') interDate;
  @ViewChild('interVenue') interVenue;
  @ViewChild('interVal') interVal;
  @ViewChild('myBn') myBn;
  @ViewChild('myBn2') myBn2;
  @ViewChild('modeF') modeF;
  @ViewChild('fDate') fDate;
  @ViewChild('appId') appId;
  @ViewChild('detJob') detJob;
  @ViewChild('detJob2') detJob2;
  myJobs = [];
  myListsMain = [];
  myCands = [];
  str = [];
  stTime: any;
  endTime: any;
  date7: Date;
    dates: Date[];
    rangeDates: Date[];
    minDate: Date;
    maxDate: Date;

    es: any;
    tr: any;
    invalidDates: Array<Date>
  public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
    };
    
  public model3: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() -1 } };
  public selectedTime = '08:00';
  
  constructor(private dragulaService: DragulaService, private router:Router, private dataService:DataService) {
  	this.userImg = '/assets/images/user.png';
    this.dataService.fetchesTest()
      .subscribe(
            data => {
              for(var i=0;i<data.content.length;i++) {
                this.myListsMain.push({
                   "id": data.content[i].id,
                   "type": data.content[i].type,
                   "name": data.content[i].name
                })
              }
            }
        );
  }

  ngOnInit() {
    this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
        }

        this.tr = {
            firstDayOfWeek : 1
        }

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);

        let invalidDate = new Date();
        invalidDate.setDate(today.getDate() - 1);
        this.invalidDates = [today,invalidDate];
  	this.allJobs();
  }

  onDateChanged(event) {
    this.detJob.nativeElement.style.display = 'none';
    this.detJob2.nativeElement.style.display = 'none';
    this.str = [];
    var id = this.appId.nativeElement.value;
    this.str = [];
    var newfdate = event.formatted.split("/").reverse().join("/");
    this.dataService.seesDet(id, newfdate)
    .subscribe(
          data => {
              this.stTime = (data.candidateStartTime[0].toString() + ':00');
              this.endTime = (data.candidateEndTime[0].toString() + ':00');
              this.detJob2.nativeElement.style.display = 'flex';
              for(var p=0; p<data.candidateBusySlots.length;p++) {
                var v = data.candidateBusySlots[p].interviewTime - 22*15*60*1000;
                var d = new Date(v);
                var start = d.getHours() + ':' + d.getMinutes();
                if(d.getMinutes()==0) {
                  var start = d.getHours() + ':00';
                }
                else {
                  var start = d.getHours() + ':' + d.getMinutes().toString();
                }

                var v = data.candidateBusySlots[p].interviewTime + data.candidateBusySlots[p].slotDuration*data.candidateBusySlots[p].slots*60*1000 - 22*15*60*1000;
                var d = new Date(v);
                if(d.getMinutes()==0) {
                  var end = d.getHours() + ':00';
                }
                else {
                  var end = d.getHours() + ':' + d.getMinutes().toString();
                }
                this.str.push(start + ' to ' + end);
              }
              if(this.str.length) {
                this.detJob.nativeElement.style.display = 'flex';
              }
              else {
                this.detJob.nativeElement.style.display = 'none';
              }
              console.log(this.str);
          });
  }

  allJobs() {
    this.dataService.allJobs()
      .subscribe(
            data => {
              this.myJobs = data;
              var val = this.myJobs[0].id;
              this.dataService.offerApplication(val)
              .subscribe(
                    data => {
                        for(var i=0;i<data.content.length;i++) {
                          this.myCands.push(data.content[i]);
                          this.offerDate[i] = this.myCands[i].jobApplication.jobOffer.created;
                          this.offerDate[i] = new Date(this.offerDate[i]).toUTCString();
                          this.interviewDate[i] = this.myCands[i].jobApplication.interviewTime;
                          this.interviewDate[i] = new Date(this.interviewDate[i]).toUTCString();
                        }
                      }
                );
              }
        );
  }

  onLinkChange(val) {
    this.myCands = [];
    this.dataService.offerApplication(val)
      .subscribe(
            data => {
                for(var i=0;i<data.content.length;i++) {
                  this.myCands.push(data.content[i]);
                  this.offerDate[i] = this.myCands[i].jobApplication.jobOffer.created;
                  this.offerDate[i] = new Date(this.offerDate[i]).toUTCString();
                  this.interviewDate[i] = this.myCands[i].jobApplication.interviewTime;
                  this.interviewDate[i] = new Date(this.interviewDate[i]).toUTCString();
                }
              }
        );
  }

  onSecondChange(e, appId, resid, oaid, uId) {
    this.appId.nativeElement.value = appId;
    if(e=='call') {
      this.linkRes.nativeElement.value = resid;
      this.myBn.nativeElement.click();
    }
    if(e=='assigntest') {
      this.linkRes2.nativeElement.value = uId;
      this.myBn2.nativeElement.click();
    }
    if(e=='reschedule') {
      this.dataService.confResch(appId)
      .subscribe(
            data => {
                alert('Reschedule Confirmed');
              }
        );
    }
    if(e=='selres') {
      var rid = this.linkTwo.nativeElement.className.split(" ");
      var resid = resid;
      var offerid = this.linkTwo.nativeElement.id;
      this.dataService.selectJob(resid, offerid)
      .subscribe(
            data => {
                alert('Selected');
              }
        );
    }
    if(e=='refer') {
      var rid = this.linkTwo.nativeElement.className.split(" ");
      var resid = resid;
      var offerid = this.linkTwo.nativeElement.id;
      this.dataService.referJob(resid, offerid)
      .subscribe(
            data => {
                alert('Asked for Reference');
              }
        );
    }
    if(e=='checkrefer') {
      this.router.navigate(['viewreference']);
    }
    if(e=='refemp') {
      var rid = this.linkTwo.nativeElement.className.split(" ");
      var resid = resid;
      var offerid = this.linkTwo.nativeElement.id;
      this.dataService.empreferJob(resid, offerid)
      .subscribe(
            data => {
                alert('Employer Referenced');
              }
        );
    }
    if(e=='offer') {
      var rid = this.linkTwo.nativeElement.className.split(" ");
      var resid = resid;
      var offerid = this.linkTwo.nativeElement.id;
      this.dataService.offerJob(resid, offerid)
      .subscribe(
            data => {
                alert('Job Offered');
              }
        );
    }
    if(e=='welcome') {
      var rid = this.linkTwo.nativeElement.className.split(" ");
      var resid = resid;
      var offerid = this.linkTwo.nativeElement.id;
      this.dataService.jobJoin(resid, offerid)
      .subscribe(
            data => {
                alert('Employee Welcomed');
              }
        );
    }
  }

  onModeChange(e) {
    if(e=='FACE2FACE') {
      this.modeF.nativeElement.style.display = 'flex';
    }
    else {
      this.modeF.nativeElement.style.display = 'none';
    }
  }

  saveInter() {
    var rid = this.linkTwo.nativeElement.className.split(" ");
    var resid = this.linkRes.nativeElement.value;
    // console.log(this.linkTwo);
    var offerid = this.linkTwo.nativeElement.id;
    var isoTime = this.dateinterDate.value.toISOString();
    var sec = this.dateinterDate.value.toString().slice(16, 24) + '.241Z';
    var chk = this.dateinterDate.value.toString().slice(16, 21);
    for(var p=0;p<this.str.length;p++) {
    }
    var newfdate = this.fDate.selectionDayTxt.split("/").reverse().join("-") + 'T' + sec;
    var k = {
        "interviewMode": this.interMode.nativeElement.value,
        "interviewSlots": this.interVal.nativeElement.value,
        "interviewTime": newfdate,
        "venue": this.interVenue.nativeElement.value
    }
    this.dataService.callInterview(k, resid, offerid)
    .subscribe(
          data => {
            alert('Called for Interview');
          });
  }

  saveInter2() {
    var resid = this.interMode2.nativeElement.value;
    var resid2 = this.linkRes2.nativeElement.value;
    console.log(resid);
    var k = {
        "assignedUser": resid2,
    }
    this.dataService.assignsTest(k, resid)
    .subscribe(
          data => {
            alert('Test Assigned to Candidate');
          });
  }

  shortlist(id, oid) {
    this.myCands = [];
    this.dataService.shortlist(id, oid)
      .subscribe(
            data => {
                 alert('Shortlisted');
              }
        );
  }

  goRes(id) {
    this.router.navigate(['specresume', id]);
  }

}
