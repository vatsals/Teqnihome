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
  selector: 'app-appliedjobs',
  templateUrl: './appliedjobs.component.html',
  styleUrls: ['./appliedjobs.component.css']
})
export class AppliedjobsComponent implements OnInit {
  userImg: string;
  myApps = [];
  interviewDate = [];
  myRefers = [];
  specData: any;
  refreqs = [];
  time = [];
  @ViewChild('myBn') myBn;
  @ViewChild('myBn2') myBn2;
  @ViewChild('interDate') interDate;
  @ViewChild('dateinterDate') dateinterDate;
  @ViewChild('modeSkypeId') modeSkypeId;
  @ViewChild('modePhone') modePhone;
  @ViewChild('appId') appId;
  @ViewChild('phone') phone;
  @ViewChild('skypeId') skypeId;
  @ViewChild('myMode') myMode;
  @ViewChild('sinterDate') sinterDate;
  @ViewChild('smodeSkypeId') smodeSkypeId;
  @ViewChild('smodePhone') smodePhone;
  @ViewChild('sappId') sappId;
  @ViewChild('sphone') sphone;
  @ViewChild('sskypeId') sskypeId;
  @ViewChild('smyMode') smyMode;
  @ViewChild('oid') oid;
  @ViewChild('company') company;
  @ViewChild('name') name;
  @ViewChild('addr') addr;
  @ViewChild('phn') phn;
  @ViewChild('email') email;
  @ViewChild('eoid') eoid;
  @ViewChild('ecompany') ecompany;
  @ViewChild('ename') ename;
  @ViewChild('eaddr') eaddr;
  @ViewChild('ephn') ephn;
  @ViewChild('eemail') eemail;
  @ViewChild('fDate') fDate;
  @ViewChild('slotNo') slotNo;
  @ViewChild('detJob') detJob;
  @ViewChild('detJob2') detJob2;
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

  constructor(private dragulaService: DragulaService, private router:Router, private dataService:DataService, private atp: AmazingTimePickerService) {
  	this.userImg = '/assets/images/user.png';
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
    this.offer();
  }

  open() {
      const amazingTimePicker = this.atp.open({
          theme: 'material-blue',
      });
      amazingTimePicker.afterClose().subscribe(time => {
          this.selectedTime = time;
      });
  }

