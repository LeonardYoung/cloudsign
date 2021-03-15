import { ForgotPasswardPage } from './forgot-passward/forgot-passward.page';
import { SignupPage } from './signup/signup.page';
import { LoginPage } from './login/login.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: 'login',
    component:LoginPage
  },
  {
    path: 'signup',
    component:SignupPage
  },
  {
    path: 'forgot-passward',
    component:ForgotPasswardPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassportPageRoutingModule {}
