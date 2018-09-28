import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';
import {CalendarprimModule} from 'primeng/calendar';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

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
  carduserId: string;
  mainTab: string;
  myHtml: string;
  userMainImg: any;
  myHtml2: string;
  myHtml3: string;
  myHtml4: string;
  myHtml5: string;
  myHtml6: string;
  myHtml7: string;
  myHtml8: string;
  appendHtml: string;
  cardId: number;
  selOnes = [];
  selTwos = [];
  selThrees = [];
  selFours = [];
  allInfos = [];
  icon = [];
  @ViewChild('idHAP') idHAP;
  @ViewChild('idHEP') idHEP;
  @ViewChild('idHPP') idHPP;
  @ViewChild('idOAP') idOAP;
  @ViewChild('idOEP') idOEP;
  @ViewChild('idOPP') idOPP;
  @ViewChild('ePriv') ePriv;
  @ViewChild('cid') cid;
  @ViewChild('linkTwo') linkTwo;
  @ViewChild('linkThree') linkThree;
  @ViewChild('linkVal') linkVal;
  @ViewChild('linkPrior') linkPrior;
  @ViewChild('editlinkOne') editlinkOne;
  @ViewChild('editlinkTwo') editlinkTwo;
  @ViewChild('editlinkThree') editlinkThree;
  @ViewChild('editlinkVal') editlinkVal;
  @ViewChild('editId') editId;
  @ViewChild('editName') editName;
  @ViewChild('editlinkPrior') editlinkPrior;
  @ViewChild('uFile') uFile;
  numbers = [];
  many = ['1', '2', '3', '4'];
  many2 = ['Is', 'it', 'me'];
  many3 = ['Yes', 'its', 'me', 'This', 'is', 'me'];
  user = {
    title: '',
    name: '',
    homeAdr: '',
    homeCall: '',
    homeMail: '',
    officeAdr: '',
    officeCall: '',
    officeMail: '',
    homeAdrPriv: '',
    degree: '',
    position: '',
    memberships: '',
    company: '',
    homeEmailPriv: '',
    homePhonePriv: '',
    website: '',
    officeAdrPriv: '',
    officeEmailPriv: '',
    officePhonePriv: '',
    uHtml: '',
    uHtml2: '',
    uHtml3: '',
    uHtml4: '',
    uHtml5: '',
    uHtml6: '',
    uHtml7: '',
  }
    date7: Date;
    dates: Date[];
    rangeDates: Date[];
    minDate: Date;
    maxDate: Date;

    es: any;
    tr: any;

    invalidDates: Array<Date>

  constructor(private dragulaService: DragulaService, private router:Router, private dataService:DataService, private sanitizer: DomSanitizer) {
    this.flip = true;
    this.myHtml = ''; this.myHtml2 = ''; this.myHtml3 = ''; 
    this.myHtml4 = ''; this.myHtml5 = ''; this.myHtml6 = '';
    this.myHtml7 = ''; this.myHtml8 = '';
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
     this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
        }

        this.tr = {
            firstDayOfWeek : 1
        }

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);

        let invalidDate = new Date();
        invalidDate.setDate(today.getDate() - 1);
        this.invalidDates = [today,invalidDate];
    document.getElementById('cEdit').focus();
    this.dataService.cardShow(this.dataService.accessToken)
      .subscribe(
            data => {
              this.cardId = data.card.id;
              if(data.card.cardImage) {
                  this.userMainImg =  'data:image/*;base64,' + data.card.cardImage;
                  this.userMainImg = this.sanitizer.bypassSecurityTrustUrl(this.userMainImg);
                }
                else {
                  this.userMainImg = '/assets/images/user.png';
                }
              this.user = {
                title: data.card.title,
                name: data.card.name,
                homeAdr: data.card.homeAddress,
                homeCall: data.card.privatePhone,
                homeMail: data.card.privateEmail,
                officeAdr: data.card.officeAddress,
                officeCall: data.card.officePhone,
                officeMail: data.card.officeEmail,
                degree: data.card.qualifications,
                position: data.card.jobTitle,
                memberships: data.card.memberships,
                company: data.card.company,
                website: data.card.website,
                homeAdrPriv: data.card.homeAddressPrivacy,
                homeEmailPriv: data.card.privateEmailPrivacy,
                homePhonePriv: data.card.privatePhonePrivacy,
                officeAdrPriv: data.card.officeAddressPrivacy,
                officeEmailPriv: data.card.officeEmailPrivacy,
                officePhonePriv: data.card.officePhonePrivacy,
                uHtml: data.card.title,
                uHtml2: data.card.title,
                uHtml3: data.card.title,
                uHtml4: data.card.title,
                uHtml5: data.card.title,
                uHtml6: data.card.title,
                uHtml7: data.card.title,
              }
              this.dataService.socialAddr(this.cardId)
              .subscribe(
                    data => {
                        this.allInfos = data;
                        this.icon = [];
                          for(var l=0;l<data.length;l++) {
                            this.icon[l] =  'data:image/*;base64,' + data[l].address_info_id.image;
                            this.icon[l] = this.sanitizer.bypassSecurityTrustUrl(this.icon[l]);
                          }
                      }
                );
              }
        );
      this.dataService.getAllAddr()
      .subscribe(
            data => {
                this.selOnes = data;
              }
        );
      var id1 = 1; var id2 = 2;
      this.dataService.getAddrInfo(id1)
      .subscribe(
            data => {
                this.selTwos = data;
              }
        );

  }

  socialGo(addr) {
    window.location.href=addr;
  }

  socialRemove(id) {
    this.dataService.removeAddr(id)
      .subscribe(
            data => {
                alert('Removed');
                 this.dataService.cardShow(this.dataService.accessToken)
                  .subscribe(
                        data => {
                          this.cardId = data.card.id;
                          if(data.card.cardImage) {
                  this.userMainImg =  'data:image/*;base64,' + data.card.cardImage;
                  this.userMainImg = this.sanitizer.bypassSecurityTrustUrl(this.userMainImg);
                }
                else {
                  this.userMainImg = '/assets/images/user.png';
                }
                          this.user = {
                            title: data.card.title,
                            name: data.card.name,
                            homeAdr: data.card.homeAddress,
                            homeCall: data.card.privatePhone,
                            homeMail: data.card.privateEmail,
                            officeAdr: data.card.officeAddress,
                            officeCall: data.card.officePhone,
                            officeMail: data.card.officeEmail,
                            degree: data.card.qualifications,
                            position: data.card.jobTitle,
                            memberships: data.card.memberships,
                            company: data.card.company,
                            website: data.card.website,
                            homeAdrPriv: data.card.homeAddressPrivacy,
                            homeEmailPriv: data.card.privateEmailPrivacy,
                            homePhonePriv: data.card.privatePhonePrivacy,
                            officeAdrPriv: data.card.officeAddressPrivacy,
                            officeEmailPriv: data.card.officeEmailPrivacy,
                            officePhonePriv: data.card.officePhonePrivacy,
                            uHtml: data.card.title,
                            uHtml2: data.card.title,
                            uHtml3: data.card.title,
                            uHtml4: data.card.title,
                            uHtml5: data.card.title,
                            uHtml6: data.card.title,
                            uHtml7: data.card.title,
                          }
                          this.dataService.socialAddr(this.cardId)
                          .subscribe(
                                data => {
                                    this.allInfos = data;
                                    this.icon = [];
                          for(var l=0;l<data.length;l++) {
                            this.icon[l] =  'data:image/*;base64,' + data[l].address_info_id.image;
                            this.icon[l] = this.sanitizer.bypassSecurityTrustUrl(this.icon[l]);
                          }
                                  }
                            );
                          }
                    );
                  this.dataService.getAllAddr()
                  .subscribe(
                        data => {
                            this.selOnes = data;
                          }
                    );
                  var id1 = 1; var id2 = 2;
                  this.dataService.getAddrInfo(id1)
                  .subscribe(
                        data => {
                            this.selTwos = data;
                          }
                    ); 
              }
        );
  }

  socialEdit(det) {
    this.dataService.AllAddrType()
    .subscribe(
          data => {
              this.selThrees = data;
            }
      );
    this.dataService.AllAddrInfo()
    .subscribe(
          data => {
              this.selFours = data;
            }
      );
    this.ePriv.nativeElement.click();
    this.editId.nativeElement.value = det.address_info_id.id;
    this.editName.nativeElement.value = det.address_info_id.name;
    this.editlinkVal.nativeElement.value = det.value;
    this.editlinkTwo.nativeElement.value = det.name;
    this.editlinkThree.nativeElement.value = det.privacy;
    this.editlinkPrior.nativeElement.value = det.priority;
  }

  editInfo() {
    var k = {
      "address_info_id": {
      	"id": this.editId.nativeElement.value,
      	"name": this.editName.nativeElement.value,
        "link": this.editlinkVal.nativeElement.value,
      },
      "priority": this.editlinkPrior.nativeElement.value,
      "privacy": this.editlinkThree.nativeElement.value,
      "value": this.editlinkVal.nativeElement.value,
      "name": this.editName.nativeElement.value
    };
    var id = this.cardId;
    console.log(k);
    this.dataService.editInfoCard(k, id)
      .subscribe(
            data => {
              console.log(data);
            }
          );
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

  onLinkChange(val) {
    this.dataService.getAddrInfo(val)
      .subscribe(
            data => {
                this.selTwos = data;
              }
        );
  }

  saves() {
    var k = {"address":{"value":this.linkVal.nativeElement.value, "privacy":this.linkThree.nativeElement.value, "priority":this.linkPrior.nativeElement.value},"privacyUsers":[]}
    var social = this.linkTwo.nativeElement.value;
    var id = this.cardId;
    this.dataService.addInfoCard(k, social, id)
      .subscribe(
            data => {
                 this.dataService.cardShow(this.dataService.accessToken)
                  .subscribe(
                        data => {
                          this.cardId = data.card.id;
                          if(data.card.cardImage) {
                  this.userMainImg =  'data:image/*;base64,' + data.card.cardImage;
                  this.userMainImg = this.sanitizer.bypassSecurityTrustUrl(this.userMainImg);
                }
                else {
                  this.userMainImg = '/assets/images/user.png';
                }
                          this.user = {
                            title: data.card.title,
                            name: data.card.name,
                            homeAdr: data.card.homeAddress,
                            homeCall: data.card.privatePhone,
                            homeMail: data.card.privateEmail,
                            officeAdr: data.card.officeAddress,
                            officeCall: data.card.officePhone,
                            officeMail: data.card.officeEmail,
                            degree: data.card.qualifications,
                            position: data.card.jobTitle,
                            memberships: data.card.memberships,
                            company: data.card.company,
                            website: data.card.website,
                            homeAdrPriv: data.card.homeAddressPrivacy,
                            homeEmailPriv: data.card.privateEmailPrivacy,
                            homePhonePriv: data.card.privatePhonePrivacy,
                            officeAdrPriv: data.card.officeAddressPrivacy,
                            officeEmailPriv: data.card.officeEmailPrivacy,
                            officePhonePriv: data.card.officePhonePrivacy,
                            uHtml: data.card.title,
                            uHtml2: data.card.title,
                            uHtml3: data.card.title,
                            uHtml4: data.card.title,
                            uHtml5: data.card.title,
                            uHtml6: data.card.title,
                            uHtml7: data.card.title,
                          }
                          this.dataService.socialAddr(this.cardId)
                          .subscribe(
                                data => {
                                    this.allInfos = data;
                                    this.icon = [];
                          for(var l=0;l<data.length;l++) {
                            this.icon[l] =  'data:image/*;base64,' + data[l].address_info_id.image;
                            this.icon[l] = this.sanitizer.bypassSecurityTrustUrl(this.icon[l]);
                          }
                                  }
                            );
                          }
                    );
                  this.dataService.getAllAddr()
                  .subscribe(
                        data => {
                            this.selOnes = data;
                          }
                    );
                  var id1 = 1; var id2 = 2;
                  this.dataService.getAddrInfo(id1)
                  .subscribe(
                        data => {
                            this.selTwos = data;
                          }
                    );
              }
        );
  }

  fileChange(event) {
    let fileList: FileList = this.uFile.nativeElement.files;
    if(fileList.length>0) {
    let file: File = fileList[0];
    let formData:FormData = new FormData();
    formData.append('file', fileList[0], fileList[0].name);
    var id = this.cid.nativeElement.value;
    this.dataService.addImage(formData, id)
      .subscribe(
            data => {
                // console.log(data);
              }
        );
    }
}

  savesEdit() {
    var k = {"address":{"value":this.editlinkVal.nativeElement.value, "privacy":this.editlinkThree.nativeElement.value, "priority":this.editlinkPrior.nativeElement.value},"privacyUsers":[]}
    var social = this.editlinkTwo.nativeElement.value;
    var id = this.cardId;
    this.dataService.addInfoCard(k, social, id)
      .subscribe(
            data => {
                 this.dataService.cardShow(this.dataService.accessToken)
                  .subscribe(
                        data => {
                          this.cardId = data.card.id;
                          if(data.card.cardImage) {
                  this.userMainImg =  'data:image/*;base64,' + data.card.cardImage;
                  this.userMainImg = this.sanitizer.bypassSecurityTrustUrl(this.userMainImg);
                }
                else {
                  this.userMainImg = '/assets/images/user.png';
                }
                          this.user = {
                            title: data.card.title,
                            name: data.card.name,
                            homeAdr: data.card.homeAddress,
                            homeCall: data.card.privatePhone,
                            homeMail: data.card.privateEmail,
                            officeAdr: data.card.officeAddress,
                            officeCall: data.card.officePhone,
                            officeMail: data.card.officeEmail,
                            degree: data.card.qualifications,
                            position: data.card.jobTitle,
                            memberships: data.card.memberships,
                            company: data.card.company,
                            website: data.card.website,
                            homeAdrPriv: data.card.homeAddressPrivacy,
                            homeEmailPriv: data.card.privateEmailPrivacy,
                            homePhonePriv: data.card.privatePhonePrivacy,
                            officeAdrPriv: data.card.officeAddressPrivacy,
                            officeEmailPriv: data.card.officeEmailPrivacy,
                            officePhonePriv: data.card.officePhonePrivacy,
                            uHtml: data.card.title,
                            uHtml2: data.card.title,
                            uHtml3: data.card.title,
                            uHtml4: data.card.title,
                            uHtml5: data.card.title,
                            uHtml6: data.card.title,
                            uHtml7: data.card.title,
                          }
                          this.dataService.socialAddr(this.cardId)
                          .subscribe(
                                data => {
                                    this.allInfos = data;
                                    this.icon = [];
                          for(var l=0;l<data.length;l++) {
                            this.icon[l] =  'data:image/*;base64,' + data[l].address_info_id.image;
                            this.icon[l] = this.sanitizer.bypassSecurityTrustUrl(this.icon[l]);
                          }
                                  }
                            );
                          }
                    );
                  this.dataService.getAllAddr()
                  .subscribe(
                        data => {
                            this.selOnes = data;
                          }
                    );
                  var id1 = 1; var id2 = 2;
                  this.dataService.getAddrInfo(id1)
                  .subscribe(
                        data => {
                            this.selTwos = data;
                          }
                    ); 
              }
        );
  }

  onChange(val, doc) {
    if(val=='Individual User') {
      document.getElementById(doc).style.display = 'flex';
    }
    else {
      document.getElementById(doc).style.display = 'none'; 
    }
  }

  onSubmitForm({value, valid}) {
    var x1 = (<HTMLInputElement>document.getElementById('mail1')).value;
    var x2 = (<HTMLInputElement>document.getElementById('mail2')).value;
    var x3 = (<HTMLInputElement>document.getElementById('mail3')).value;
    var x4 = (<HTMLInputElement>document.getElementById('mail4')).value;
    var x5 = (<HTMLInputElement>document.getElementById('mail5')).value;
    var x6 = (<HTMLInputElement>document.getElementById('mail6')).value;
    var x7 = (<HTMLInputElement>document.getElementById('mail7')).value;
    // console.log(this.idHPP.nativeElement.value);
    var k = {
        "card": {
            "title": value.title,
            "name": value.name,
            "qualifications": value.degree,
            "memberships": value.memberships,
            "homeAddress": value.homeAdr,
            "homeAddressPrivacy": this.idHAP.nativeElement.value,
            "officeAddress": value.officeAdr,
            "officeAddressPrivacy": this.idOAP.nativeElement.value,
            "privateEmail": value.homeMail,
            "privateEmailPrivacy": this.idHEP.nativeElement.value,
            "officeEmail": value.officeMail,
            "officeEmailPrivacy": this.idOEP.nativeElement.value,
            "privatePhone": value.homeCall,
            "privatePhonePrivacy": this.idHPP.nativeElement.value,
            "officePhone": value.officeCall,
            "officePhonePrivacy": this.idOPP.nativeElement.value,
            "website": value.website,
            "jobTitle": value.position,
            "company": value.company
        },
        "privacyUsers": []
    };
    // console.log(k);
    this.dataService.cardEdit(k, this.cardId)
      .subscribe(
            data => {
                this.router.navigateByUrl('card');
              },
            complete => {
              
            }
        );
    return false;
  }

  onSubmit(e) {
    return false;
  }

  append(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml = this.myHtml + this.appendHtml;
      (<HTMLInputElement>document.getElementById('mail1')).value = x + ', ' + (<HTMLInputElement>document.getElementById('mail1')).value;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }
  append2(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml2 = this.myHtml2 + this.appendHtml;
      (<HTMLInputElement>document.getElementById('mail2')).value = this.myHtml2;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }
  append3(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml3 = this.myHtml3 + this.appendHtml;
      (<HTMLInputElement>document.getElementById('mail3')).value = this.myHtml3;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }
  append4(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml4 = this.myHtml4 + this.appendHtml;
      (<HTMLInputElement>document.getElementById('mail4')).value = this.myHtml4;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }
  append5(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml5 = this.myHtml5 + this.appendHtml;
      (<HTMLInputElement>document.getElementById('mail5')).value = this.myHtml5;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }
  append6(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml6 = this.myHtml6 + this.appendHtml;
      (<HTMLInputElement>document.getElementById('mail6')).value = this.myHtml6;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }

  append8(id) {
    var x = (<HTMLInputElement>document.getElementById(id)).value;
    this.appendHtml = '<li style="display: flex; align-items: center; justify-content: center; padding: 3px 0px;">' + x + '</li>';
    if(x != '') {
      this.myHtml8 = this.myHtml8 + this.appendHtml;
      (<HTMLInputElement>document.getElementById('mail6')).value = this.myHtml8;
    }
    (<HTMLInputElement>document.getElementById(id)).value = '';
  }

}
