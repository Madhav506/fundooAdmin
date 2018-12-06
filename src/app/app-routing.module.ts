import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';

import {AuthguardGuard  as AuthGuard } from '../app/auth/authguard.guard';
import { QuestionAnswerApproveComponent } from './components/question-answer-approve/question-answer-approve.component';


const routes: Routes = [
  { path: 'login', component: AdminloginComponent },
  { path: 'dashboard', component: AdmindashboardComponent },
  { path: 'QuestionAnswer', component: QuestionAnswerApproveComponent,canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];





@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  
})
export class AppRoutingModule { }
