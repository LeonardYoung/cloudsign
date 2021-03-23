import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})




export class SignupPage implements OnInit {
  signup = {
    phone: '', //手机号
    identity: 'student',//学生、老师
    userNo: null, //学号、工号
    password: '',
    confirmPassword: '',
    code:null,
  }

  constructor() { }

  ngOnInit() {
  }

}
