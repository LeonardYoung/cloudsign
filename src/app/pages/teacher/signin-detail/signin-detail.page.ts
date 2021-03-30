import { Component, OnInit } from '@angular/core';
import { signinDetail } from '../vo/signin-detail';

@Component({
  selector: 'app-signin-detail',
  templateUrl: './signin-detail.page.html',
  styleUrls: ['./signin-detail.page.scss'],
})
export class SigninDetailPage implements OnInit {

  detail: signinDetail[]= [
    {
      date: '2021/3/30',
      type: '手势签到',
      time: '9:00',
      status: '已签到',
    },
    {
      date: '2021/4/30',
      type: '手势签到',
      time: '10:00',
      status: '缺勤',
    },
    {
      date: '2021/5/30',
      type: '手势签到',
      time: '9:00',
      status: '已签到',
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
