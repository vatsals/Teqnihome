import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';
import {CalendarprimModule} from 'primeng/calendar';

@Component({
  selector: 'app-providereference',
  templateUrl: './providereference.component.html',
  styleUrls: ['./providereference.component.css']
})
export class ProvidereferenceComponent implements OnInit {
  userImg: string;
  p: number;
  myRefers = [];
  allRefers = [];
  @ViewChild('myBn') myBn;
  @ViewChild('ref') ref;
  @ViewChild('empS') empS;
  @ViewChild('empE') empE;
  @ViewChild('rec') rec;
  @ViewChild('mid') mid;
  @ViewChild('reason') reason;
  date7: Date;
  date8: Date;  
    dates: Date[];
    rangeDates: Date[];
    minDate: Date;
    maxDate: Date;

    es: any;
    tr: any;
    invalidDates: Array<Date>
  
  constructor(private dragulaService: DragulaService, private router:Router, private dataService:DataService) {
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
  	this.refer();
  }

  onSubmit(e) {
    
  }

  refer() {
  	this.myRefers = [];
  	this.allRefers = [];
  	this.dataService.provideRefer()
        .subscribe(
              data => {
                this.myRefers = data;
              }
          );
  }

  saveRef(id) {
  	this.mid.nativeElement.value = id;
  	this.myBn.nativeElement.click();
  }

  provideRef() {
  	var k = {
	    "id": this.mid.nativeElement.value,
	    "reference": this.ref.nativeElement.value,
	    "employmentStartDate": this.empS.innerFieldValue,
	    "employmentEndDate": this.empE.innerFieldValue,
	    "recommended": this.rec.nativeElement.value,
	    "reasonForLeaving": this.reason.nativeElement.value
	};
  // console.log(k);
	this.dataService.empRefAdd(k, this.mid.nativeElement.value)
        .subscribe(
              data => {
                alert('Reference Added');
                this.refer();
              }
          );
  }

  removeRef(id) {
  	this.dataService.empRefRemove(id)
        .subscribe(
              data => {
                alert('Reference Removed');
                this.refer();
              }
          );
  }

}
