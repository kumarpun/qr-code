import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';

declare var gtag;

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
    const navEndEvents = _router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    );
    navEndEvents.subscribe((event: NavigationEnd) => 
    {
        gtag('config', 'UA-162151893-2', 
        {
          'page_path': event.urlAfterRedirects
          
        });

    })
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
        duration: 3000,
        verticalPosition: 'top'  
      })
      this.document.location.href = 'https://doxy.me/drkumarpun';
    } else {
      this.snackbar.open('Credential do not match', 'close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: 'snackbar'
      })
    }
    // this.ngFormAdd.reset();
  }
}

