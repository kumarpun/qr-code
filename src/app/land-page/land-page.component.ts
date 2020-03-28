import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from '../models/user';

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

  constructor(
    private cookie: CookieService ,
    public fb: FormBuilder
  ) { 
    this.Obj = new User();
    this.createForm();
    this.addForm();
   }

   createForm() {
    this.ngForm = this.fb.group({
      userName: [""],
      phoneNumber: [""],
      email: [""]
    });
   }
   addForm() {
    this.ngFormAdd = this.fb.group({
      userName: [""],
      phoneNumber: [""],
      email: [""]
    });
   }

  ngOnInit() {
    this.ngForm = new FormGroup({
      userName: new FormControl(this.cookie.get('userName')),
      email: new FormControl(this.cookie.get('email')),
      phoneNumber: new FormControl(this.cookie.get('phoneNumber'))
    })
  }
  
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
    this.cookie.set('userName', this.Obj.userName, 365);
    this.cookie.set('phoneNumber', this.Obj.phoneNumber);
    this.cookie.set('email', this.Obj.email);
    console.log(this.Obj.userName);
    console.log(this.Obj.phoneNumber);
    // this.ngFormAdd.reset();
  }
}
