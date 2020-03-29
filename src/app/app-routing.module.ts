import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { LandPageComponent } from './land-page/land-page.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  {
    path: '',
    component: QrCodeComponent
  }, 
  {
    path: 'sign-up',
    component: LandPageComponent
  },
  {
    path: 'landpage',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
