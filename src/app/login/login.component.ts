import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    // this.addForm();
   }

   createForm() {
    this.ngForm = this.fb.group({
      email: [""],
      password: [""],
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
      email: new FormControl(this.cookie.get('email')),
      password: new FormControl(this.cookie.get('password'))
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
    this.cookie.set('phoneNumber', this.Obj.phoneNumber, 365);
    this.cookie.set('email', this.Obj.email, 365);
    this.cookie.set('password', this.Obj.password, 365);
    this.cookie.set('confirmPassword', this.Obj.confirmPassword, 365);
    console.log(this.Obj.userName);
    console.log(this.Obj.phoneNumber);
    location.reload();
    // this.ngFormAdd.reset();
  }
}

