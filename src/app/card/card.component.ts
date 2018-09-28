import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  userImg: string;
  userMainImg: any;
  fbIcon: string;
  fbIcon2: string;

  carduserId: string;
  cardTitle: string;
  cardName: string;
  cardQualif: string;
  cardMembers: string;
  cardhomeAdr: string;
  cardhomeAdrPriv: string;
  cardofficeAdr: string;
  cardofficeAdrPriv: string;
  cardprivEmail: string;
  cardprivEmailPriv: string;
  cardofficeEmail: string;
  cardofficeEmailPriv: string;
  cardprivPhone: string;
  cardprivPhonePriv: string;
  cardofficePhone: string;
  cardofficePhonePriv: string;
  cardwebsite: string;
  cardjobTitle: string;
  cardcompany: string;
  cardImage: string;
  flip: boolean;
  demoCard: boolean;
  mainTab: string;
  cardDet: number;
  myHtml: string;
  myHtml2: string;
  myHtml3: string;
  myHtml4: string;
  myHtml5: string;
  myHtml6: string;
  myHtml7: string;
  cardId: number;
  selOnes = [];
  selTwos = [];
  allInfos = [];
  qrCode: any;
  demoqrImg: any;
  tokenParam: TokenParams;
  appendHtml: string;
  @ViewChild('idHAP') idHAP;
  @ViewChild('idHEP') idHEP;
  @ViewChild('idHPP') idHPP;
  @ViewChild('idOAP') idOAP;
  @ViewChild('idOEP') idOEP;
  @ViewChild('idOPP') idOPP;
  @ViewChild('linkTwo') linkTwo;
  @ViewChild('linkThree') linkThree;
  @ViewChild('linkVal') linkVal;
  @ViewChild('cid') cid;
  @ViewChild('linkPrior') linkPrior;
  numbers = [];
  icon = [];
  many = ['1', '2', '3', '4', '5', '6'];
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
  qrImg: any;

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.flip = true;
    this.myHtml = ''; this.myHtml2 = ''; this.myHtml3 = ''; 
    this.myHtml4 = ''; this.myHtml5 = ''; this.myHtml6 = '';
    this.myHtml7 = '';
    this.demoCard = false;
    this.mainTab = "main-tab";
  	this.userImg = '/assets/images/user.png';
  	this.fbIcon = '/assets/images/fbIcon.png';
    this.fbIcon2 = '/assets/images/fbIcon2.png';
  }

  ngOnInit() {
    this.dataService.cardShow(this.dataService.accessToken)
      .subscribe(
            data => {
              if(data.card!=null) {
                this.cardId = data.card.id;
                this.dataService.qrCode(this.cardId)
                .subscribe(
                      data => {
                        this.qrImg = data;
                        this.demoqrImg = 'data:image/png;base64,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';
                        this.demoqrImg = this.sanitizer.bypassSecurityTrustUrl(this.demoqrImg);
                      },
                      err => {
                        this.demoqrImg = 'data:image/png;base64,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';
                        this.demoqrImg = this.sanitizer.bypassSecurityTrustUrl(this.demoqrImg);
                      }
                    );
                if(data.card.cardImage) {
                  this.userMainImg =  'data:image/*;base64,' + data.card.cardImage;
                  this.userMainImg = this.sanitizer.bypassSecurityTrustUrl(this.userMainImg);
                }
                else {
                  this.userMainImg = '/assets/images/user.png';
                }
                this.cardDet = data.card;
                this.cardTitle = data.card.title;
                this.cardName = data.card.name;
                this.cardQualif = data.card.qualifications;
                this.cardMembers = data.card.memberships;
                this.cardhomeAdr = data.card.homeAddress;
                this.cardhomeAdrPriv = data.card.homeAddressPrivacy;
                this.cardofficeAdr = data.card.officeAddress;
                this.cardofficeAdrPriv = data.card.officeAddressPrivacy;
                this.cardprivEmail = data.card.privateEmail;
                this.cardprivEmailPriv = data.card.privateEmailPrivacy;
                this.cardofficeEmail = data.card.officeEmail;
                this.cardofficeEmailPriv = data.card.officeEmailPrivacy;
                this.cardprivPhone = data.card.privatePhone;
                this.cardprivPhonePriv = data.card.privatePhonePrivacy;
                this.cardofficePhone = data.card.officePhone;
                this.cardofficePhonePriv = data.card.officePhonePrivacy;
                this.cardwebsite = data.card.website;
                this.cardjobTitle = data.card.jobTitle;
                this.cardcompany = data.card.company;
                this.cardImage = data.card.cardImage;
                this.qrCode = data.card.uniqueURL;
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
              if(this.cardDet != null) {
                this.demoCard = true;
              }
              else {
                this.demoCard = false;
              }
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

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        var id = this.cid.nativeElement.value;
        let formData:FormData = new FormData();
        formData.append('image', file, file.name);
        this.dataService.addImage(formData, id)
                  .subscribe(
                        data => {
                            console.log(data);
                          }
                    );
    }
}

  qrShow() {
    document.getElementById("main-tab").style.display = 'none';
    document.getElementById("qrCard").style.display = 'block';
  }

  modalSave() {
    document.getElementById("main-tab").style.display = 'block';
    document.getElementById("qrCard").style.display = 'none';
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

  deleteCard() {
    this.dataService.cardDelete(this.cardId)
      .subscribe(
            data => {
                location.reload();
              },
            complete => {
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
                 this.dataService.cardShow(this.dataService.accessToken)
                  .subscribe(
                        data => {
                          this.cardId = data.card.id;
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
    this.dataService.cardAdd(k)
      .subscribe(
            data => {
                location.reload();
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

}
