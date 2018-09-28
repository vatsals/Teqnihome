import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.css']
})
export class BurndownComponent implements OnInit {
  userImg: string;
  
  constructor(private router:Router, private dataService:DataService) {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  	var datac1 = {};
  	var labelc1 = {};
  	this.chartit1(datac1, labelc1);
  }

  chartit1(datac1, labelc1){
  	var Sdata1 = [25, 44, 30, 81, 56, 55, 40, 30, 81, 56];
  	var Sdata2 = [14, 18, 24];
  	var Sdata3 = [61, 63, 34, 21];
  	var data = {
    labels: ["April 1, 2018", "April 2, 2018", "April 3, 2018", "April 4, 2018", "April 5, 2018", "April 6, 2018", "April 7, 2018", "April 8, 2018", "April 9, 2018", "April 10, 2018"],
		    datasets: [{
		      label: 'Sprint 1',
		      fill: false,
		      lineTension: 0.14,
		      data: Sdata1,
		      backgroundColor: [
		        "#27AEDB",
		      ],
		      borderColor: [
		        "#27AEDB",
		      ],
		      borderWidth: 1
		    }, {
		      label: 'Sprint 2',
		      fill: false,
		      lineTension: 0.14,
		      data: Sdata2,
		      backgroundColor: [
		        "#FF5376",
		      ],
		      borderColor: [
		        "#FF5376",
		      ],
		      borderWidth: 1
		    }, {
		      label: 'Sprint 3',
		      fill: false,
		      lineTension: 0.14,
		      data: Sdata3,
		      backgroundColor: [
		        "#FCD04B",
		      ],
		      borderColor: [
		        "#FCD04B",
		      ],
		      borderWidth: 1
		    }
		    ]
	};
	var options: {
		    scales: {
		      xAxes: [{
			        ticks: {
			            stepSize: 1,
			            min: 10,
			            autoSkip: false
			        }
			    }],
		      yAxes: [{
		        ticks: {
		          beginAtZero: true
		        }
		      }]
		    }
		  };
    var ctx = document.getElementById("myCanvas1");
	var myPieChart = new Chart(ctx,{
	    type: 'line',
    	data: data,
    	options: options
	});
  }

}
