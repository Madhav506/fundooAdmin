import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';



const routes: Routes = [
  { path: 'login', component: AdminloginComponent },

  { path: 'dashboard', component: AdmindashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];





@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  
})
export class AppRoutingModule { }
