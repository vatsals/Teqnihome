import { Injectable } from '@angular/core';
import { Http, HttpModule, Response, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenParams } from './Classes/TokenParams';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  userImg: string;
  respData = Array;
  accessToken: string = "";
  private TokenApi = "http://54.172.154.36:8080/teqnihome/api/auth/login";
  private api = "http://54.172.154.36:8080/teqnihome/api/card/show/";

  constructor(private http: Http) {
  	this.userImg = '/assets/images/user.png';
  }

 //  fetchData() {
 //  	var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'X-Authorization': 'bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0YWRtaW4iLCJzY29wZXMiOlsiUk9MRV9BRE1JTiJdLCJpc3MiOiJodHRwOi8vdGVxbmlob21lLmNvbSIsImlhdCI6MTUyMDAzMDc4MywiZXhwIjoxNTIwMDM3OTgzfQ.tyWyhGUS0N-uq7uF96rHCf5hyaf8Nd2ry1oRyILZopGkAJRWz3Djko3EdiZsLaBYaNaaLgm033F_6odCBcnK1g'});
 //  	return this.http.get(this.api, {headers: headersForTokenApi}).map(
 //  			(response) => response.json()
 //  		).subscribe(
	// 	(data) => console.log(data)
	// )
 //  }

  login(Username: string, Password: string): Observable<TokenParams> {
  	let body =JSON.stringify({"username": "testadminuser@teqnihome.com", "password":"teqni@123"});
  	var headersForTokenApi = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
  	return this.http.post(this.TokenApi, body, {headers: headersForTokenApi}).map(
  			(response) => response.json());
  }

}
