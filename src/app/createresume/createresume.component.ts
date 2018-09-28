import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-createresume',
  templateUrl: './createresume.component.html',
  styleUrls: ['./createresume.component.css']
})
export class CreateresumeComponent implements AfterViewInit {
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
  @ViewChild('parentlinkOne') parentlinkOne;
  @ViewChild('parentlinkOne2') parentlinkOne2;
  cats = [];
  skills= [];
  subcats = [];
  selThrees = [];
  selFours = [];

  constructor(private dragulaService: DragulaService, private router:Router, private dataService:DataService, private el: ElementRef) { 
    this.value = 1;
    this.numbers = Array(3).fill(4);
  }

  ngAfterViewInit() {
  	this.mybn.nativeElement.click();
    // this.save();
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

  makeEdit() {
  	var i;
  	this.svBtn.nativeElement.style.display = 'flex';
  	var x = document.getElementsByClassName('chld');
  	for(i=0;i<x.length-1;i++) {
  		x[i].setAttribute("contentEditable", "true");
  		x[i].classList.add("myStyle");
  	}
  }
  saveEdit() {
  	
  }
  makeResEdit() {
  	var i;
  	this.svresBtn.nativeElement.style.display = 'flex';
  	var x = document.getElementsByClassName('reschld');
  	for(i=0;i<x.length;i++) {
  		x[i].setAttribute("contentEditable", "true");
  		x[i].classList.add("myResStyle");
  	}
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
    var myName = 'cat-' + this.parentlinkOne.nativeElement.value;
    var cat1 = document.getElementById(myName).innerHTML.trim();
    var myName = 'subcat-' + this.parentlinkOne2.nativeElement.value;
    var subcat1 = document.getElementById(myName).innerHTML.trim();
    var k = {
        "name": this.name.nativeElement.value,
        "dob": this.dob.nativeElement.value,
        "nationality": this.nation.nativeElement.value,
        "yearsOfExperience": this.exp.nativeElement.value,
        "designation": this.desig.nativeElement.value,
        "company": this.company.nativeElement.value,
        "resumeSubCategory": {
            "category": {
              "id": parseInt(this.parentlinkOne.nativeElement.value)
            },
             "id": parseInt(this.parentlinkOne2.nativeElement.value)
        },
        "languageKnown": lang,
        "hobbies": hob
    }
    this.dataService.addResume(k)
        .subscribe(
              data => {
                alert('Resume added successfully');
                this.router.navigate(['editresume']);
              }
          );
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
    else if(event.target.id=='langk') {
      this.Lnumbers.push(val);
    }
    else if(event.target.id=='hob') {
      this.Hnumbers.push(val);
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
