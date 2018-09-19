import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthGuard } from '../_services/auth.guard';
@Component({
  selector: 'common-header',
  templateUrl: './header.component.html',
  
})
export class HeaderComponent {
	isLoggedIn: boolean = false;
	currentUser: any;
	constructor(private authGuard: AuthGuard){
				 
	}
	
	ngOnInit() {
		this.isLoggedIn = this.authGuard.isLoggedIn();
		if(this.isLoggedIn){
			this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
		}
		
	}
	
}
