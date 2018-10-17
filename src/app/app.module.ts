import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { AppRoutingModule } from './app-routing.module';
// import { HttpClientModule } from '@angular/common/http';
import{HttpService} from '../../src/app/services/http.service';

/**NgModule can export functionality for use by other NgModules and import public functionality from other NgModules */
@NgModule({
  /**The declarations array is to add declarables, which are components, directives  to this particular module. */
  declarations: [
    AppComponent,
    AdminloginComponent,
    AdmindashboardComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // HttpClientModule
  ],
  providers: [HttpService],
  /**the root component that Angular creates and inserts into the index.html host web page */
  /**used to intialize and launch the app,it helps in identifying apps components */
  bootstrap: [AppComponent]
})
export class AppModule { }
