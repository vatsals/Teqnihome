import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { TokenParams } from '../Classes/TokenParams';

@Component({
  selector: 'app-specard',
  templateUrl: './specard.component.html',
  styleUrls: ['./specard.component.css']
})
export class SpecardComponent implements OnInit {
  userImg: string;
  id: number;
  flip: boolean;
  private sub: any;
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
  cardDet: number;
  cardId: number;
  fbIcon: string;
  myData = [];
  allInfos = [];

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute) {
  	this.userImg = '/assets/images/user.png';
    this.fbIcon = '/assets/images/fbIcon.png';
  }

  ngOnInit() {
  	this.sub = this.activeRoute.params.subscribe(params => {
       this.id = +params['id'];
       this.dataService.cardSpecific(this.id)
      .subscribe(
            data => {
          		this.myData = data;
          		this.cardId = data.card.id;
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
              this.dataService.showAddress(this.cardId)
                  .subscribe(
                        data => {
                            this.allInfos = data;
                          }
                    );
              }
        );
    });
  }

  socialGo(addr) {
    window.location.href=addr;
  }

  request(val) {
    var id = this.cardId;
    var k = {"fieldsRequested": val,"category":"other"};
    this.dataService.indiCardReq(k, id)
      .subscribe(
            data => {
                alert('Request Sent');
              },
            err => {
              alert('Request already sent');
            }
        );
  }

  requestSocial(val) {
    var id = this.cardId;
    var k = {"fieldsRequested": val,"category":"social"};
    this.dataService.indiCardReq(k, id)
      .subscribe(
            data => {
                alert('Request Sent');
              },
            err => {
              alert('Request already sent');
            }
        );
  }

  flipEvent(fp) {
    if(!fp) {
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
