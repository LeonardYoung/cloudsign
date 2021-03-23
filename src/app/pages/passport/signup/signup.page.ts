import { signupVO } from './signupvo';
import { PassportServiceService } from './../services/passport-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})




export class SignupPage implements OnInit {
  signup: signupVO = {
    phone: '', //手机号
    identity: 'student',//学生、老师
    userNo: null, //学号、工号
    password: '',
    userName: '',
  }
  confirmPassword: string = ''
  code: string = ''

  constructor(private passportServicec: PassportServiceService) { }
  @ViewChild('signupSlides', { static: true }) signupSlides: IonSlides;

  ngOnInit() {
  }
  onNext() {
    this.signupSlides.slideNext()
  }
  getCode() {
    this.passportServicec.sendCodeRequest(this.signup.phone)
  }
  onSubmit() {
    this.passportServicec.signupRequest(this.signup)
    this.signupSlides.slideNext()
  }

}
