import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
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
  Onumbers = [
            {val: '10', id: '1'},
            {val: '20', id: '2'},
            {val: '40', id: '3'}
        ];
  Pnumbers = [
            {val: '10', id: '1'},
            {val: '20', id: '2'},
            {val: '40', id: '3'}
        ];
  Lnumbers = [
            {val: '10', id: '1'},
            {val: '20', id: '2'},
            {val: '40', id: '3'}
        ];
  Inumbers = [
            {val: '10', id: '1'},
            {val: '20', id: '2'},
            {val: '40', id: '3'}
        ];
  Hnumbers = [
            {val: '10', id: '1'},
            {val: '20', id: '2'},
            {val: '40', id: '3'}
        ];
  Vnumbers = [
            {val: '10', id: '1'},
            {val: '20', id: '2'},
            {val: '40', id: '3'}
        ];
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
  @ViewChild('mybn') mybn;
  @ViewChild('mpage') mpage;
  @ViewChild('mpagedemo') mpagedemo;

  constructor(private el: ElementRef) { 
  	this.value = 1;
  	this.numbers = Array(3).fill(4);
  }

  ngAfterViewInit() {
  	this.chartit1();
  	this.chartit2();
  	this.chartit3();
  	this.chartit4();
  	this.chartit5();
  	this.chartit6();
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
  	var i;
  	this.svBtn.nativeElement.style.display = 'none';
  	var x = document.getElementsByClassName('chld');
  	for(i=0;i<x.length-1;i++) {
  		x[i].setAttribute("contentEditable", "false");
  		x[i].classList.remove("myStyle");
  	}
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
    this.mpage.nativeElement.style.display = 'block';
    this.mpagedemo.nativeElement.style.display = 'none';
    this.mybn.nativeElement.style.display = 'none';
  }
  chartit1(){
  	var data = {
	    datasets: [{
	        data: [20, 30, 40],
	        backgroundColor: [
	            "#FF5376",
	            "#FCD04B",
	            "#27AEDB"
	        ],
	        borderColor: [
	            "#FF5376",
	            "#FCD04B",
	            "#27AEDB"
	        ]
	    }],

	    labels: [
	        'OS1',
	        'OS2',
	        'OS3'
	    ]
	};
    var ctx = document.getElementById("myCanvas1");
	var myPieChart = new Chart(ctx,{
	    type: 'doughnut',
    	data: data
	});
  }
  chartit2(){
  	var data = {
	    datasets: [{
	        data: [20, 30, 40],
	        backgroundColor: [
	            "#FF5376",
	            "#FCD04B",
	            "#27AEDB"
	        ],
	        borderColor: [
	            "#FF5376",
	            "#FCD04B",
	            "#27AEDB"
	        ]
	    }],

	    labels: [
	        'Java',
	        'Python',
	        'C++'
	    ]
	};
    var ctx = document.getElementById("myCanvas2");
	var myPieChart = new Chart(ctx,{
	    type: 'doughnut',
    	data: data
	});
  }
  chartit3(){
  	var data = {
	    datasets: [{
	        data: [20, 30, 40, 15],
	        backgroundColor: [
	            "#FF5376",
	            "#FCD04B",
	            "#6CC43C",
	            "#27AEDB"
	        ],
	        borderColor: [
	            "#FF5376",
	            "#FCD04B",
	            "#6CC43C",
	            "#27AEDB"
	        ]
	    }],

	    labels: [
	        'English',
	        'French',
	        'Spanish', 
	        'Portugese'
	    ]
	};
    var ctx = document.getElementById("myCanvas3");
	var myPieChart = new Chart(ctx,{
	    type: 'doughnut',
    	data: data
	});
  }


  chartit4(){
  	var data = {
	    datasets: [{
	        data: [20, 30, 40, 15],
	        backgroundColor: [
	            "#FF5376",
	            "#FCD04B",
	            "#6CC43C",
	            "#27AEDB"
	        ],
	        borderColor: [
	            "#FF5376",
	            "#FCD04B",
	            "#6CC43C",
	            "#27AEDB"
	        ]
	    }],

	    labels: [
	        'IDE1',
	        'IDE2',
	        'IDE3', 
	        'IDE4'
	    ]
	};
    var ctx = document.getElementById("myCanvas4");
	var myPieChart = new Chart(ctx,{
	    type: 'doughnut',
    	data: data
	});
  }
  chartit5(){
  	var data = {
	    datasets: [{
	        data: [20, 30, 40],
	        backgroundColor: [
	            "#FF5376",
	            "#FCD04B",
	            "#27AEDB"
	        ],
	        borderColor: [
	            "#FF5376",
	            "#FCD04B",
	            "#27AEDB"
	        ]
	    }],

	    labels: [
	        'Reading',
	        'Gym',
	        'Cycling'
	    ]
	};
    var ctx = document.getElementById("myCanvas5");
	var myPieChart = new Chart(ctx,{
	    type: 'doughnut',
    	data: data
	});
  }
  chartit6(){
  	var data = {
	    datasets: [{
	        data: [30, 40],
	        backgroundColor: [
	            "#FF5376",
	            "#27AEDB"
	        ],
	        borderColor: [
	            "#FF5376",
	            "#27AEDB"
	        ]
	    }],

	    labels: [
	        'Version Control 1',
	        'Version Control 2'
	    ]
	};
    var ctx = document.getElementById("myCanvas6");
	var myPieChart = new Chart(ctx,{
	    type: 'doughnut',
    	data: data
	});
  }

}
