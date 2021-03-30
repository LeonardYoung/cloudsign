import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../../../shared/shared.module';
import { SigninOneKeyPage } from './signin-one-key/signin-one-key.page';
import { SigninMainPage } from './signin-main/signin-main.page';
import { SigninGesturePage } from './signin-gesture/signin-gesture.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninActionRoutingModule } from './signin-action-routing.module';


@NgModule({
  declarations: [
    SigninGesturePage,
    SigninMainPage,
    SigninOneKeyPage,
    
  ],
  imports: [
    CommonModule,
    SigninActionRoutingModule,
    SharedModule,
    IonicModule
  ]
})
export class SigninActionModule { }
