import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-forgot-passward',
  templateUrl: './forgot-passward.page.html',
  styleUrls: ['./forgot-passward.page.scss'],
})
export class ForgotPasswardPage implements OnInit {

  phone: string = '';
  code: string = '';

  password:string = '';
  confirmPassword:string = '';
  constructor() { }
  @ViewChild('signupSlides', { static: true }) signupSlides: IonSlides;

  ngOnInit() {
  }
  onNext(){
    this.signupSlides.slideNext()
  }
  onConfirm(){
    
  }

}