  onDateChanged(event) {
    this.detJob.nativeElement.style.display = 'none';
    this.detJob2.nativeElement.style.display = 'none';
    this.str = [];
    var id = this.appId.nativeElement.value;
    var newfdate = event.formatted.split("/").reverse().join("/");
    this.dataService.seesDet(id, newfdate)
    .subscribe(
          data => {
              console.log(data);
             this.stTime = (data.employerStartTime[0].toString() + ':00');
              this.endTime = (data.employerEndTime[0].toString() + ':00');
              this.detJob2.nativeElement.style.display = 'flex';
              for(var p=0; p<data.employerBusySlots.length;p++) {
                var v = data.employerBusySlots[p].interviewTime - 22*15*60*1000;
                var d = new Date(v);
                var start = d.getHours() + ':' + d.getMinutes();
                if(d.getMinutes()==0) {
                  var start = d.getHours() + ':00';
                }
                else {
                  var start = d.getHours() + ':' + d.getMinutes().toString();
                }

                var v = data.employerBusySlots[p].interviewTime + data.employerBusySlots[p].slotDuration*data.employerBusySlots[p].slots*60*1000 - 22*15*60*1000;
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
          });
  }

  onSubmit(e) {
    
  }

  offer() {
    this.myApps = [];
    this.myRefers = [];
    this.refreqs = [];
    this.time = [];
    var l = -1;
    this.dataService.offerApplieds()
      .subscribe(
            data => {
                for(var i=0;i<data.content.length;i++) {
                  l++;
                  this.myApps.push(data.content[i]);
                  this.interviewDate[l] = data.content[i].interviewTime;
                  this.interviewDate[l] = new Date(this.interviewDate[l]).toUTCString();
                }
              }
        );
    this.dataService.offerApplieds1()
      .subscribe(
            data => {
                for(var i=0;i<data.content.length;i++) {
                  l++;
                  this.myApps.push(data.content[i]);
                  this.interviewDate[l] = data.content[i].interviewTime;
                  this.interviewDate[l] = new Date(this.interviewDate[l]).toUTCString();
                }
              }
        );
    this.dataService.getRequest()
      .subscribe(
            data => {
                for(var i=0;i<data.length;i++) {
                  this.refreqs.push(data[i]);
                  this.time[i] = this.refreqs[i].creationTime;
                  this.time[i] = new Date(this.time[i]).toDateString();
                }
              }
        );
  }

  seeRef(id) {
     this.myRefers = [];
     this.dataService.refStatus(id)
      .subscribe(
            data => {
                  for(var i=0;i<data.length;i++) {
                    this.myRefers.push(data[i]);
                  }
                }
        );
  }

  onSecondChange(e, mode, id, date, slots) {
    this.appId.nativeElement.value = id;
    if(e=='Reschedule') {
      if(mode=='PHONE') {
        this.myMode.nativeElement.value = mode;
        this.slotNo.nativeElement.value = slots;
        this.modePhone.nativeElement.style.display = 'flex';
        this.modeSkypeId.nativeElement.style.display = 'none';
      }
      else if(mode=='SKYPE') {
        this.myMode.nativeElement.value = mode;
        this.modePhone.nativeElement.style.display = 'none';
        this.modeSkypeId.nativeElement.style.display = 'flex';
      }
      else if(mode=='FACE2FACE') {
        this.myMode.nativeElement.value = mode;
        this.modePhone.nativeElement.style.display = 'none';
        this.modeSkypeId.nativeElement.style.display = 'none';
      }
      this.myBn.nativeElement.click();
    }
    if(e=='Schedule') {
      this.slotNo.nativeElement.value = slots;
      this.myMode.nativeElement.value = mode;
      if(mode=='PHONE') {
        this.smyMode.nativeElement.value = mode;
        this.smodePhone.nativeElement.style.display = 'flex';
        this.smodeSkypeId.nativeElement.style.display = 'none';
      }
      else if(mode=='SKYPE') {
        this.smyMode.nativeElement.value = mode;
        this.smodePhone.nativeElement.style.display = 'none';
        this.smodeSkypeId.nativeElement.style.display = 'flex';
      }
      else if(mode=='FACE2FACE') {
        this.smyMode.nativeElement.value = mode;
        this.smodePhone.nativeElement.style.display = 'none';
        this.smodeSkypeId.nativeElement.style.display = 'none';
      }
      this.myBn2.nativeElement.click();
    }
    if(e=='Cancel') {
      var id = this.appId.nativeElement.value;
      this.dataService.cancelJob(id)
      .subscribe(
            data => {
              alert('Interview Cancelled');
              this.offer();
            });
    }
    if(e=='Accept Offer') {
      var id = this.appId.nativeElement.value;
      this.dataService.jobAccept(id)
      .subscribe(
            data => {
              alert('Offer Accepted');
              this.offer();
            });
    }
  }

  saveResch() {
    var md;
    if(this.myMode.nativeElement.value=='PHONE') {
      md = this.phone.nativeElement.value;
    }
    else if(this.myMode.nativeElement.value=='SKYPE') {
      md = this.skypeId.nativeElement.value;
    }
    else if(this.myMode.nativeElement.value=='FACE2FACE') {
      md = '';
    }

    var isoTime = this.dateinterDate.value.toISOString();
    var sec = this.dateinterDate.value.toString().slice(16, 24) + '.241Z';
    var newfdate = this.fDate.selectionDayTxt.split("/").reverse().join("-") + 'T' + sec;
    var k = {
      "interviewTime": newfdate,
      "interviewModeDetail": md,
      "interviewSlots": parseInt(this.slotNo.nativeElement.value)
    }
    console.log(k);
    var id = this.appId.nativeElement.value;
    this.dataService.reschedule(k, id)
    .subscribe(
          data => {
            alert('Interview Rescheduled');
            this.offer();
          });
  }

  saveSch() {
    var md;
    if(this.myMode.nativeElement.value=='PHONE') {
      md = this.phone.nativeElement.value;
      alert('Here');
    }
    else if(this.myMode.nativeElement.value=='SKYPE') {
      md = this.skypeId.nativeElement.value;
    }
    else if(this.myMode.nativeElement.value=='FACE2FACE') {
      md = '';
    }
    var id = this.appId.nativeElement.value;
    this.dataService.schedule(md, id)
    .subscribe(
          data => {
            alert('Interview Scheduled');
            this.offer();
          });
  }

  navigate(event) {
  	var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
  	this.router.navigate([value]);
  }

  editForm(id) {
    this.eoid.nativeElement.value = id;
    document.getElementById('edForm').style.display = 'flex';
    document.getElementById('editparentF').style.display = 'none';
  }

  myForm(id) {
    this.dataService.getRefer(id)
    .subscribe(
          data => {
            this.specData = data;
          });
    document.getElementById('myF').style.display = 'flex';
    document.getElementById('backBtn').style.display = 'inline-block';
    document.getElementById('parentF').style.display = 'none';
  }

  editRef() {
    var k = {
        "id": this.oid.nativeElement.value,
        "companyName": this.company.nativeElement.value,
        "name": this.name.nativeElement.value,
        "address": this.addr.nativeElement.value,
        "phone": this.phn.nativeElement.value,
        "email": this.email.nativeElement.value
    }
    this.dataService.editRefer(k)
    .subscribe(
          data => {
            alert('Details edited');
            this.offer();
          });
  }

  addRef() {
    var id = this.eoid.nativeElement.value;
    var k = [
      {
          "companyName": this.ecompany.nativeElement.value,
          "name": this.ename.nativeElement.value,
          "address": this.eaddr.nativeElement.value,
          "phone": this.ephn.nativeElement.value,
          "email": this.eemail.nativeElement.value
      }
    ]
    this.dataService.addRefer(k, id)
    .subscribe(
          data => {
            alert('Reference Added');
            this.offer();
          });
  }

  approveRef(id) {
    this.dataService.accpetRef(id)
    .subscribe(
          data => {
            alert('Approved');
            this.offer();
          });  
  }

  goBack() {
    document.getElementById('myF').style.display = 'none';
    document.getElementById('backBtn').style.display = 'none';
    document.getElementById('parentF').style.display = 'table';
  }
}
