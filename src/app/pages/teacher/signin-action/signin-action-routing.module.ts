import { SigninGesturePage } from './signin-gesture/signin-gesture.page';
import { SigninOneKeyPage } from './signin-one-key/signin-one-key.page';
import { SigninMainPage } from './signin-main/signin-main.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'main',
    component: SigninMainPage 
  },
  {
    path:'onekey',
    component: SigninOneKeyPage
  },
  {
    path:'gesture',
    component: SigninGesturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninActionRoutingModule { }
