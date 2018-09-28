import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';

@Component({
  selector: 'app-matchedjobs',
  templateUrl: './matchedjobs.component.html',
  styleUrls: ['./matchedjobs.component.css']
})
export class MatchedjobsComponent implements OnInit {
  userImg: string;
  p: number;
  matchedJobs = [];
  time = [];
  
  constructor(private dragulaService: DragulaService, private router:Router, private dataService:DataService) {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
   this.offer();
  }

  offer() {
     this.dataService.matchedJobs()
      .subscribe(
            data => {
                this.matchedJobs = data.content;
                for(var i=0;i<this.matchedJobs.length;i++) {
                  var tm = this.matchedJobs[i].created;
                  this.time[i] = new Date(tm).toDateString();
                }
              }
        );
  }

  seeOffer(link) {
    this.router.navigate(['/showoffer', link]);
  }

  acceptOffer(id) {
    this.dataService.jobAccept(id)
      .subscribe(
        data => {
          alert('Offer Accepted');
          this.offer();
        });
  }

}
