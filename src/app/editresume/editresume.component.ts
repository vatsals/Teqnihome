import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-editresume',
  templateUrl: './editresume.component.html',
  styleUrls: ['./editresume.component.css']
})
export class EditresumeComponent implements AfterViewInit {
  value: number;
  numbers: Array<number>;
  myChart:any;
  Onumbers = [];
  Pnumbers = [];
  Fnumbers = [];
  Inumbers = [];
  Dnumbers = [];
  Vnumbers = [];
  Tnumbers = [];
  Lnumbers = [];
  Hnumbers = [];
  @ViewChild('pg') pgraph;
  @ViewChild('eg') egraph;
  @ViewChild('myF') mF;
  @ViewChild('backBtn') backBtn;
  @ViewChild('saveBtn') saveBtn;
  @ViewChild('pF') pF;
  @ViewChild('defBtn') defBtn;
  @ViewChild('svBtn') svBtn;
  @ViewChild('svresBtn') svresBtn;
  @ViewChild('sval') sv;
  @ViewChild('mpagedemo') mpagedemo;
  @ViewChild('mybn') mybn;
  @ViewChild('name') name;
  @ViewChild('company') company;
  @ViewChild('desig') desig;
  @ViewChild('nation') nation;
  @ViewChild('dob') dob;
  @ViewChild('exp') exp;
  @ViewChild('name') rname;
  @ViewChild('dob') rdob;
  @ViewChild('nation') rnation;
  @ViewChild('exp') rexp;
  @ViewChild('desig') rdesig;
  @ViewChild('company') rcompany;

  @ViewChild('eduOrg') eduOrg;
  @ViewChild('eduLoc') eduLoc;
  @ViewChild('eduWeb') eduWeb;
  @ViewChild('eduFrom') eduFrom;
  @ViewChild('eduTo') eduTo;
  @ViewChild('eduAch') eduAch;
  @ViewChild('eduDeg') eduDeg;
  @ViewChild('eduDegl') eduDegl;
  @ViewChild('eduSub') eduSub;

  @ViewChild('expOrg') expOrg;
  @ViewChild('expJob') expJob;
  @ViewChild('expPos') expPos;
  @ViewChild('expWeb') expWeb;
  @ViewChild('expFrom') expFrom;
  @ViewChild('expTo') expTo;
  @ViewChild('expAch') expAch;
  @ViewChild('expDeg') expDeg;
  @ViewChild('expDegl') expDegl;
  @ViewChild('expSub') expSub;
  @ViewChild('myId') myId;
  @ViewChild('subcat') subcat;
  
  resData: any;
  number: any;
  myEdus: any;
  myExps: any;
  Edunumbers = [];
  Expnumbers = [];
  eduYear = [];
  expYear = [];
  @ViewChild('parentlinkOne') parentlinkOne;
  @ViewChild('parentlinkOne2') parentlinkOne2;
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

  constructor(private dragulaService: DragulaService, private router:Router, private dataService:DataService, private el: ElementRef) { 
    this.value = 1;
    this.scroll = true;
    this.numbers = Array(3).fill(4);
    this.getDet();
  }

