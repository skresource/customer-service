import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http'; 
import { HttpModule, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class UserService{
	url: string = 'http://localhost:3000/employee';
	
	headers: Headers;
    options: RequestOptions;
	
	httpOptions = {
		headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Authorization': 'my-auth-token'
    })
};

	constructor(private http: HttpClient){
		  
	}
	

	add(user: any){
		//console.log(user)
		return this.http.post(this.url, user)
	}
	
	
	getUser(email:String){
		return this.http.get(this.url + '?email='+ email);
	}
	
	
	update(uid: number, htmlObj){		
		console.log(htmlObj);
		return this.http.put(this.url + '/'+uid, JSON.stringify(htmlObj), this.httpOptions);
	}
	
}