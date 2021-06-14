import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin-main',
  templateUrl: './signin-main.page.html',
  styleUrls: ['./signin-main.page.scss'],
})
export class SigninMainPage implements OnInit {

  constructor(private navCrl:NavController) { }

  ngOnInit() {
  }
  onClickOneKey(){
    this.navCrl.navigateForward("/tabs/teacher/action/onekey")
  }
  onClickGesture(){
    this.navCrl.navigateForward("/tabs/teacher/action/gesture")
  }

}
