import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  userImg: string;
  @ViewChild('recd') recd;
  @ViewChild('recId') recId;
  @ViewChild('frdId') frdId;
  @ViewChild('frid') frid;

  constructor() {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  }

  dispRec() {
    this.recd.nativeElement.style.display = 'block';
    this.recId.nativeElement.style.fontWeight = '600';
    this.recId.nativeElement.style.fontSize = '15px';
    this.frdId.nativeElement.style.fontWeight = '200';
    this.frdId.nativeElement.style.fontSize = '14px';
    this.frid.nativeElement.style.display = 'none';
  }

  dispFrd() {
    this.frid.nativeElement.style.display = 'flex';
    this.recId.nativeElement.style.fontWeight = '200';
    this.recId.nativeElement.style.fontSize = '14px';
    this.frdId.nativeElement.style.fontWeight = '600';
    this.frdId.nativeElement.style.fontSize = '15px';
    this.recd.nativeElement.style.display = 'none';
  }

}
