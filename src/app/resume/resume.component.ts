import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
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

  constructor(private elementRef: ElementRef) { 
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
