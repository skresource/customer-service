import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { map } from 'rxjs/operators';
 


@Injectable()
export class AuthService{
	
	constructor(private http: HttpClient){}
	
	authcheck(email: String, password: String){
	 
		return this.http.get('http://localhost:3000/employee/?email=' + email + "&password="+ password)
					.pipe( 
						map(user => {
							if(user){ 
								localStorage.setItem('currentUser', JSON.stringify(user[0]))
							}							 
							return user;
						})
					)
	}
	
	
	logout(){
		localStorage.removeItem('currentUser');
	}
	
	
	
	
} 