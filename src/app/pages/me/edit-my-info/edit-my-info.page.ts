import { PersonalInfoVo } from './../vo/personal-Info-vo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-my-info',
  templateUrl: './edit-my-info.page.html',
  styleUrls: ['./edit-my-info.page.scss'],
})
export class EditMyInfoPage implements OnInit {

  pInfo :PersonalInfoVo = {
    phone: '', //手机号
    identity: '',//学生、老师
    userNo: '', //学号、工号
    userName: '',


    gender: '',
    school: '',
    major: '',
    classNo:'',
  }

  constructor() { }

  ngOnInit() {
  }
  onClickFinish(){
    
  }

}
