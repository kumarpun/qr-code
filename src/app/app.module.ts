import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { LandPageComponent } from './land-page/land-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CustomMaterialModule } from './core/material/material.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AngalyticsComponent } from './angalytics/angalytics.component';

@NgModule({
  declarations: [
    AppComponent,
    QrCodeComponent,
    LandPageComponent,
    LoginComponent,
    DashboardComponent,
    AngalyticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    CustomMaterialModule,
    HttpClientModule
    
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
