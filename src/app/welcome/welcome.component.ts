import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService }  from '../_services/user.service';
import { AuthService }  from '../_services/auth.service';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  
})
export class WelcomeComponent {
	title = 'Welcome page';
	isLoggedin: boolean = false;
	showLogin: boolean = false;
	signUpSuccess: boolean = false;
	loginError: any;
	model: any = {} ;
	loading: boolean = false;
	
  
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private authService: AuthService
	){ }
	
	 
	 
	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			if(!this.isLoggedin && params['section']=='login'){
				this.showLogin = true;
			}
			if(!this.isLoggedin && params['section']=='signup'){
				this.showLogin = false;
			}			
		});
		
		this.authService.logout();
	}
	
	register(form: NgForm){
		if(form.invalid){
			return;
		}  
		this.loading = true; 
		
		this.userService.getUser(this.model.email)
		.pipe()
		.subscribe(
			data=>{
				console.log(typeof(data[0]))
				if(data && typeof(data[0]) !='undefined'){						 
					this.loginError = "Username already exists";	
					this.loading = false;					
				}
				else{
					this.userService.add(this.model) 
					.pipe()
					.subscribe(
						data => {
							//alert('Successfully signed up'); 
							this.signUpSuccess = true;
							this.router.navigate(['/welcome/login']);
							this.loading = false;
							this.loginError = false;
							form.reset();
							
						},
						error => {
							alert(error);
						});
				}
				 
			},
			error => {
				console.log(error);
			}  
		);
		 
	}
	
	login(form: NgForm){
		
		if(form.invalid){
			return;
		}
		
		this.loading = true;
		
		if(typeof(this.model.email)=='undefined'  || typeof(this.model.password)=='undefined'){
			console.log('please enter username/password');
			return false;
		}
		else{
			
			this.authService.authcheck(this.model.email, this.model.password)
			.pipe()
			.subscribe(
				data=>{		
					 console.log(data[0])
					if(typeof(data[0])=='undefined') {
						this.loginError = "Username/password not valid"
						this.loading = false;
					}
					else{
						this.router.navigate(['/dashboard']);
					}
					//this.router.navigate(['/dashboard']);
				},
				error => {
					console.log(error);
				}
			);
		}
	}
	
	/*checkDupeUser(emailId){
		let isDupe: boolean = false;
		
		this.userService.getUser(emailId)
		.pipe()
		.subscribe(
			data=>{
				if(data.length >0 ){
					console.log('dup found');
					isDupe = true;
				}
				else{
					isDupe = false;
				}
				 
			},
			error => {
				console.log(error);
			},
			() =>{
				console.log('value of isDupe= ' + isDupe); 
			}
		);
		 
	}*/
	
	toggleView(){
		if(this.showLogin){
			this.signUpSuccess = false;
			this.router.navigate(['/welcome/signup']);
		}
		else{
			this.router.navigate(['/welcome/login']);
		}
		this.showLogin = !this.showLogin;
	}
	
}
