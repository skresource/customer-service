import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor (private router: Router){
		
	}
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		
		if(localStorage.getItem('currentUser')){
			return true;
		}
		
		this.router.navigate(['./welcome/login']);
		return false;
	}
	
	isLoggedIn(){
		if(localStorage.getItem('currentUser')){
			return true;
		}
		else
			false;
	}
	
}
