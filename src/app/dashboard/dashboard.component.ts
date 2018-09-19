import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgForm } from '@angular/forms';
 

import { UserService } from '../_services/user.service';
 

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  
})
export class DashboardComponent {
	
	currentUser: any;
	model: any;	 
	isViewOnly: boolean = true;
	updateInfoShow: boolean = false;
	loading: boolean = false;
	info: Array<string> = [];
	
	
	constructor(
		private routed: ActivatedRoute,
		private userService: UserService,
		private router: Router,
	){
		this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));	
		 
		this.routed.params.subscribe(params => {
			if(params['section']=='edit-profile'){
				this.isViewOnly=false; 
				//console.log(this.currentUser);
			}
			
		}); 
		
		console.log(this.info);
	}	 
	

	udpateProfile(form: NgForm){
		if(form.invalid){
			return;
		}
		
		this.loading = true; 
		let inputObj = {
			'id': this.currentUser.id,
			'fullname':form.form.value.fullname,
			'email': this.currentUser.email,
			'password': this.currentUser.password,
			'address1':form.form.value.address1,
			'state':form.form.value.state,
			'country':form.form.value.country,
			'contact':form.form.value.contact			 
		};
		
		var _self=this;
		
		this.userService.update(this.currentUser.id, inputObj) 
			.pipe()
			.subscribe(
				data => {
					//alert('Successfully signed up'); 	
					localStorage.setItem('currentUser', JSON.stringify(inputObj));
					this.updateInfoShow = true;	
					this.isViewOnly=true; 
					window.history.replaceState(null, null, '/dashboard');
					
					setTimeout(function(){
						_self.router.navigate(['/dashboard']);
					}, 1000); 
				},
				error => {
					alert(JSON.stringify(error));
				}
			); 
	}
	
	// At the file input element
	// (change)="selectFile($event)"
	selectFile(event) {
		this.uploadFile(event.target.files);
	}

	uploadFile(files: FileList) {
		/*if (files.length == 0) {
		  console.log("No file selected!");
		  return

		}
		let file: File = files[0];

		this.upload.uploadFile(this.appCfg.baseUrl + "/api/flash/upload", file)
		  .subscribe(
			event => {
			  if (event.type == HttpEventType.UploadProgress) {
				const percentDone = Math.round(100 * event.loaded / event.total);
				console.log(`File is ${percentDone}% loaded.`);
			  } else if (event instanceof HttpResponse) {
				console.log('File is completely loaded!');
			  }
			},
			(err) => {
			  console.log("Upload Error:", err);
			}, () => {
			  console.log("Upload done");
			}
		  )*/
	}
	
}
