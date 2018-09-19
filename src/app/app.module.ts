import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule }     from './app-routing.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
 

import { UserService }  from './_services/user.service';
import { UploadService }  from './_services/upload.service';
import { AuthService }  from './_services/auth.service';
import { AuthGuard }  from './_services/auth.guard';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SubscribeComponent } from './welcome/subscribe.component';
import { HeaderComponent } from './common/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
	WelcomeComponent,
	SubscribeComponent,
	HeaderComponent,
	DashboardComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpClientModule,
	HttpModule,
	ReactiveFormsModule,
	AppRoutingModule
	
  ],
  providers: [
	UserService, AuthService, AuthGuard, UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
