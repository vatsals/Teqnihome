import { Component, OnInit, ElementRef } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-editcard',
  templateUrl: './editcard.component.html',
  styleUrls: ['./editcard.component.css']
})
export class EditcardComponent implements OnInit {

  userImg: string;
  fbIcon: string;
  fbIcon2: string;
  flip: boolean;
  mainTab: string;
  myHtml: string;
  myHtml2: string;
  myHtml3: string;
  myHtml4: string;
  myHtml5: string;
  myHtml6: string;
  myHtml7: string;
  appendHtml: string;
  numbers = [];
  many = ['1', '2', '3', '4', '5', '6'];
  many2 = ['Is', 'it', 'me'];
  many3 = ['Yes', 'its', 'me', 'This', 'is', 'me'];

  constructor(private dragulaService: DragulaService) {
    this.flip = true;
    this.myHtml = ''; this.myHtml2 = ''; this.myHtml3 = ''; 
    this.myHtml4 = ''; this.myHtml5 = ''; this.myHtml6 = '';
    this.myHtml7 = '';
    this.mainTab = "main-tab";
  	this.userImg = '/assets/images/user.png';
  	this.fbIcon = '/assets/images/fbIcon.png';
    this.fbIcon2 = '/assets/images/fbIcon2.png';
    this.numbers = Array(6).fill(4);
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
  }

  private onRemoveModel(args) {
    let [el, source] = args;
    // do something else
  }

  ngOnInit() {
    document.getElementById('cEdit').focus();
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
  onChange(val, doc) {
    if(val=='Individual User') {
      document.getElementById(doc).style.display = 'flex';
    }
    else {
      document.getElementById(doc).style.display = 'none'; 
    }
  }

  onSubmit(e) {
    console.log('bat');
    return false;
  }

  append(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml = this.myHtml + this.appendHtml;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }
  append2(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml2 = this.myHtml2 + this.appendHtml;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }
  append3(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml3 = this.myHtml3 + this.appendHtml;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }
  append4(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml4 = this.myHtml4 + this.appendHtml;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }
  append5(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml5 = this.myHtml5 + this.appendHtml;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }
  append6(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml6 = this.myHtml6 + this.appendHtml;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }
  append7(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml7 = this.myHtml7 + this.appendHtml;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }

}
