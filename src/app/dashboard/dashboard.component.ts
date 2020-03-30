import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],

})
export class DashboardComponent implements OnInit {

  Obj: User;  
  ipAddress: 'any';
  longitude: number;
  latitude: number;
  constructor(
    private http: HttpClient,
    private cookie: CookieService ,
    ) { 
      this.http.get;
      this.Obj = new User();
    }

  ngOnInit() {   
    this.getIPAddress();
    this.getBrowserLocation();
  }

  getIPAddress() {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    }) 
  }

  getBrowserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longtitud = position.coords.longitude;
        const latitud = position.coords.latitude;
        this.longitude   = longtitud;
        this.latitude = latitud;
        });
  } else {
     console.log("No support for geolocation")
  }

  }
  getLocation(): void{
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition((position)=>{
    //       const longitude = position.coords.longitude;
    //       const latitude = position.coords.latitude;
   
          this.cookie.set('lon', JSON.stringify(this.longitude));
          this.cookie.set('lat', JSON.stringify(this.latitude));
          this.cookie.set('ipAddress', this.ipAddress);
    //       });
    // } else {
    //    console.log("No support for geolocation")
    // }
  }

}