  ngAfterViewInit() {
  	// this.mybn.nativeElement.click();
    // this.save();
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

  getDet() {
    this.dataService.getsResCat()
      .subscribe(
            data => {
              this.cats = [];
                this.cats = data;
            }
        );
    this.dataService.getResume()
        .subscribe(
              data => {
                this.resData = data;
                this.rname.nativeElement.value = this.resData.resume.name;
                this.rdob.nativeElement.value = this.resData.resume.dob;
                this.rnation.nativeElement.value = this.resData.resume.nationality;
                this.rexp.nativeElement.value = this.resData.resume.yearsOfExperience;
                this.rdesig.nativeElement.value = this.resData.resume.designation;
                this.rcompany.nativeElement.value = this.resData.resume.company;
                this.parentlinkOne.nativeElement.value = this.resData.resume.resumeSubCategory.category.id;
                this.subcat.nativeElement.value = this.resData.resume.resumeSubCategory.id;
                this.getVals(this.subcat.nativeElement.value, data);
                this.myId.nativeElement.value = this.resData.resume.id;
                for (let key in this.resData.resume.languageKnown) {
                    this.Lnumbers.push({
                      "name": key,
                      "val": this.resData.resume.languageKnown[key]
                    });
                }
                for (let key in this.resData.resume.hobbies) {
                    this.Hnumbers.push({
                      "name": key,
                      "val": this.resData.resume.hobbies[key]
                    });
                }
                this.myEdus = this.resData.education;
                for(var i = 0;i<this.resData.education.length;i++) {
                  this.eduYear[i] = this.resData.education[i].periodFrom;
                  this.eduYear[i] = new Date(this.eduYear[i]).getUTCFullYear();
                  var pF = this.resData.education[i].periodFrom;
                  pF = new Date(pF).toLocaleDateString();
                  pF = pF.split("/").reverse().join("-");
                  var pT = this.resData.education[i].periodFrom;
                  pT = new Date(pT).toLocaleDateString();
                  pT = pT.split("/").reverse().join("-");
                  this.Edunumbers.push({ 
                    "colName": this.resData.education[i].collegeName, 
                    "colWeb": this.resData.education[i].collegeWebsite, 
                    "perFrom": pF, 
                    "perTo": pT, 
                    "edudeg": this.resData.education[i].degree, 
                    "edudegl": this.resData.education[i].degreeLevel, 
                    "edudet": this.resData.education[i].details, 
                    "eduloc": this.resData.education[i].location, 
                    "edusub": this.resData.education[i].subject
                  });
                }
                this.myExps = this.resData.experience;
                for(var i = 0;i<this.resData.experience.length;i++) {
                  var skills = '';
                  for(var j = 0; j<this.resData.experience[i].skillsUsed.length;j++) {
                    if(this.resData.experience[i].skillsUsed[j] == '') {
                      skills = skills + this.resData.experience[i].skillsUsed[j];
                    }
                    else {
                      skills = skills + this.resData.experience[i].skillsUsed[j] + ',';
                    }
                  }
                  this.expYear[i] = this.resData.experience[i].periodFrom;
                  this.expYear[i] = new Date(this.expYear[i]).getUTCFullYear();
                  var pF = this.resData.experience[i].periodFrom;
                  pF = new Date(pF).toLocaleDateString();
                  pF = pF.split("/").reverse().join("-");
                  var pT = this.resData.experience[i].periodTo;
                  pT = new Date(pT).toLocaleDateString();
                  pT = pT.split("/").reverse().join("-");
                  this.Expnumbers.push({ 
                    "companyName": this.resData.experience[i].companyName,
                    "companyWebsite": this.resData.experience[i].companyWebsite,
                    "position": this.resData.experience[i].position,
                    "periodFrom": pF,
                    "periodTo": pT,
                    "achievements": this.resData.experience[i].achievements,
                    "skillsUsed": skills,
                    "currentJob": this.resData.experience[i].currentJob
                  });
                }
                // console.log(data);
                // for(var i=0;i<data.professionalSkill.length;i++) {
                //   if(data.professionalSkill[i].type=='operatingSystems') {
                //     this.Onumbers.push( { "val" : data.professionalSkill[i].percent, "name": data.professionalSkill[i].name });
                //   }
                //   else if(data.professionalSkill[i].type=='programmingLanguages') {
                //     this.Pnumbers.push( { "val" : data.professionalSkill[i].percent, "name": data.professionalSkill[i].name });
                //   }
                //   else if(data.professionalSkill[i].type=='frameworks') {
                //     this.Fnumbers.push( { "val" : data.professionalSkill[i].percent, "name": data.professionalSkill[i].name });
                //   }
                //   else if(data.professionalSkill[i].type=='ide') {
                //     this.Inumbers.push( { "val" : data.professionalSkill[i].percent, "name": data.professionalSkill[i].name });
                //   }
                //   else if(data.professionalSkill[i].type=='buildManagement') {
                //     this.Vnumbers.push( { "val" : data.professionalSkill[i].percent, "name": data.professionalSkill[i].name });
                //   }
                //   else if(data.professionalSkill[i].type=='testingFrameworks') {
                //     this.Tnumbers.push( { "val" : data.professionalSkill[i].percent, "name": data.professionalSkill[i].name });
                //   }
                //   else if(data.professionalSkill[i].type=='databases') {
                //     this.Dnumbers.push( { "val" : data.professionalSkill[i].percent, "name": data.professionalSkill[i].name });
                //   }
                // }
              }
          );
  }

  getVals(id, dt) {
    dt.professionalSkill.sort((a, b) => {
      if (a.type.toLowerCase() < b.type.toLowerCase()) return -1;
      else if (a.type.toLowerCase() > b.type.toLowerCase()) return 1;
      else return 0;
    });
    this.dataService.getsResSubTypeCat(id)
        .subscribe(
              data => {
                data.sort((a, b) => {
                  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                  else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                  else return 0;
                });
                for(var i=0;i<data.length;i++) {
                  this.types.push(data[i].name);
                }
                for(var i=0;i<dt.professionalSkill.length;i++) {
                  for(var j=0;j<this.types.length;j++) {
                    //console.log(dt.professionalSkill[i].type + ' : ' + this.types[j]);
                    if(dt.professionalSkill[i].type==this.types[0]) {
                      this.Onumbers.push( {"type": dt.professionalSkill[i].type, "val" : dt.professionalSkill[i].percent, "name": dt.professionalSkill[i].name });
                    }
                    else if(dt.professionalSkill[i].type==this.types[1]) {
                      this.Pnumbers.push( {"type": dt.professionalSkill[i].type, "val" : dt.professionalSkill[i].percent, "name": dt.professionalSkill[i].name });
                    }
                    else if(dt.professionalSkill[i].type==this.types[2]) {
                      this.Fnumbers.push( {"type": dt.professionalSkill[i].type, "val" : dt.professionalSkill[i].percent, "name": dt.professionalSkill[i].name });
                    }
                    else if(dt.professionalSkill[i].type==this.types[3]) {
                      this.Inumbers.push( {"type": dt.professionalSkill[i].type, "val" : dt.professionalSkill[i].percent, "name": dt.professionalSkill[i].name });
                    }
                    else if(dt.professionalSkill[i].type==this.types[4]) {
                      this.Vnumbers.push( {"type": dt.professionalSkill[i].type, "val" : dt.professionalSkill[i].percent, "name": dt.professionalSkill[i].name });
                    }
                    else if(dt.professionalSkill[i].type==this.types[5]) {
                      this.Tnumbers.push( {"type": dt.professionalSkill[i].type, "val" : dt.professionalSkill[i].percent, "name": dt.professionalSkill[i].name });
                    }
                    else if(dt.professionalSkill[i].type==this.types[6]) {
                      this.Dnumbers.push( {"type": dt.professionalSkill[i].type, "val" : dt.professionalSkill[i].percent, "name": dt.professionalSkill[i].name });
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

  saveGeneral() {
    var lang = {};
    var hob = {};
    for(var i=0;i<this.Lnumbers.length;i++) {
      var id = 'langk-' +i;
      var idV = 'langkV-' +i;
      if((<HTMLInputElement>document.getElementById(id)).value != '') {
        var val = (<HTMLInputElement>document.getElementById(id)).value;
        lang[val] = (<HTMLInputElement>document.getElementById(idV)).value;
      }
    }
    for(var i=0;i<this.Hnumbers.length;i++) {
      var id = 'hob-' +i;
      var idV = 'hobV-' +i;
      if((<HTMLInputElement>document.getElementById(id)).value != '') {
        var val = (<HTMLInputElement>document.getElementById(id)).value;
        hob[val] = (<HTMLInputElement>document.getElementById(idV)).value;
      }
    }
    var k = {
        "name": this.name.nativeElement.value,
        "dob": this.dob.nativeElement.value,
        "nationality": this.nation.nativeElement.value,
        "yearsOfExperience": this.exp.nativeElement.value,
        "designation": this.desig.nativeElement.value,
        "company": this.company.nativeElement.value,
        "languageKnown": lang,
        "resumeSubCategory": {
             "id": parseInt(this.parentlinkOne2.nativeElement.value)!=999?parseInt(this.parentlinkOne2.nativeElement.value):parseInt(this.subcat.nativeElement.value),
        },
        "hobbies": hob
    }
    this.dataService.editResume(k, this.myId.nativeElement.value)
        .subscribe(
              data => {
                alert('General Information edited');
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
              // console.log(data);
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

  onSubmit(e) {

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

  saveData() {
    var k = [];
    var i = 0;
    for(i=0;i<this.Edunumbers.length;i++) {
      var id = 'ecolName' +i;
      var id2 = 'edeg' +i;
      var id3 = 'edegl' +i;
      var id4 = 'eweb' +i;
      var id5 = 'each' +i;
      var id6 = 'esub' +i;
      var id7 = 'eptFrom' +i;
      var id8 = 'eptTo' +i;
      var id9 = 'eloc' +i;
      k.push({
        "collegeName": (<HTMLInputElement>document.getElementById(id)).value,
        "collegeWebsite": (<HTMLInputElement>document.getElementById(id4)).value,
        "periodFrom": (<HTMLInputElement>document.getElementById(id7)).value,
        "periodTo": (<HTMLInputElement>document.getElementById(id8)).value,
        "details": (<HTMLInputElement>document.getElementById(id5)).value,
        "degree": (<HTMLInputElement>document.getElementById(id2)).value,
        "degreeLevel": (<HTMLInputElement>document.getElementById(id3)).value,
        "subject": (<HTMLInputElement>document.getElementById(id6)).value,
        "location": (<HTMLInputElement>document.getElementById(id9)).value,
      });
    }
    if(this.eduOrg.nativeElement.value) {
    k.push({
          "collegeName": this.eduOrg.nativeElement.value,
          "location": this.eduLoc.nativeElement.value,
          "collegeWebsite": this.eduWeb.nativeElement.value,
          "periodFrom": this.eduFrom.nativeElement.value,
          "periodTo": this.eduTo.nativeElement.value,
          "details": this.eduAch.nativeElement.value,
          "degree": this.eduDeg.nativeElement.value,
          "degreeLevel": this.eduDegl.nativeElement.value,
          "subject": this.eduSub.nativeElement.value
        });
    }
      this.dataService.getResume()
        .subscribe(
              data => {
                this.resData = data;
                var id = this.resData.resume.id;
                this.dataService.addEducation(k, id)
                .subscribe(
                      data => {
                        alert('Education details added');
                        this.Onumbers = [];
                        this.Pnumbers = [];
                        this.Fnumbers = [];
                        this.Inumbers = [];
                        this.Dnumbers = [];
                        this.Vnumbers = [];
                        this.Tnumbers = [];
                        this.Lnumbers = [];
                        this.Hnumbers = [];
                        this.Edunumbers = [];
                        this.Expnumbers = [];
                        this.getDet();
                      }
                  );
              }
          );
  }

  saveDataExp() {
    var k = [];
    var i = 0;
    for(i=0;i<this.Expnumbers.length;i++) {
      var id = 'expcolName' +i;
      var id2 = 'expskill' +i;
      var id3 = 'expdesig' +i;
      var id4 = 'expweb' +i;
      var id5 = 'expach' +i;
      var id7 = 'exptFrom' +i;
      var id8 = 'exptTo' +i;
      var id9 = 'expcurr' +i;
      var str = (<HTMLInputElement>document.getElementById(id2)).value;
      var myarray = str.split(',');
      var l = -1;
      for(var r=0;r<myarray.length;r++) {
        if(myarray[r]!='') {
          l++;
          myarray[l] = myarray[r];
        }
      }
      k.push({
        "companyName": (<HTMLInputElement>document.getElementById(id)).value,
        "companyWebsite": (<HTMLInputElement>document.getElementById(id4)).value,
        "position": (<HTMLInputElement>document.getElementById(id3)).value,
        "periodFrom": (<HTMLInputElement>document.getElementById(id7)).value,
        "periodTo": (<HTMLInputElement>document.getElementById(id8)).value,
        "achievements": (<HTMLInputElement>document.getElementById(id5)).value,
        "skillsUsed": myarray,
        "currentJob": (<HTMLInputElement>document.getElementById(id9)).value
      });
    }
    if(this.expOrg.nativeElement.value) {
      var str2 = this.expSub.nativeElement.value;
      var myarray2 = str2.split(',');
      var l = -1;
      for(var r=0;r<myarray2.length;r++) {
        if(myarray2[r]!='') {
          l++;
          myarray2[l] = myarray2[r];
        }
      }
      k.push({
            "companyName": this.expOrg.nativeElement.value,
            "collegeWebsite": this.expWeb.nativeElement.value,
            "position": this.expPos.nativeElement.value,
            "periodFrom": this.expFrom.nativeElement.value,
            "periodTo": this.expTo.nativeElement.value,
            "achievements": this.expAch.nativeElement.value,
            "skillsUsed": myarray2,
            "currentJob": this.expJob.nativeElement.value
          });
    }
      this.dataService.getResume()
        .subscribe(
              data => {
                this.resData = data;
                var id = this.resData.resume.id;
                this.dataService.addExperience(k, id)
                .subscribe(
                      data => {
                        alert('Experience details added');
                        this.Onumbers = [];
                        this.Pnumbers = [];
                        this.Fnumbers = [];
                        this.Inumbers = [];
                        this.Dnumbers = [];
                        this.Vnumbers = [];
                        this.Tnumbers = [];
                        this.Lnumbers = [];
                        this.Hnumbers = [];
                        this.Edunumbers = [];
                        this.Expnumbers = [];
                        this.getDet();
                      }
                  );
              }
          );
  }

  blockRem(val, event) {
      let index = this.Edunumbers.indexOf(val);
      this.Edunumbers.splice(index, 1);
      this.saveData();
  }

  blockRemExp(val, event) {
      let index = this.Expnumbers.indexOf(val);
      this.Expnumbers.splice(index, 1);
      this.saveDataExp();
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
    this.dataService.getResume()
        .subscribe(
              data => {
                this.resData = data;
                var sid = this.resData.resume.id;
                this.dataService.resSkillAdd(k, sid)
			      .subscribe(
			            data => {
			            	alert('Skills edited');
			            }
			            );
            }
            );
    this.router.navigate(['resume']);
  }

  cancelSkill() {
    this.router.navigate(['resume']);
  }

  createEdit() {
  	this.pgraph.nativeElement.style.display = 'none';
  	this.egraph.nativeElement.style.display = 'block';
  	this.sv.nativeElement.style.display = 'flex';
  }
  saveVal() {
  	this.pgraph.nativeElement.style.display = 'block';
  	this.egraph.nativeElement.style.display = 'none';
  	this.sv.nativeElement.style.display = 'none';
  }
  save() {
    this.mpagedemo.nativeElement.style.display = 'block';
    this.mybn.nativeElement.style.display = 'none';
  }

}
