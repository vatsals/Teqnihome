import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appliedjobs',
  templateUrl: './appliedjobs.component.html',
  styleUrls: ['./appliedjobs.component.css']
})
export class AppliedjobsComponent implements OnInit {
  userImg: string;
  
  constructor(private router:Router) {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  }

  navigate(event) {
  	var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
  	// console.log(value);
  	this.router.navigate([value]);
  }

  myForm() {
    document.getElementById('myF').style.display = 'flex';
    document.getElementById('backBtn').style.display = 'inline-block';
    document.getElementById('parentF').style.display = 'none';
  }
  goBack() {
    document.getElementById('myF').style.display = 'none';
    document.getElementById('backBtn').style.display = 'none';
    document.getElementById('parentF').style.display = 'table';
  }
}
