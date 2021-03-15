import { ForgotPasswardPage } from './forgot-passward/forgot-passward.page';
import { SignupPage } from './signup/signup.page';
import { LoginPage } from './login/login.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassportPageRoutingModule } from './passport-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassportPageRoutingModule,
  ],
  declarations: [
    LoginPage,
    SignupPage,
    ForgotPasswardPage
  ]
})
export class PassportPageModule {}
