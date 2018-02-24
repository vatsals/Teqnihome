import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  userImg: string;
  fbIcon: string;
  fbIcon2: string;
  flip: boolean;
  mainTab: string;

  constructor() {
    this.flip = true;
    this.mainTab = "main-tab";
  	this.userImg = '/assets/images/user.png';
  	this.fbIcon = '/assets/images/fbIcon.png';
    this.fbIcon2 = '/assets/images/fbIcon2.png';
  }

  ngOnInit() {
  }

  flipEvent(fp) {
    if(fp) {
      document.getElementById("front").style.transform = 'rotateY(180deg)';
      document.getElementById("front").style.transitionDuration = '0.7s';
      setTimeout(function() { 
        document.getElementById("front").style.opacity = '0';
        document.getElementById("fliped").style.opacity = '1';
      }, 50);
      setTimeout(function() { 
        document.getElementById("front").style.display = 'none';
        document.getElementById("fliped").style.display = 'block';
        document.getElementById("fliped").style.transform = 'rotateY(0deg)';
      }, 700);
    }
    else {
      document.getElementById("fliped").style.transform = 'rotateY(180deg)';
      document.getElementById("fliped").style.transitionDuration = '0.7s';
      setTimeout(function() { 
        document.getElementById("fliped").style.opacity = '0';
        document.getElementById("front").style.opacity = '1';
      }, 50);
      setTimeout(function() { 
        document.getElementById("fliped").style.display = 'none';
        document.getElementById("front").style.display = 'block';
        document.getElementById("front").style.transform = 'rotateY(0deg)';
      }, 700);
    }
    this.flip = !fp;
  }

}
