import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';

@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {
  userImg: string;
  myHtml: string;
  number: any;
  appendHtml: string;
  Onumbers = [
            {val: '0', id: '1'},
        ];
  Pnumbers = [
            {val: '0', id: '1'},
        ];
  Fnumbers = [
            {val: '0', id: '1'},
        ];
  Inumbers = [
            {val: '0', id: '1'},
        ];
  Dnumbers = [
            {val: '0', id: '1'},
        ];
  Vnumbers = [
            {val: '0', id: '1'},
        ];
  Tnumbers = [
      {val: '0', id: '1'},
  ];
  @ViewChild('myF') mF;
  @ViewChild('backBtn') backBtn;
  @ViewChild('saveBtn') saveBtn;
  @ViewChild('pF') pF;
  @ViewChild('defBtn') defBtn;
  @ViewChild('myBn') myBn;
  @ViewChild('myCard') md;
  @ViewChild('recd') recd;
  @ViewChild('recId') recId;
  @ViewChild('frdId') frdId;
  @ViewChild('frid') frid;
  @ViewChild('recd2') recd2;
  @ViewChild('recId2') recId2;
  @ViewChild('frdId2') frdId2;
  @ViewChild('frid2') frid2;
  @ViewChild('sld') slide;
  @ViewChild('demo') demo;
  @ViewChild('sldVal') slideVal;
  @ViewChild('parentlinkOne') parentlinkOne;
  @ViewChild('parentlinkOne2') parentlinkOne2;
  cats = [];
  skills= [];
  subcats = [];
  selThrees = [];
  selFours = [];
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
    clear: 'yes',
    travel: 'yes',
    interact: 'yes',
    status: 'true',
    expiry: ''
  }
  jobId: number;

  constructor(private dragulaService: DragulaService, private router:Router, private dataService:DataService) {
    this.myHtml = '';
    this.userImg = '/assets/images/user.png';
    this.dataService.myJobs()
      .subscribe(
            data => {
              console.log(data);
              this.jobId = data[data.length-1].id;
              if(this.jobId) {
                if(data[data.length-1].isWorkRemotely) {
                  this.user.remote = data[data.length-1].isWorkRemotely;
                }
                if(data[data.length-1].location) {
                  this.user.locatn = data[data.length-1].location;
                }
                if(data[data.length-1].educationDegree) {
                  this.user.deg = data[data.length-1].educationDegree;
                }
                if(data[data.length-1].educationDegreeLevel) {
                  this.user.degl = data[data.length-1].educationDegreeLevel;
                }
                if(data[data.length-1].company) {
                  this.user.comp = data[data.length-1].company;
                }
                if(data[data.length-1].facebook) {
                  this.user.fb = data[data.length-1].facebook;
                }
                if(data[data.length-1].website) {
                  this.user.web = data[data.length-1].website;
                }
                if(data[data.length-1].linkedin) {
                  this.user.linked = data[data.length-1].linkedin;
                }
                if(data[data.length-1].twitter) {
                  this.user.tweet = data[data.length-1].twitter;
                }
                if(data[data.length-1].securityClearance) {
                  this.user.clear = data[data.length-1].securityClearance;
                }
                if(data[data.length-1].customerInteraction) {
                  this.user.interact = data[data.length-1].customerInteraction;
                }
                if(data[data.length-1].foreignTravel) {
                  this.user.travel = data[data.length-1].foreignTravel;
                }
              }
            }
        );
  }

  ngOnInit() {
    this.myBn.nativeElement.click();
    this.dataService.getsResCat()
      .subscribe(
            data => {
              this.cats = [];
                this.cats = data;
            }
        );
  }

  selNew2(e) {
    this.dataService.getsResSubCat(e.target.value)
      .subscribe(
            data => {
                this.subcats = data;
              }
        );
  }

  selNew3(e) {
    this.dataService.getsResSkills(e.target.value)
    .subscribe(
          data => {
              console.log(data);
              this.skills = data;
            }
      );
    this.dataService.getsSkillInfos()
    .subscribe(
          data => {
              this.selThrees = data;
              this.selThrees.sort((a, b) => {
                  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                  else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                  else return 0;
                });
            }
      );
    this.dataService.getsSkillTypeInfos()
    .subscribe(
          data => {
              this.selFours = data;
              this.selFours.sort((a, b) => {
                  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                  else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                  else return 0;
                });
            }
      );
  }

  onSubmitForm({value, valid}) {
    var k = {
        "jobId": value.jobId,
        "company": value.comp,
        "role": value.desig,
        "description": value.desc,
        "experienceDuration": value.execpt,
        "location": value.locatn,
        "isWorkRemotely": value.remote,
        "active": value.status,
        "salaryFrom": value.salfrom,
        "salaryTo": value.salto,
        "salaryCurrency": value.curr,
        "employeesAmount": value.empno,
        "website": value.web,
        "facebook": value.fb,
        "twitter": value.tweet,
        "linkedin": value.linked,
        "educationDegreeLevel": value.degl,
        "educationDegree": value.deg,
        "educationGPA": value.gpa,
        "jobRoleType": value.jobRole,
        "jobLevel": value.jobLevel,
        "reportingPerson": value.report,
        "numberPersonReport": value.reportNo,
        "securityClearance": value.clear,
        "foreignTravel": value.travel,
        "customerInteraction": value.interact,
        "subCategory": {
            "category": {
              "id": parseInt(this.parentlinkOne.nativeElement.value),
            },
             "id": parseInt(this.parentlinkOne2.nativeElement.value),
        },
        "expiryDate": value.expiry
    };
    this.dataService.jobAddition(k)
      .subscribe(
            data => {
              alert('Job Posted successfully');
              console.log(data.offer);
              this.router.navigate(['editoffer', data.offer.id ]);
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
          "type": "operatingSystems"
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
          "type": "programmingLanguages"
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
          "type": "frameworks"
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
          "type": "ide"
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
          "type": "databases"
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
          "type": "buildManagement"
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
          "type": "testingFrameworks"
        });
      }
    }
    var sid = this.jobId;
    this.dataService.skillAddition(k, sid)
      .subscribe(
            data => {
                alert('Skill saved');
              }
        );
  }

  saveJob() {
    
  }

  cancelSkill() {
    
  }

  append(val, event) {
    if(event.target.id=='os') {
      this.Onumbers.push(val);
    }
    else if(event.target.id=='pl') {
      this.Pnumbers.push(val);
    }
    else if(event.target.id=='fw') {
      this.Fnumbers.push(val);
    }
    else if(event.target.id=='ide') {
      this.Inumbers.push(val);
    }
    else if(event.target.id=='db') {
      this.Dnumbers.push(val);
    }
    else if(event.target.id=='vc') {
      this.Vnumbers.push(val);
    }
    else if(event.target.id=='tf') {
      this.Tnumbers.push(val);
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
    else {}
  }

  setVal(event) {
    event.target.nextElementSibling.innerHTML = event.target.value;
  }

  dispRec() {
    this.recd.nativeElement.style.display = 'block';
    this.recId.nativeElement.style.fontWeight = '600';
    this.recId.nativeElement.style.fontSize = '15px';
    this.frdId.nativeElement.style.fontWeight = '200';
    this.frdId.nativeElement.style.fontSize = '14px';
    this.frid.nativeElement.style.display = 'none';
  }

  dispFrd() {
    this.frid.nativeElement.style.display = 'flex';
    this.recId.nativeElement.style.fontWeight = '200';
    this.recId.nativeElement.style.fontSize = '14px';
    this.frdId.nativeElement.style.fontWeight = '600';
    this.frdId.nativeElement.style.fontSize = '15px';
    this.recd.nativeElement.style.display = 'none';
  }

  dispRec2() {
    this.recd2.nativeElement.style.display = 'block';
    this.recId2.nativeElement.style.fontWeight = '600';
    this.recId2.nativeElement.style.fontSize = '15px';
    this.frdId2.nativeElement.style.fontWeight = '200';
    this.frdId2.nativeElement.style.fontSize = '14px';
    this.frid2.nativeElement.style.display = 'none';
  }

  dispFrd2() {
    this.frid2.nativeElement.style.display = 'flex';
    this.recId2.nativeElement.style.fontWeight = '200';
    this.recId2.nativeElement.style.fontSize = '14px';
    this.frdId2.nativeElement.style.fontWeight = '600';
    this.frdId2.nativeElement.style.fontSize = '15px';
    this.recd2.nativeElement.style.display = 'none';
  }

  // myForm() {
  //   this.mF.nativeElement.style.display = 'flex';
  //   this.backBtn.nativeElement.style.display = 'inline-block';
  //   this.saveBtn.nativeElement.style.display = 'inline-block';
  //   this.pF.nativeElement.style.display = 'none';
  //   this.defBtn.nativeElement.style.display = 'none';
  // }
  // goBack() {
  //   this.mF.nativeElement.style.display = 'none';
  //   this.backBtn.nativeElement.style.display = 'none';
  //   this.saveBtn.nativeElement.style.display = 'none';
  //   this.pF.nativeElement.style.display = 'flex';
  //   this.defBtn.nativeElement.style.display = 'inline-block';
  // }
  save() {
    document.getElementById('demo').style.display = 'none';
    document.getElementById('myCd').style.display = 'block';
    this.myBn.nativeElement.style.display = 'none';
  }

}
