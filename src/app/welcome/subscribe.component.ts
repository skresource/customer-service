import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService }  from '../_services/user.service';


@Component({
	selector: 'welcome',
	templateUrl: './subscribe.component.html'
})

export class SubscribeComponent implements OnInit {
	user: FormGroup;
	submitDetails: any;
	isSubmitted: boolean = false;
	
	constructor(private fb: FormBuilder){
		
	}
	
	ngOnInit(){
		this.user = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(2)]],
			account: this.fb.group({
				email: ['', Validators.required],
				confirm:['', Validators.required]
			})
		})
	}
	
	onSubmit({value, valid}:{value: any, valid: boolean}){
		console.log(value, valid);
		this.isSubmitted  = true;
		this.submitDetails = value
	}
	
}