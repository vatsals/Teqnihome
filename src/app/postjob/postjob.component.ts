import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {
  userImg: string;
  myHtml: string;
  appendHtml: string;
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
  @ViewChild('myF') mF;
  @ViewChild('backBtn') backBtn;
  @ViewChild('saveBtn') saveBtn;
  @ViewChild('pF') pF;
  @ViewChild('defBtn') defBtn;
  @ViewChild('myBn') myBn;
  @ViewChild('myCard') md;
  @ViewChild('recd') recd;
  @ViewChild('recId') recId;
  @ViewChild('frdId') frdId;
  @ViewChild('frid') frid;
  @ViewChild('recd2') recd2;
  @ViewChild('recId2') recId2;
  @ViewChild('frdId2') frdId2;
  @ViewChild('frid2') frid2;
  @ViewChild('sld') slide;
  @ViewChild('demo') demo;
  @ViewChild('sldVal') slideVal;

  constructor(private router:Router) {
    this.myHtml = '';
    this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
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

  setVal(event) {
    event.target.nextElementSibling.innerHTML = event.target.value;
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

  dispRec2() {
    this.recd2.nativeElement.style.display = 'block';
    this.recId2.nativeElement.style.fontWeight = '600';
    this.recId2.nativeElement.style.fontSize = '15px';
    this.frdId2.nativeElement.style.fontWeight = '200';
    this.frdId2.nativeElement.style.fontSize = '14px';
    this.frid2.nativeElement.style.display = 'none';
  }

  dispFrd2() {
    this.frid2.nativeElement.style.display = 'flex';
    this.recId2.nativeElement.style.fontWeight = '200';
    this.recId2.nativeElement.style.fontSize = '14px';
    this.frdId2.nativeElement.style.fontWeight = '600';
    this.frdId2.nativeElement.style.fontSize = '15px';
    this.recd2.nativeElement.style.display = 'none';
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
  save() {
    document.getElementById('demo').style.display = 'none';
    document.getElementById('myCd').style.display = 'block';
    this.myBn.nativeElement.style.display = 'none';
  }

}
