import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements AfterViewInit {
  
  value: number;
  numbers: Array<number>;
  myChart:any;
  number: any;
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
  myEdus: any;
  myExps: any;
  Edunumbers = [];
  Expnumbers = [];
  cats = [];
  subcats = [];
  subtypes = [];
  datac1 = []; labelc1 = [];
  datac2 = []; labelc2 = [];
  datac3 = []; labelc3 = [];
  datac4 = []; labelc4 = [];
  datac5 = []; labelc5 = [];
  datac6 = []; labelc6 = [];
  datac7 = []; labelc7 = [];
  eduYear = [];
  expYear = [];
  types = [];
  @ViewChild('parentlinkOne') parentlinkOne;
  @ViewChild('parentlinkOne2') parentlinkOne2;
  skills= [];
  skillTypes = [];
  selThrees = [];
  selFours = [];
  scroll: boolean;
  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
      this.chart();
    }

  constructor(private dragulaService: DragulaService, private router:Router, private dataService:DataService, private el: ElementRef) { 
  	this.value = 1;
  	this.numbers = Array(3).fill(4);
    this.scroll = true;
    this.dataService.getResume()
      .subscribe(
            data => {
              if(data.resume==null) {
                this.router.navigate(['createresume']);
              }
              else {
                
              }
            }
        );
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
  }

  getDet() {
    this.dataService.getResume()
        .subscribe(
              data => {
                this.resData = data;
                this.rname.nativeElement.innerText = this.resData.resume.name;
                this.rdob.nativeElement.innerText = this.resData.resume.dob;
                this.rnation.nativeElement.innerText = this.resData.resume.nationality;
                this.rexp.nativeElement.innerText = this.resData.resume.yearsOfExperience;
                this.rdesig.nativeElement.innerText = this.resData.resume.designation;
                this.rcompany.nativeElement.innerText = this.resData.resume.company;
                this.parentlinkOne.nativeElement.value = this.resData.resume.resumeSubCategory.category.id;
                this.subcat.nativeElement.value = this.resData.resume.resumeSubCategory.id;
                this.getVals(this.subcat.nativeElement.value, data);
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
                  pF = new Date(pF).toDateString();
                  var pT = this.resData.education[i].periodFrom;
                  pT = new Date(pT).toDateString();
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
                  pF = new Date(pF).toDateString();
                  var pT = this.resData.experience[i].periodTo;
                  pT = new Date(pT).toDateString();
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
              //   for(var i=0;i<data.professionalSkill.length;i++) {
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
              // this.chartit1(this.Onumbers);
              // this.chartit2(this.Pnumbers);
              // this.chartit3(this.Fnumbers);
              // this.chartit4(this.Inumbers);
              // this.chartit5(this.Vnumbers);
              // this.chartit6(this.Tnumbers);
              // this.chartit7(this.Dnumbers);
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

  chart() {
    if(this.scroll) {
      if(document.getElementById("myCanvas1")) {
        this.Onumbers.length?this.chartit1(this.Onumbers):'';
        this.Pnumbers.length?this.chartit2(this.Pnumbers):'';
        this.Fnumbers.length?this.chartit3(this.Fnumbers):'';
        this.Inumbers.length?this.chartit4(this.Inumbers):'';
        this.Vnumbers.length?this.chartit5(this.Vnumbers):'';
        this.Tnumbers.length?this.chartit6(this.Tnumbers):'';
        this.Dnumbers.length?this.chartit7(this.Dnumbers):'';
        this.scroll = false;
      }
    }
  }

  ngAfterViewInit() {
  	this.getDet();
  }

  makeEdit() {
    this.router.navigate(['editresume']);
  }
  saveEdit() {
  	var i;
  	this.svBtn.nativeElement.style.display = 'none';
  	var x = document.getElementsByClassName('chld');
  	for(i=0;i<x.length-1;i++) {
  		x[i].setAttribute("contentEditable", "false");
  		x[i].classList.remove("myStyle");
  	}
  }

  changeEdit() {
    this.router.navigate(['createresume']);
  }

  makeResEdit() {
    this.router.navigate(['editresume']);
  }

  setVal(event) {
    event.target.nextElementSibling.innerHTML = event.target.value;
  }

  addDiv() {

  }
  saveData() {
  	
  }
  saveResEdit() {
  	var i;
  	this.svresBtn.nativeElement.style.display = 'none';
  	var x = document.getElementsByClassName('reschld');
  	for(i=0;i<x.length;i++) {
  		x[i].setAttribute("contentEditable", "false");
  		x[i].classList.remove("myResStyle");
  	}
  }
  append(val, event) {
    if(event.target.id=='os') {
      this.Onumbers.push(val);
    }
    else if(event.target.id=='pl') {
      this.Pnumbers.push(val);
    }
    else if(event.target.id=='lk') {
      this.Lnumbers.push(val);
    }
    else if(event.target.id=='ide') {
      this.Inumbers.push(val);
    }
    else if(event.target.id=='hobb') {
      this.Hnumbers.push(val);
    }
    else if(event.target.id=='vc') {
      this.Vnumbers.push(val);
    }
    else {}
  }

  onSubmit(f) {
    
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
    else if(event.target.id=='lk') {
      let index = this.Lnumbers.indexOf(val);
      this.Lnumbers.splice(index, 1);
    }
    else if(event.target.id=='ide') {
      let index = this.Inumbers.indexOf(val);
      this.Inumbers.splice(index, 1);
    }
    else if(event.target.id=='hobb') {
      let index = this.Hnumbers.indexOf(val);
      this.Hnumbers.splice(index, 1);
    }
    else if(event.target.id=='vc') {
      let index = this.Vnumbers.indexOf(val);
      this.Vnumbers.splice(index, 1);
    }
    else {}
  }
  createEdit() {
    this.router.navigate(['editresume']);
  }
  saveVal() {
  	this.pgraph.nativeElement.style.display = 'block';
  	this.egraph.nativeElement.style.display = 'none';
  	this.sv.nativeElement.style.display = 'none';
  }
  save() {
    this.mpagedemo.nativeElement.style.display = 'block';
    this.mybn.nativeElement.style.display = 'block';
  }
  chartit1(Onumbers){
    var data1 = [];
    var label1 = [];
    for(var i=0;i<Onumbers.length;i++) {
      data1.push(Onumbers[i].val);
      label1.push(Onumbers[i].name);
    }
  	var data = {
	    datasets: [{
	        data: data1,
	        backgroundColor: [
              "#6CC43C",
              "#FF5376",
              "#FCD04B",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB"
          ],
          borderColor: [
            "#6CC43C",
              "#FF5376",
              "#FCD04B",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB"
          ]
	    }],

	    labels: label1
	};
    var ctx = document.getElementById("myCanvas1");
	var myPieChart = new Chart(ctx,{
	    type: 'doughnut',
    	data: data
	});
  }

  chartit2(Pnumbers){
    var data1 = [];
    var label1 = [];
    for(var i=0;i<Pnumbers.length;i++) {
      data1.push(Pnumbers[i].val);
      label1.push(Pnumbers[i].name);
    }
  	var data = {
	    datasets: [{
	        data: data1,
	        backgroundColor: [
            "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
          ],
          borderColor: [
            "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C"
          ]
	    }],

	    labels: label1
	};
    var ctx = document.getElementById("myCanvas2");
	var myPieChart = new Chart(ctx,{
	    type: 'doughnut',
    	data: data
	});
  }

  chartit3(Fnumbers){
    var data1 = [];
    var label1 = [];
    for(var i=0;i<Fnumbers.length;i++) {
      data1.push(Fnumbers[i].val);
      label1.push(Fnumbers[i].name);
    }
  	var data = {
	    datasets: [{
	        data: data1,
	        backgroundColor: [
            "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C"
          ],
          borderColor: [
            "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C"
          ]
	    }],

	    labels: label1
	};
    var ctx = document.getElementById("myCanvas3");
	var myPieChart = new Chart(ctx,{
	    type: 'doughnut',
    	data: data
	});
  }

  chartit4(Inumbers){
    var data1 = [];
    var label1 = [];
    for(var i=0;i<Inumbers.length;i++) {
      data1.push(Inumbers[i].val);
      label1.push(Inumbers[i].name);
    }
  	var data = {
	    datasets: [{
	        data: data1,
	        backgroundColor: [
              "#FCD04B",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB"
          ],
          borderColor: [
              "#FCD04B",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB"
          ]
	    }],

	    labels: label1
	};
    var ctx = document.getElementById("myCanvas4");
	var myPieChart = new Chart(ctx,{
	    type: 'doughnut',
    	data: data
	});
  }
  chartit5(Vnumbers){
    var data1 = [];
    var label1 = [];
    for(var i=0;i<Vnumbers.length;i++) {
      data1.push(Vnumbers[i].val);
      label1.push(Vnumbers[i].name);
    }
  	var data = {
	    datasets: [{
	        data: data1,
	        backgroundColor: [
            "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
          ],
          borderColor: [
            "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C"
          ]
	    }],

	    labels: label1
	};
    var ctx = document.getElementById("myCanvas5");
	var myPieChart = new Chart(ctx,{
	    type: 'doughnut',
    	data: data
	});
  }
  chartit6(Tnumbers){
    var data1 = [];
    var label1 = [];
    for(var i=0;i<Tnumbers.length;i++) {
      data1.push(Tnumbers[i].val);
      label1.push(Tnumbers[i].name);
    }
  	var data = {
	    datasets: [{
	        data: data1,
	        backgroundColor: [
            "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C"
          ],
          borderColor: [
            "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C"
          ]
	    }],

	    labels: label1
	};
    var ctx = document.getElementById("myCanvas6");
	var myPieChart = new Chart(ctx,{
	    type: 'doughnut',
    	data: data
	});
  }

  chartit7(Dnumbers){
    var data1 = [];
    var label1 = [];
    for(var i=0;i<Dnumbers.length;i++) {
      data1.push(Dnumbers[i].val);
      label1.push(Dnumbers[i].name);
    }
    var data = {
      datasets: [{
          data: data1,
          backgroundColor: [
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB"
          ],
          borderColor: [
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB",
              "#FF5376",
              "#FCD04B",
              "#6CC43C",
              "#27AEDB"
          ]
      }],

      labels: label1
  };
    var ctx = document.getElementById("myCanvas7");
  var myPieChart = new Chart(ctx,{
      type: 'doughnut',
      data: data
  });
  }

}
