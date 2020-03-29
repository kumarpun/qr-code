import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material';
import { DOCUMENT } from '@angular/common';

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
    public fb: FormBuilder,
    private _router: Router,
    public snackbar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document
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
    if(this.cookie.get('email') === this.ngForm.get('email').value &&
     this.cookie.get('password') === this.ngForm.get('password').value) {
      console.log('success');
      this.snackbar.open('Successfully login', 'Close', {
        duration: 3000
      })
      this.document.location.href = 'https://doxy.me/drkumarpun';
    } else {
      this.snackbar.open('Credential do not match', 'close', {
        duration: 3000
      })
    }
    // this.ngFormAdd.reset();
  }
}

