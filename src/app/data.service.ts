import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, HttpModule, Response, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenParams } from './Classes/TokenParams';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
  userImg: string;
  respData = Array;
  accessToken: string;

  private TokenApi = "https://hrmsfirst.com/teqnihome/oauth/token";
  private cardDetails = "https://hrmsfirst.com/teqnihome/api/card/show/";
  private cardA = "https://hrmsfirst.com/teqnihome/api/card/add/";
  private cardE = "https://hrmsfirst.com/teqnihome/api/card/edit/";
  private cardD = "https://hrmsfirst.com/teqnihome/api/card/delete/";
  private reqCount = "https://hrmsfirst.com/teqnihome/api/notifications/";
  private forgotEmail = "https://hrmsfirst.com/teqnihome/api/password/forgot/";
  private sign = "https://hrmsfirst.com/teqnihome/site/register/";
  private friends = "https://hrmsfirst.com/teqnihome/api/social/friends/";
  private friendReq = "https://hrmsfirst.com/teqnihome/api/social/friendrequests/";
  private friendDel = "https://hrmsfirst.com/teqnihome/api/social/delete/";
  private searchUser = "https://hrmsfirst.com/teqnihome/api/card/searchuser/0";
  private sendReq = "https://hrmsfirst.com/teqnihome/api/social/request/";
  private confirmReq = "https://hrmsfirst.com/teqnihome/api/social/confirm/";
  private specard = "https://hrmsfirst.com/teqnihome/api/card/get/id/";
  private reqRec = "https://hrmsfirst.com/teqnihome/api/card/requests/received/0";
  private reqAcc = "https://hrmsfirst.com/teqnihome/api/card/request/accept/";
  private reqRem = "https://hrmsfirst.com/teqnihome/api/card/request/reject/";
  private reqField = "https://hrmsfirst.com/teqnihome/api/card/requests/field/0";
  private indiReq = "https://hrmsfirst.com/teqnihome/api/card/request/view/";
  private getAddr = "https://hrmsfirst.com/teqnihome/api/card/addresstype/get/all";
  private getAddrType = "https://hrmsfirst.com/teqnihome/api/card/addresstype/get/all";
  private getAddrInfos = "https://hrmsfirst.com/teqnihome/api/card/addressinfo/get/all";
  private addrInfo = "https://hrmsfirst.com/teqnihome/api/card/addressinfo/get/";
  private addInfo = "https://hrmsfirst.com/teqnihome/api/card/address/";
  private editInfo = "https://hrmsfirst.com/teqnihome/api/card/address/edit/";
  private addrAll = "https://hrmsfirst.com/teqnihome/api/card/address/all/";
  private remAddr = "https://hrmsfirst.com/teqnihome/api/card/address/remove";
  private showAddr = "https://hrmsfirst.com/teqnihome/api/card/showaddress/all/";
  private jobAdd = "https://hrmsfirst.com/teqnihome/api/job/offer/add/";
  private jobAcc = "https://hrmsfirst.com/teqnihome/api/job/offer/accept/";
  private jobEdt = "https://hrmsfirst.com/teqnihome/api/job/offer/edit/";
  private myJb = "https://hrmsfirst.com/teqnihome/api/job/offer/posted/all";
  private matchedJb = "https://hrmsfirst.com/teqnihome/api/job/offer/mymatch/0";
  private skillAdd = "https://hrmsfirst.com/teqnihome/api/job/offer/skill/add/";
  private jobSrh = "https://hrmsfirst.com/teqnihome/api/job/searchjob/0";
  private jobAll = "https://hrmsfirst.com/teqnihome/api/job/offer/posted/all";
  private jobDel = "https://hrmsfirst.com/teqnihome/api/job/offer/delete/";
  private jobEd = "https://hrmsfirst.com/teqnihome/api/job/offer/edit/";
  private offerApp = "https://hrmsfirst.com/teqnihome/api/job/offer/application/";
  private offerMat = "https://hrmsfirst.com/teqnihome/api/job/offer/match/";
  private short = "https://hrmsfirst.com/teqnihome/api/job/shortlist/application/";
  private offerAppl = "https://hrmsfirst.com/teqnihome/api/job/offer/apply/";
  private offerApplied = "https://hrmsfirst.com/teqnihome/api/job/offer/applied/0";
  private offerApplied1 = "https://hrmsfirst.com/teqnihome/api/job/offer/applied/1";
  private offerSpec = "https://hrmsfirst.com/teqnihome/api/job/offer/";
  private srhResume = "https://hrmsfirst.com/teqnihome/api/resume/searchresume/0";
  private getRes = "https://hrmsfirst.com/teqnihome/api/resume/get/";
  private joinJ = "https://hrmsfirst.com/teqnihome/api/job/join/";
  private addRes = "https://hrmsfirst.com/teqnihome/api/resume/add";
  private editRes = "https://hrmsfirst.com/teqnihome/api/resume/edit/";
  private timeAdd = "https://hrmsfirst.com/teqnihome/api/user/profile";
  private showRes = "https://hrmsfirst.com/teqnihome/api/resume/show/";
  private addEdu = "https://hrmsfirst.com/teqnihome/api/resume/education/add/";
  private addExp = "https://hrmsfirst.com/teqnihome/api/resume/experience/add/";
  private specRes = "https://hrmsfirst.com/teqnihome/api/card/get/by/resume/";
  private viewRef = "https://hrmsfirst.com/teqnihome/api/job/referencing/all/sent/";
  private resSkill = "https://hrmsfirst.com/teqnihome/api/resume/professionalskill/add/";
  private callInter = "https://hrmsfirst.com/teqnihome/api/job/interview/";
  private resch = "https://hrmsfirst.com/teqnihome/api/job/interview/reschedule/";
  private confres = "https://hrmsfirst.com/teqnihome/api/job/reschedule/confirm/";
  private sch = "https://hrmsfirst.com/teqnihome/api/job/interview/schedule/";
  private selJob = "https://hrmsfirst.com/teqnihome/api/job/select/";
  private offJob = "https://hrmsfirst.com/teqnihome/api/job/offer/";
  private refJob = "https://hrmsfirst.com/teqnihome/api/job/reference/";
  private refAll = "https://hrmsfirst.com/teqnihome/api/job/referencing/detail/";
  private emprefJob = "https://hrmsfirst.com/teqnihome/api/job/reference/employer/";
  private canJob = "https://hrmsfirst.com/teqnihome/api/job/interview/cancel/";
  private seeDet = "https://hrmsfirst.com/teqnihome/api/job/calendar/";
  private shortRes = "https://hrmsfirst.com/teqnihome/api/job/shortlist/";
  private refStat = "https://hrmsfirst.com/teqnihome/api/resume/reference/application/status/";
  private getRef = "https://hrmsfirst.com/teqnihome/api/resume/reference/get/";
  private editRef = "https://hrmsfirst.com/teqnihome/api/resume/reference/edit/";
  private accRef = "https://hrmsfirst.com/teqnihome/api/job/offer/reference/accept/";
  private addRef = "https://hrmsfirst.com/teqnihome/api/resume/reference/add/";
  private getReq = "https://hrmsfirst.com/teqnihome/api/resume/reference/received/";
  private proRef = "https://hrmsfirst.com/teqnihome/api/job/referencing/all/received/";
  private empRef = "https://hrmsfirst.com/teqnihome/api/resume/employerreference/add/";
  private empRefRem = "https://hrmsfirst.com/teqnihome/api/resume/employerreference/reject/";
  private addImg = "https://hrmsfirst.com/teqnihome/api/card/add/photo/";
  private calend = "https://hrmsfirst.com/teqnihome/api/job/offer/applied/all";
  private inter = "https://hrmsfirst.com/teqnihome/api/job/offer/application/all";
  private qr = "https://hrmsfirst.com/teqnihome/api/card/qr/";
  // private indiFd = "https://hrmsfirst.com/teqnihome/api/card/get/id/";
  private addTest = "https://hrmsfirst.com/teqnihome/api/test";
  private fetchTest = "https://hrmsfirst.com/teqnihome/api/test/all?page=0&size=10";
  private fetchTestSpec = "https://hrmsfirst.com/teqnihome/api/test/";
  private fetchTestQues = "https://hrmsfirst.com/teqnihome/api/test/question/";
  private assignTest = "https://hrmsfirst.com/teqnihome/api/test/assign/";
  private addQues = "https://hrmsfirst.com/teqnihome/api/test/question/";
  private submitTest = "https://hrmsfirst.com/teqnihome/api/test/submit/";
  private assigned = "https://hrmsfirst.com/teqnihome/api/test/assigned?page=0&size=10";
  private assignList = "https://hrmsfirst.com/teqnihome/api/test/assignments?page=0&size=10";
  private fetchTestSpecRes = "https://hrmsfirst.com/teqnihome/api/test/responses/";
  private submitScore = "https://hrmsfirst.com/teqnihome/api/test/assignment/";
  private getSkillTypeInfos = "https://hrmsfirst.com/teqnihome/api/resume/skilltype/get/all";
  private getSkillInfos = "https://hrmsfirst.com/teqnihome/api/resume/skill/get/all";
  private getResCat = "https://hrmsfirst.com/teqnihome/api/resume/category/all";
  private getResSubCat = "https://hrmsfirst.com/teqnihome/api/resume/subcategory/all/";
  private getResSubTypeCat = "https://hrmsfirst.com/teqnihome/api/resume/subcategory/skills/";
  private getResSkills = "https://hrmsfirst.com/teqnihome/api/resume/skill/get/type/";

  private changePass = "https://hrmsfirst.com/teqnihome/users/change/password";
  private forgotPass = "https://hrmsfirst.com/teqnihome/users/forgot/password?user_name=";
  private fetchProj = "https://hrmsfirst.com/teqnihome/rest/project/fetch-all-projects/";
  private fetchAct = "https://hrmsfirst.com/teqnihome/rest/activity/fetch-activity-list";
  private fetchTask = "https://hrmsfirst.com/teqnihome/rest/tasks/fetch-tasks-of-user/";
  private fetchEmp = "https://hrmsfirst.com/teqnihome/rest/employee/fetch-emp-of-project/";
  private sprint = "https://hrmsfirst.com/teqnihome/rest/sprint/fetch-sprint-info-by-orgname-projectName/";
  private addTask = "https://hrmsfirst.com/teqnihome/rest/tasks/add-task";
  private saveTask = "https://hrmsfirst.com/teqnihome/rest/employee/save-employee";
  private addProj = "https://hrmsfirst.com/teqnihome/rest/project/add-project";
  private fetchsp = "https://hrmsfirst.com/teqnihome/rest/tasks/fetch-tasks-of-project/";
  private addSprint = "https://hrmsfirst.com/teqnihome/rest/sprint/add-sprint";
  private sprintDet = "https://hrmsfirst.com/teqnihome/rest/tasks/fetch-task/null/";
  private updateTask = "https://hrmsfirst.com/teqnihome/rest/tasks/update-task";
  private empAll = "https://hrmsfirst.com/teqnihome/rest/employee/fetch-all-emp-info/";
  private saveEmp = "https://hrmsfirst.com/teqnihome/rest/employee/save-employee-list";

  constructor(private http: Http, private router:Router) {
  	this.userImg = '/assets/images/user.png';
  }

  checkToken() {
  	var item = localStorage.getItem('user');
  	if(item==null) {
  		localStorage.removeItem('sign');
    	localStorage.removeItem('user');
  		this.router.navigate(['']);
  	}
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    this.http.get(this.reqCount, {headers: headersForTokenApi}).map(
        (response) => {
        	
        }).subscribe(res => 
        {
        	
        },
        err => {
        	if(err.status===401) {
              localStorage.removeItem('sign');
      		  localStorage.removeItem('user');
      		  this.router.navigate(['']);
            }
        });
  }

  userName() {
    if(JSON.parse(localStorage.getItem('user'))) {
      return JSON.parse(localStorage.getItem('user')).userName
    }
    else {
      return -1;
    }
  }

  organisation() {
    if(JSON.parse(localStorage.getItem('user'))) {
      return JSON.parse(localStorage.getItem('user')).organisation
    }
    else {
      return -1;
    }
  }

  userId() {
    if(JSON.parse(localStorage.getItem('user'))) {
      return JSON.parse(localStorage.getItem('user')).emailId
    }
    else {
      return -1;
    }
  }

  zipId() {
    if(JSON.parse(localStorage.getItem('user'))) {
      return JSON.parse(localStorage.getItem('user')).zipCode
    }
    else {
      return -1;
    }
  }

  addsTask(k:any): Observable<any> {
    var headersForTokenApi = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(k);
    var url = this.addTask;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  savesTask(k:any): Observable<any> {
    var headersForTokenApi = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(k);
    var url = this.saveTask;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  addsProject(k:any): Observable<any> {
    var headersForTokenApi = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(k);
    var url = this.addProj;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  addsSprint(k:any): Observable<any> {
    var headersForTokenApi = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(k);
    var url = this.addSprint;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  updatesTask(k:any): Observable<any> {
    var headersForTokenApi = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(k);
    var url = this.updateTask;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  savesEmp(k:any): Observable<any> {
    var headersForTokenApi = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(k);
    var url = this.saveEmp;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  fetchProjects() {
    var uname = this.userId();
    var zip = this.zipId();
    var org = this.organisation();
    var t = {'Content-Type': 'application/json'};
    var headersForTokenApi = new Headers(t);
    var url = this.fetchProj + org + '/' +  zip + '/' + uname;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }
  
  fetchEmps(pname) {
    var uname = this.userId();
    var zip = this.zipId();
    var org = this.organisation();
    var t = {'Content-Type': 'application/json'};
    var headersForTokenApi = new Headers(t);
    var url = this.fetchEmp + org + '/' + zip + '/' + pname;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }
  
  empsAll() {
    var uname = this.userId();
    var zip = this.zipId();
    var org = this.organisation();
    var t = {'Content-Type': 'application/json'};
    var headersForTokenApi = new Headers(t);
    var url = this.empAll + org + '/' + zip;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }
  
  fetchProjectDetails(pname) {
    var zip = this.zipId();
    var org = this.organisation();
    var t = {'Content-Type': 'application/json'};
    var headersForTokenApi = new Headers(t);
    var url = this.fetchsp + org + '/' + pname + '/' + zip;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  sprintDetails(pname) {
    var zip = this.zipId();
    var t = {'Content-Type': 'application/json'};
    var headersForTokenApi = new Headers(t);
    var url = this.sprintDet + pname;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }
  
  fetchSprints(pname) {
    var uname = this.userId();
    var zip = this.zipId();
    var org = this.organisation();
    var t = {'Content-Type': 'application/json'};
    var headersForTokenApi = new Headers(t);
    var url = this.sprint + org + '/' +  pname + '/' + zip;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }
  
  fetchTasks() {
    var uname = this.userId();
    var zip = this.zipId();
    var t = {'Content-Type': 'application/json'};
    var headersForTokenApi = new Headers(t);
    var url = this.fetchTask + uname;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  fetchActs(k) {
    var headersForTokenApi = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(k);
    var url = this.fetchAct;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  forgotPassword(e) {
    var uname = this.userName();
    var t = {'Content-Type': 'application/json'};
    var headersForTokenApi = new Headers(t);
    var url = this.forgotPass + 'admin&user_name=' + e;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  notifications() {
    var uname = this.userName();
    var uid = this.userId();
    var t = {'Content-Type': 'application/json'};
    var headersForTokenApi = new Headers(t);
    var url = this.reqCount + uid + '&page=0&maxResults=10&user_name=' + uname;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  shortResume(resid: number, oid: string): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = '';
    var url = this.shortRes + resid + '/' + oid;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  // indiFriend(id) {
  // 	this.checkToken();
  //   var item = localStorage.getItem('user');
  //   var tk = JSON.parse(item).token;
  //   var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
  //   var headersForTokenApi = new Headers(t);
  //   var url = this.indiFd + id;
  //   return this.http.get(url, {headers: headersForTokenApi}).map(
  //       (response: any) => response.json());
  // }

  calendarDate() {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.calend, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  qrCode(id) {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.qr + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response: any) => response);
  }

  interDate() {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.inter, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  cardShow(token) {
  	this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.cardDetails, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  empRefAdd(k:any, id:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.empRef + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  empRefRemove(id:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body ='';
    var url = this.empRefRem + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  addImage(formData, id:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'multipart/form-data', 'Accpet': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body ='';
    var url = this.addImg + id;
    return this.http.post(url, formData, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  refStatus(id) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.refStat + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  provideRefer() {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.proRef, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  fetchesTest() {
    this.checkToken();
    var item = localStorage.getItem('user');
  var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.fetchTest, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  fetchesTestSpec(id) {
    this.checkToken();
    var item = localStorage.getItem('user');
  var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.fetchTestSpec + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  assignedTestSpecResp(id) {
    this.checkToken();
    var item = localStorage.getItem('user');
  var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.fetchTestSpecRes + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  getRefer(id) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.getRef + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  seesDet(id, date) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.seeDet + id + "?date=" + date;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  getRequest() {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.getReq;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  referAll(appid, resid) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.refAll + appid +  '/'+ resid;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  editRefer(k:any): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.editRef;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  accpetRef(id:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body ='';
    var url = this.accRef + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  addRefer(k:any, id:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.addRef + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  addsTest(k): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.addTest;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  assignsTest(k, id): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.assignTest + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  addsQues(k, id): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.addQues + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  submitsTest(k, id): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.submitTest + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  submitsScore(id, score): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = "";
    var url = this.submitScore + id + "?marks=" + score;
    return this.http.put(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  getsResCat() {
    var item = localStorage.getItem('user');
  var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.getResCat, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  getsResSubCat(id) {
    var item = localStorage.getItem('user');
  var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.getResSubCat + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  getsResSubTypeCat(id) {
    var item = localStorage.getItem('user');
  var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.getResSubTypeCat + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  getsResSkills(id) {
    var item = localStorage.getItem('user');
  var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.getResSkills + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  getsSkillTypeInfos() {
    var item = localStorage.getItem('user');
  var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.getSkillTypeInfos, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  getsSkillInfos() {
    var item = localStorage.getItem('user');
  var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.getSkillInfos, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  removesQuestion(id): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = "";
    var url = this.fetchTestQues + id;
    return this.http.delete(url, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  assignedTest(id): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = "";
    var url = this.assigned;
    return this.http.get(url, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  assignedTest2(): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = "";
    var url = this.assigned;
    return this.http.get(url, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  assignLists(): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = "";
    var url = this.assignList;
    return this.http.get(url, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  assignedTestSpec(id): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = "";
    var url = this.fetchTestSpec + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  removesTest(id): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
    var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = "";
    var url = this.fetchTestSpec + id;
    return this.http.delete(url, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }


  addEducation(k:any, id: number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.addEdu + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  reschedule(k:any, id: number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.resch + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  schedule(md:any, id: number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = md;
    var url = this.sch + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  confResch(id: number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    var body = '';
    var url = this.confres + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  callInterview(k:any, resid:number , offerid:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.callInter + resid + '/' + offerid;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  jobJoin(resid:number , offerid:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body ='';
    var url = this.joinJ + resid + '/' + offerid;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  selectJob(resid:number , offerid:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = '';
    var url = this.selJob + resid + '/' + offerid;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  cancelJob(offerid:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = '';
    var url = this.canJob + offerid;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  referJob(resid:number , offerid:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = '';
    var url = this.refJob + resid + '/' + offerid;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  offerJob(resid:number , offerid:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = '';
    var url = this.offJob + resid + '/' + offerid;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  empreferJob(resid:number , offerid:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = '';
    var url = this.emprefJob + resid + '/' + offerid;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  addExperience(k:any, id: number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.addExp + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  cardSpecific(id) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.specard + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  showResume(id) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.showRes + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  offerSpecific(id) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.offerSpec + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  AllAddrType() {
    this.checkToken();
    var item = localStorage.getItem('user');
  var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.getAddrType, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  AllAddrInfo() {
    this.checkToken();
    var item = localStorage.getItem('user');
  var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.getAddrInfos, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  getAllAddr() {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.getAddr, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  viewRefer() {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.viewRef, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  getResume() {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.getRes, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  offerApplication(id: number) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.offerApp + id + '/0';
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  offerMatch(id: number) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.offerMat + id + '/0';
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  getSpecResume(id: number) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.specRes + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  addResume(k:any): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    return this.http.post(this.addRes, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  editResume(k:any, id): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.editRes + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  timeAddition(k:any): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.timeAdd;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  resSkillAdd(k:any, id:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.resSkill + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  showAddress(id: number) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.showAddr + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  getAddrInfo(id:any) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.addrInfo + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  myJobs() {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.myJb, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  matchedJobs() {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.matchedJb, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  offerApplieds() {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.offerApplied, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  offerApplieds1() {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.offerApplied1, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  allJobs() {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.jobAll, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  socialAddr(id:any) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    var url = this.addrAll + id;
    return this.http.get(url, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  removeAddr(id:number): Observable<TokenParams> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = "";
    var url = this.remAddr + '?id=' + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  shortlist(id:number, oid: number): Observable<TokenParams> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = "";
    var url = this.short + id + '/' + oid;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  offerApply(id:number): Observable<TokenParams> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = "";
    var url = this.offerAppl + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  jobSearch(k:any): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    return this.http.post(this.jobSrh, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  searchResume(k:any): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    return this.http.post(this.srhResume, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  jobDelete(id:number): Observable<TokenParams> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = "";
    var url = this.jobDel + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  cardReqAcc(id:number): Observable<TokenParams> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = "";
    var url = this.reqAcc + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  cardReqFields(k:any): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    return this.http.post(this.reqField, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  jobAddition(k:any): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    return this.http.post(this.jobAdd, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  jobAccept(id:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body ="";
    var url = this.jobAcc + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  jobEdit(k:any, id: number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.jobEdt + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  jobEditn(k:any, id: number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.jobEd + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  skillAddition(k:any, id: number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.skillAdd + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  addInfoCard(k:any, social: string, card: number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.addInfo + social + '/' + card;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  editInfoCard(k:any, card: number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
  var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.editInfo + card;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  indiCardReq(k:any, id:number): Observable<any> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    var url = this.indiReq + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  cardReqRem(id:number): Observable<TokenParams> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body = "";
    var url = this.reqRem + id;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  cardRequests(token) {
  	this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.reqCount, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  cardReqRec(token) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.reqRec, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  myFriends(token) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.friends, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  friendRequests(token) {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var t = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk};
    var headersForTokenApi = new Headers(t);
    return this.http.get(this.friendReq, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  forgotmail(Email: string): Observable<TokenParams> {
 //    var item = localStorage.getItem('user');
	// var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
    var data = "";
    var url = "https://hrmsfirst.com/teqnihome/api/password/forgot?email=" + Email;
    return this.http.post(url, data, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  friendDelete(k:any): Observable<TokenParams> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    return this.http.post(this.friendDel, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  confirmRequest(k:any): Observable<TokenParams> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    return this.http.post(this.confirmReq, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  search(k:any): Observable<TokenParams> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    return this.http.post(this.searchUser, body, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  sendRequest(k:any): Observable<TokenParams> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    let body =JSON.stringify(k);
    return this.http.post(this.sendReq, body, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  cardAdd(k:any): Observable<TokenParams> {
    let body =JSON.stringify(k);
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    return this.http.post(this.cardA, body, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  cardEdit(k: any, cardId: any): Observable<TokenParams> {
    let body =JSON.stringify(k);
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    var url = this.cardE + cardId;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  cardDelete(cardId: any): Observable<TokenParams> {
    this.checkToken();
    var item = localStorage.getItem('user');
	var tk = JSON.parse(item).token;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': tk});
    var url = this.cardD + cardId;
    var body = '';
    return this.http.post(url, body, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  signUp(Username: string, Password: string, Email: string, captcha: String): Observable<TokenParams> {
    var k = {"username": Username, "password": Password, "email": Email};
    let body =JSON.stringify(k);
 //    var item = localStorage.getItem('user');
	// var tk = JSON.parse(item).token;
    var url = this.sign + captcha;
    var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
    return this.http.post(url, body, {headers: headersForTokenApi}).map(
        (response) => response.json());
  }

  login(Username: string, Password: string): Observable<TokenParams> {
  	let body = new URLSearchParams();
    body.set('client_id', 'projectmanagement');
    body.set('grant_type', 'password');
    body.set('username', Username);
    body.set('password', Password);
    body.set('scope', 'read write');
  	var headersForTokenApi = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  	return this.http.post(this.TokenApi, body.toString(), {headers: headersForTokenApi}).map(
  			(response) => response.json());
  }

}
