import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material';
import {HttpClient} from '@angular/common/http';
import { EncrDecrService } from '../services/encrDecrService';

export const passwordMatchValidator: ValidatorFn = (formGroup: FormControl): ValidationErrors | null => {
  return formGroup.get('password').value ===  formGroup.get('confirmPassword').value ?
  null: { 'passwordMismatch': true};
}


@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css']
})

export class LandPageComponent implements OnInit {

  Obj: User;  
  ngForm: FormGroup;
  ngFormAdd: FormGroup;
  formdata;
  userName;
  longitude: number;
  latitude: number;
  ipAddress: 'any';

  constructor(
    private cookie: CookieService ,
    public fb: FormBuilder,
    public router: Router,
    public snackbar: MatSnackBar,
    private http: HttpClient,
    private EncrDecr: EncrDecrService
  ) { 
    this.Obj = new User();
    this.createForm();
    // this.addForm();
   }

   createForm() {
    this.ngForm = this.fb.group({
      userName: [""],
      phoneNumber: [""],
      email: [""],
    });
   }
  //  addForm() {
  //   this.ngFormAdd = this.fb.group({
  //     userName: [""],
  //     phoneNumber: [""],
  //     email: [""],
  //     password: [""],
  //     confirmPassword: [""]
  //   });
  //  }

  ngOnInit() {
    this.ngForm = new FormGroup({
      userName: new FormControl(this.cookie.get('userName')),
      email: new FormControl(this.cookie.get('email')),
      phoneNumber: new FormControl(this.cookie.get('phoneNumber'))
    })
    this.ngFormAdd = new FormGroup({
      userName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: passwordMatchValidator })

    this.getIPAddress();
    this.getBrowserLocation();

    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.Obj.password);
    console.log(this.cookie.get('password'));
    var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);

    console.log('Encrypted :' + encrypted);
    console.log('Decrypted :' + decrypted);
  }
  getIPAddress() {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    }) 
  }

  getBrowserLocation() {
    this.http.get("http://ip-api.com/json").subscribe((res:any) => {
      this.latitude = res.lat;
      this.longitude = res.lon;
      console.log(this.longitude);
      console.log(this.latitude);
    })
  }
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const longtitud = position.coords.longitude;
  //       const latitud = position.coords.latitude;
  //       this.longitude   = longtitud;
  //       this.latitude = latitud;
  //       console.log(longtitud);
  //       console.log(this.latitude);
  //       });
  // } else {
  //    console.log("No support for geolocation")
  // }
  
  capture() {
    console.log('capturing..');
    this.cookie.set("userid", "234");
    this.cookie.set("usertype", "internal");
    this.cookie.set('user', 'QRCODE');
    this.cookie.set('useremail', 'qr@gmail.com');

    // get cookie
    alert("user with name and email ("+ this.cookie.get("user") + ", "+ this.cookie.get("useremail") + ") successfully captured");
  }

  onsubmit(): void {

    var storeArray = [this.Obj.userName, this.Obj.phoneNumber, this.Obj.email, 
                      this.EncrDecr.set('123456$#@$^@1ERF', this.Obj.password),
                      this.ipAddress, JSON.stringify(this.longitude),
                      JSON.stringify(this.latitude)];
    var newStr = storeArray;
    var userinfomation = JSON.stringify(newStr);
    this.cookie.set('userinfo', userinfomation, 365);
     console.log(userinfomation);   

    // this.cookie.set('userName', this.Obj.userName, 365);
    // this.cookie.set('phoneNumber', this.Obj.phoneNumber, 365);
    // this.cookie.set('email', this.Obj.email, 365);
    // this.cookie.set('password', this.EncrDecr.set('123456$#@$^@1ERF', this.Obj.password), 365);
    // this.cookie.set('confirmPassword', this.Obj.confirmPassword, 365);
    // this.cookie.set('longitude', JSON.stringify(this.longitude), 365);
    // this.cookie.set('latitude', JSON.stringify(this.latitude), 365);
    // this.cookie.set('ipAddress', this.ipAddress, 365);
    // console.log(this.Obj.userName);
    // console.log(this.Obj.phoneNumber);
    this.snackbar.open('Successfully register', 'Close', {
      duration: 3000,
      verticalPosition: 'top'  
    })
    this.router.navigate(['/landpage']);
    // this.ngFormAdd.reset();
  }
}
