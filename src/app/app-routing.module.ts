import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { WelcomeComponent }   from './welcome/welcome.component';
import { SubscribeComponent } from './welcome/subscribe.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { AuthGuard } from './_services/auth.guard';

 
 
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //{ path: 'dashboard', component: DashboardComponent },
  //{ path: 'detail/:id', component: HeroDetailComponent },
	{ path: 'welcome/:section', component: WelcomeComponent },
	//{ path: 'dashboard', component: DashboardComponent }
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: 'dashboard/:section', component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: 'subscribe', component: SubscribeComponent},
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}