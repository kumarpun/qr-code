import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { LandPageComponent } from './land-page/land-page.component';


const routes: Routes = [

  {
    path: '',
    component: QrCodeComponent
  }, 
  {
    path: 'landpage',
    component: LandPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
