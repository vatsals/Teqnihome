import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-editoffer',
  templateUrl: './editoffer.component.html',
  styleUrls: ['./editoffer.component.css']
})
export class EditofferComponent implements AfterViewInit {
  value: number;
  numbers: Array<number>;
  myChart:any;
  id: number;
  private sub: any;
  myInfos: any;
  userImg: string;
  myHtml: string;
  appendHtml: string;
  @ViewChild('jobId') jobId;
  @ViewChild('comp') comp;
  @ViewChild('role') role;
  @ViewChild('desc') desc;
  @ViewChild('execpt') execpt;
  @ViewChild('locatn') locatn;
  @ViewChild('remote') remote;
  @ViewChild('status') status;
  @ViewChild('salFrom') salFrom;
  @ViewChild('salTo') salTo;
  @ViewChild('curr') curr;
  @ViewChild('empno') empno;
  @ViewChild('web') web;
  @ViewChild('fb') fb;
  @ViewChild('tweet') tweet;
  @ViewChild('linked') linked;
  @ViewChild('degl') degl;
  @ViewChild('deg') deg;
  @ViewChild('gpa') gpa;
  @ViewChild('disc') disc;
  @ViewChild('jobRoleType') jobRoleType;
  @ViewChild('jobRole') jobRole;
  @ViewChild('jobLevel') jobLevel;
  @ViewChild('report') report;
  @ViewChild('reportNo') reportNo;
  @ViewChild('clear') clear;
  @ViewChild('foreign') foreign;
  @ViewChild('interact') interact;
  @ViewChild('expiry') expiry;
  @ViewChild('subcat') subcat;
  Onumbers = [];
  Pnumbers = [];
  Fnumbers = [];
  Inumbers = [];
  Dnumbers = [];
  Vnumbers = [];
  Lnumbers = [];
  Hnumbers = [];
  Tnumbers = [];
  myData = [];
  user = {
    jobId: '',
    desig: '',
    desc: '',
    execpt: '',
    remote: 'true',
    salfrom: '',
    salto: '',
    curr: 'Dollar',
    deg: 'B.Tech',
    degl: 'High School',
    gpa: '',
    comp: '',
    locatn: '',
    empno: '',
    web: '',
    fb: '',
    linked: '',
    tweet: '',
    disc: '',
    jobRole: '',
    jobLevel: '',
    report: '',
    reportNo: '',
    clear: 'Yes',
    travel: 'Yes',
    interact: 'Yes',
    status: 'true',
    expiry: ''
  }
  cats = [];
  skills= [];
  subcats = [];
  types = [];
  skillTypes = [];
  selThrees = [];
  selFours = [];
  sOpts = [];
  scroll: boolean;
  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
      this.prep();
    }

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute, private elementRef: ElementRef) { 
  	this.value = 1;
    this.scroll = true;
  	this.numbers = Array(3).fill(4);
  }

  prep() {
    if(this.types.length>0) {
      if(this.scroll) {
        this.sOpts = [];
        this.dataService.getsSkillInfos()
          .subscribe(
                data => {
                  for(var y=0;y<data.length;y++) {
                    for(var q=0;q<this.types.length;q++) {
                      if(data[y].type.name==this.types[q]) {
                        this.sOpts.push(data[y].name);
                      } 
                    }
                  }
                  console.log(this.sOpts);
                }
              );
          this.scroll = false;
      }
     }
  }

  ngAfterViewInit() {
     this.dataService.getsResCat()
      .subscribe(
            data => {
              this.cats = [];
                this.cats = data;
            }
        );
  	this.sub = this.activeRoute.params.subscribe(params => {
       this.id = +params['id'];
       this.dataService.offerSpecific(this.id)
      .subscribe(
            data => {
    			    this.Onumbers = [];
      				this.Pnumbers = [];
      				this.Fnumbers = [];
      				this.Inumbers = [];
      				this.Dnumbers = [];
      				this.Vnumbers = [];
      				this.Tnumbers = [];
          		this.myInfos = data;
              this.subcat.nativeElement.value = data.offer.subCategory.id;
              this.getVals(this.subcat.nativeElement.value, data);

          		// for(var i=0;i<data.skills.length;i++) {
          		// 	if(data.skills[i].type=='operatingSystems') {
          		// 		this.Onumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          		// 	}
          		// 	else if(data.skills[i].type=='programmingLanguages') {
          		// 		this.Pnumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          		// 	}
          		// 	else if(data.skills[i].type=='frameworks') {
          		// 		this.Fnumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          		// 	}
          		// 	else if(data.skills[i].type=='ide') {
          		// 		this.Inumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          		// 	}
          		// 	else if(data.skills[i].type=='buildManagement') {
          		// 		this.Vnumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          		// 	}
          		// 	else if(data.skills[i].type=='testingFrameworks') {
          		// 		this.Tnumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          		// 	}
          		// 	else if(data.skills[i].type=='databases') {
          		// 		this.Dnumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          		// 	}
          		// }
              }
        );
    });
  }

  getVals(id, dt) {
    // dt.skills.sort((a, b) => {
    //   if (a.type.toLowerCase() < b.type.toLowerCase()) return -1;
    //   else if (a.type.toLowerCase() > b.type.toLowerCase()) return 1;
    //   else return 0;
    // });
    this.dataService.getsResSubTypeCat(id)
        .subscribe(
              data => {
                // data.sort((a, b) => {
                //   if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                //   else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                //   else return 0;
                // });
                for(var i=0;i<data.length;i++) {
                  this.types.push(data[i].name);
                }
                for(var i=0;i<dt.skills.length;i++) {
                  for(var j=0;j<this.types.length;j++) {
                    //console.log(dt.skills[i].type + ' : ' + this.types[j]);
                    if(dt.skills[i].type==this.types[0]) {
                      this.Onumbers.push( {"type": dt.skills[i].type, "val" : dt.skills[i].percent, "name": dt.skills[i].name });
                    }
                    else if(dt.skills[i].type==this.types[1]) {
                      this.Pnumbers.push( {"type": dt.skills[i].type, "val" : dt.skills[i].percent, "name": dt.skills[i].name });
                    }
                    else if(dt.skills[i].type==this.types[2]) {
                      this.Fnumbers.push( {"type": dt.skills[i].type, "val" : dt.skills[i].percent, "name": dt.skills[i].name });
                    }
                    else if(dt.skills[i].type==this.types[3]) {
                      this.Inumbers.push( {"type": dt.skills[i].type, "val" : dt.skills[i].percent, "name": dt.skills[i].name });
                    }
                    else if(dt.skills[i].type==this.types[4]) {
                      this.Vnumbers.push( {"type": dt.skills[i].type, "val" : dt.skills[i].percent, "name": dt.skills[i].name });
                    }
                    else if(dt.skills[i].type==this.types[5]) {
                      this.Tnumbers.push( {"type": dt.skills[i].type, "val" : dt.skills[i].percent, "name": dt.skills[i].name });
                    }
                    else if(dt.skills[i].type==this.types[6]) {
                      this.Dnumbers.push( {"type": dt.skills[i].type, "val" : dt.skills[i].percent, "name": dt.skills[i].name });
                    }
                  }
                }
                var newArray = []; var lookupObject  = {};
                for(var ind in this.Onumbers) {
                    lookupObject[this.Onumbers[ind]["name"]] = this.Onumbers[ind];
                }

                for(ind in lookupObject) {
                    newArray.push(lookupObject[ind]);
                }
                this.Onumbers = newArray;
                var newArray = []; var lookupObject  = {};
                for(var ind in this.Pnumbers) {
                    lookupObject[this.Pnumbers[ind]["name"]] = this.Pnumbers[ind];
                }

                for(ind in lookupObject) {
                    newArray.push(lookupObject[ind]);
                }
                this.Pnumbers = newArray;
                var newArray = []; var lookupObject  = {};
                for(var ind in this.Fnumbers) {
                    lookupObject[this.Fnumbers[ind]["name"]] = this.Fnumbers[ind];
                }

                for(ind in lookupObject) {
                    newArray.push(lookupObject[ind]);
                }
                this.Fnumbers = newArray;
                var newArray = []; var lookupObject  = {};
                for(var ind in this.Inumbers) {
                    lookupObject[this.Inumbers[ind]["name"]] = this.Inumbers[ind];
                }

                for(ind in lookupObject) {
                    newArray.push(lookupObject[ind]);
                }
                this.Inumbers = newArray;
                var newArray = []; var lookupObject  = {};
                for(var ind in this.Vnumbers) {
                    lookupObject[this.Vnumbers[ind]["name"]] = this.Vnumbers[ind];
                }

                for(ind in lookupObject) {
                    newArray.push(lookupObject[ind]);
                }
                this.Vnumbers = newArray;
                var newArray = []; var lookupObject  = {};
                for(var ind in this.Tnumbers) {
                    lookupObject[this.Tnumbers[ind]["name"]] = this.Tnumbers[ind];
                }

                for(ind in lookupObject) {
                    newArray.push(lookupObject[ind]);
                }
                this.Tnumbers = newArray;
                var newArray = []; var lookupObject  = {};
                for(var ind in this.Dnumbers) {
                    lookupObject[this.Dnumbers[ind]["name"]] = this.Dnumbers[ind];
                }

                for(ind in lookupObject) {
                    newArray.push(lookupObject[ind]);
                }
                this.Dnumbers = newArray;
              }
            );
  }

  append(val, event) {
    if(event.target.id=='os') {
      this.Onumbers.push({"type": this.types[0], "name": "", "val": 0});
    }
    else if(event.target.id=='pl') {
      this.Pnumbers.push({"type": this.types[1], "name": "", "val": 0});
    }
    else if(event.target.id=='fw') {
      this.Fnumbers.push({"type": this.types[2], "name": "", "val": 0});
    }
    else if(event.target.id=='ide') {
      this.Inumbers.push({"type": this.types[3], "name": "", "val": 0});
    }
    else if(event.target.id=='db') {
      this.Dnumbers.push({"type": this.types[4], "name": "", "val": 0});
    }
    else if(event.target.id=='vc') {
      this.Vnumbers.push({"type": this.types[5], "name": "", "val": 0});
    }
    else if(event.target.id=='tf') {
      this.Tnumbers.push({"type": this.types[6], "name": "", "val": 0});
    }
    else if(event.target.id=='langk') {
      this.Lnumbers.push({"name": "", "val": 0});
    }
    else if(event.target.id=='hob') {
      this.Hnumbers.push({"name": "", "val": 0});
    }
    else {}
  }

  remove(val, event) {
    if(event.target.id=='os') {
      let index = this.Onumbers.indexOf(val);
      this.Onumbers.splice(index, 1);
    }
    else if(event.target.id=='pl') {
      let index = this.Pnumbers.indexOf(val);
      this.Pnumbers.splice(index, 1);
    }
    else if(event.target.id=='fw') {
      let index = this.Fnumbers.indexOf(val);
      this.Fnumbers.splice(index, 1);
    }
    else if(event.target.id=='ide') {
      let index = this.Inumbers.indexOf(val);
      this.Inumbers.splice(index, 1);
    }
    else if(event.target.id=='db') {
      let index = this.Dnumbers.indexOf(val);
      this.Dnumbers.splice(index, 1);
    }
    else if(event.target.id=='vc') {
      let index = this.Vnumbers.indexOf(val);
      this.Vnumbers.splice(index, 1);
    }
    else if(event.target.id=='tf') {
      let index = this.Tnumbers.indexOf(val);
      this.Tnumbers.splice(index, 1);
    }
    else if(event.target.id=='langk') {
      let index = this.Lnumbers.indexOf(val);
      this.Lnumbers.splice(index, 1);
    }
    else if(event.target.id=='hob') {
      let index = this.Hnumbers.indexOf(val);
      this.Hnumbers.splice(index, 1);
    }
    else {}
  }

  setVal(event) {
    event.target.nextElementSibling.innerHTML = event.target.value;
  }

  onSubmitForm({value, valid}) {
    var k = {
        "jobId": this.jobId.nativeElement.value,
        "company": this.comp.nativeElement.value,
        "role": this.role.nativeElement.value,
        "description": this.desc.nativeElement.value,
        "experienceDuration": this.execpt.nativeElement.value,
        "location": this.locatn.nativeElement.value,
        "isWorkRemotely": this.remote.nativeElement.value,
        "active": this.status.nativeElement.value,
        "salaryFrom": this.salFrom.nativeElement.value,
        "salaryTo": this.salTo.nativeElement.value,
        "salaryCurrency": this.curr.nativeElement.value,
        "employeesAmount": this.empno.nativeElement.value,
        "website": this.web.nativeElement.value,
        "facebook": this.fb.nativeElement.value,
        "twitter": this.tweet.nativeElement.value,
        "linkedin": this.linked.nativeElement.value,
        "educationDegreeLevel": this.degl.nativeElement.value,
        "educationDegree": this.deg.nativeElement.value,
        "educationGPA": this.gpa.nativeElement.value,
        "discipline": this.disc.nativeElement.value,
        "jobRoleType": this.jobRoleType.nativeElement.value,
        "jobLevel": this.jobLevel.nativeElement.value,
        "reportingPerson": this.report.nativeElement.value,
        "numberPersonReport": this.reportNo.nativeElement.value,
        "securityClearance": this.clear.nativeElement.value,
        "foreignTravel": this.foreign.nativeElement.value,
        "customerInteraction": this.interact.nativeElement.value,
        "expiryDate": this.expiry.nativeElement.value
    };
    // console.log(k);
    this.sub = this.activeRoute.params.subscribe(params => {
       var eid = +params['id'];
	    this.dataService.jobEditn(k, eid)
	      .subscribe(
	            data => {
	              alert('Job Posted successfully');
	            }
	        );
	  });
  }

  saveSkill() {
    var k = [];
    for(var i=0;i<this.Onumbers.length;i++) {
      var id = 'os-' +i;
      var idV = 'osV-' +i;
      if((<HTMLInputElement>document.getElementById(id)).value != '') {
        k.push({
          "name": (<HTMLInputElement>document.getElementById(id)).value,
          "percent": (<HTMLInputElement>document.getElementById(idV)).value,
          "type": this.types[0]
        });
      }
    }
    for(var i=0;i<this.Pnumbers.length;i++) {
      var id = 'pl-' +i;
      var idV = 'plV-' +i;
      if((<HTMLInputElement>document.getElementById(id)).value != '') {
        k.push({
          "name": (<HTMLInputElement>document.getElementById(id)).value,
          "percent": (<HTMLInputElement>document.getElementById(idV)).value,
          "type": this.types[1]
        });
      }
    }
    for(var i=0;i<this.Fnumbers.length;i++) {
      var id = 'frame-' +i;
      var idV = 'frameV-' +i;
      if((<HTMLInputElement>document.getElementById(id)).value != '') {
        k.push({
          "name": (<HTMLInputElement>document.getElementById(id)).value,
          "percent": (<HTMLInputElement>document.getElementById(idV)).value,
          "type": this.types[2]
        });
      }
    }
    for(var i=0;i<this.Inumbers.length;i++) {
      var id = 'ide-' +i;
      var idV = 'ideV-' +i;
      if((<HTMLInputElement>document.getElementById(id)).value != '') {
        k.push({
          "name": (<HTMLInputElement>document.getElementById(id)).value,
          "percent": (<HTMLInputElement>document.getElementById(idV)).value,
          "type": this.types[3]
        });
      }
    }
    for(var i=0;i<this.Dnumbers.length;i++) {
      var id = 'db-' +i;
      var idV = 'dbV-' +i;
      if((<HTMLInputElement>document.getElementById(id)).value != '') {
        k.push({
          "name": (<HTMLInputElement>document.getElementById(id)).value,
          "percent": (<HTMLInputElement>document.getElementById(idV)).value,
          "type": this.types[4]
        });
      }
    }
    for(var i=0;i<this.Vnumbers.length;i++) {
      var id = 'vc-' +i;
      var idV = 'vcV-' +i;
      if((<HTMLInputElement>document.getElementById(id)).value != '') {
        k.push({
          "name": (<HTMLInputElement>document.getElementById(id)).value,
          "percent": (<HTMLInputElement>document.getElementById(idV)).value,
          "type": this.types[5]
        });
      }
    }
    for(var i=0;i<this.Tnumbers.length;i++) {
      var id = 'tframe-' +i;
      var idV = 'tframeV-' +i;
      if((<HTMLInputElement>document.getElementById(id)).value != '') {
        k.push({
          "name": (<HTMLInputElement>document.getElementById(id)).value,
          "percent": (<HTMLInputElement>document.getElementById(idV)).value,
          "type": this.types[6]
        });
      }
    }
    this.sub = this.activeRoute.params.subscribe(params => {
       var sid = +params['id'];
       this.dataService.skillAddition(k, sid)
      .subscribe(
            data => {
            	alert('Skills edited');
            	this.dataService.offerSpecific(this.id)
      .subscribe(
            data => {
			      this.Onumbers = [];
    				this.Pnumbers = [];
    				this.Fnumbers = [];
    				this.Inumbers = [];
    				this.Dnumbers = [];
    				this.Vnumbers = [];
    				this.Tnumbers = [];
          		this.myInfos = data;
          		for(var i=0;i<data.skills.length;i++) {
                  for(var j=0;j<this.types.length;j++) {
                    //console.log(data.skills[i].type + ' : ' + this.types[j]);
                    if(data.skills[i].type==this.types[0]) {
                      this.Onumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                    else if(data.skills[i].type==this.types[1]) {
                      this.Pnumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                    else if(data.skills[i].type==this.types[2]) {
                      this.Fnumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                    else if(data.skills[i].type==this.types[3]) {
                      this.Inumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                    else if(data.skills[i].type==this.types[4]) {
                      this.Vnumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                    else if(data.skills[i].type==this.types[5]) {
                      this.Tnumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                    else if(data.skills[i].type==this.types[6]) {
                      this.Dnumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                  }
                }
              }
        );
              }
        );
   }
   );
  }

  cancelJob() {
    this.user = {
    jobId: '',
    desig: '',
    desc: '',
    execpt: '',
    remote: 'true',
    salfrom: '',
    salto: '',
    curr: 'Dollar',
    deg: 'B.Tech',
    degl: 'High School',
    gpa: '',
    comp: '',
    locatn: '',
    empno: '',
    web: '',
    fb: '',
    linked: '',
    tweet: '',
    disc: '',
    jobRole: '',
    jobLevel: '',
    report: '',
    reportNo: '',
    clear: 'Yes',
    travel: 'Yes',
    interact: 'Yes',
    status: 'true',
    expiry: ''
  }
  this.dataService.offerSpecific(this.id)
      .subscribe(
            data => {
			      this.Onumbers = [];
    				this.Pnumbers = [];
    				this.Fnumbers = [];
    				this.Inumbers = [];
    				this.Dnumbers = [];
    				this.Vnumbers = [];
    				this.Tnumbers = [];
          		this.myInfos = data;
          		for(var i=0;i<data.skills.length;i++) {
                  for(var j=0;j<this.types.length;j++) {
                    //console.log(data.skills[i].type + ' : ' + this.types[j]);
                    if(data.skills[i].type==this.types[0]) {
                      this.Onumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                    else if(data.skills[i].type==this.types[1]) {
                      this.Pnumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                    else if(data.skills[i].type==this.types[2]) {
                      this.Fnumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                    else if(data.skills[i].type==this.types[3]) {
                      this.Inumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                    else if(data.skills[i].type==this.types[4]) {
                      this.Vnumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                    else if(data.skills[i].type==this.types[5]) {
                      this.Tnumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                    else if(data.skills[i].type==this.types[6]) {
                      this.Dnumbers.push( {"type": data.skills[i].type, "val" : data.skills[i].percent, "name": data.skills[i].name });
                    }
                  }
                }
              }
        );
  }

  cancelSkill() {
  	this.dataService.offerSpecific(this.id)
      .subscribe(
            data => {
			      this.Onumbers = [];
    				this.Pnumbers = [];
    				this.Fnumbers = [];
    				this.Inumbers = [];
    				this.Dnumbers = [];
    				this.Vnumbers = [];
    				this.Tnumbers = [];
          		this.myInfos = data;
          		for(var i=0;i<data.skills.length;i++) {
          			if(data.skills[i].type=='operatingSystems') {
          				this.Onumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          			}
          			else if(data.skills[i].type=='programmingLanguages') {
          				this.Pnumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          			}
          			else if(data.skills[i].type=='frameworks') {
          				this.Fnumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          			}
          			else if(data.skills[i].type=='ide') {
          				this.Inumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          			}
          			else if(data.skills[i].type=='buildManagement') {
          				this.Vnumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          			}
          			else if(data.skills[i].type=='testingFrameworks') {
          				this.Tnumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          			}
          			else if(data.skills[i].type=='databases') {
          				this.Dnumbers.push( { "val" : data.skills[i].percent, "name": data.skills[i].name });
          			}
          		}
              }
        );
  }

}
