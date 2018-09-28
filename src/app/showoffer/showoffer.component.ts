import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-showoffer',
  templateUrl: './showoffer.component.html',
  styleUrls: ['./showoffer.component.css']
})
export class ShowofferComponent implements AfterViewInit {

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
  sub: any;
  id: any;
  myInfos: any;
  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
      this.chart();
    }

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute, private elementRef: ElementRef) { 
  	this.value = 1;
  	this.scroll = true;
  	this.numbers = Array(3).fill(4);
  }

  ngAfterViewInit() {
  	this.sub = this.activeRoute.params.subscribe(params => {
       this.id = +params['id'];
       this.dataService.offerSpecific(this.id)
      .subscribe(
            data => {
			    this.datac1 = []; this.labelc1 = [];
			    this.datac2 = []; this.labelc2 = [];
			    this.datac3 = []; this.labelc3 = [];
			    this.datac4 = []; this.labelc4 = [];
			    this.datac5 = []; this.labelc5 = [];
			    this.datac6 = []; this.labelc6 = [];
			    this.datac7 = []; this.labelc7 = [];
          		this.myInfos = data;
          		console.log(data);
          		this.subcat.nativeElement.value = data.offer.subCategory.id;
                this.getVals(this.subcat.nativeElement.value, data);
          		for(var i=0;i<data.skills.length;i++) {
          			if(data.skills[i].type=='operatingSystems') {
          				this.datac1.push(data.skills[i].percent);
          				this.labelc1.push(data.skills[i].name);
          			}
          			else if(data.skills[i].type=='programmingLanguages') {
          				this.datac2.push(data.skills[i].percent);
          				this.labelc2.push(data.skills[i].name);
          			}
          			else if(data.skills[i].type=='frameworks') {
          				this.datac3.push(data.skills[i].percent);
          				this.labelc3.push(data.skills[i].name);
          			}
          			else if(data.skills[i].type=='ide') {
          				this.datac4.push(data.skills[i].percent);
          				this.labelc4.push(data.skills[i].name);
          			}
          			else if(data.skills[i].type=='buildManagement') {
          				this.datac5.push(data.skills[i].percent);
          				this.labelc5.push(data.skills[i].name);
          			}
          			else if(data.skills[i].type=='testingFrameworks') {
          				this.datac6.push(data.skills[i].percent);
          				this.labelc6.push(data.skills[i].name);
          			}
          			else if(data.skills[i].type=='databases') {
          				this.datac7.push(data.skills[i].percent);
          				this.labelc7.push(data.skills[i].name);
          			}
          		}
          		// this.chartit1(this.datac1, this.labelc1);
          		// this.chartit2(this.datac2, this.labelc2);
          		// this.chartit3(this.datac3, this.labelc3);
          		// this.chartit4(this.datac4, this.labelc4);
          		// this.chartit5(this.datac5, this.labelc5);
          		// this.chartit6(this.datac6, this.labelc6);
          		// this.chartit7(this.datac7, this.labelc7);
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
