import { ViewWillEnter } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../service/teacher.service';
import { signinDetail } from '../vo/signin-detail';

@Component({
  selector: 'app-signin-detail',
  templateUrl: './signin-detail.page.html',
  styleUrls: ['./signin-detail.page.scss'],
})
export class SigninDetailPage implements OnInit ,ViewWillEnter{

  detail: any[]= [
    // {
    //   date: '2021/3/30',
    //   type: '手势签到',
    //   time: '9:00',
    //   status: '已签到',
    // },
    // {
    //   date: '2021/4/30',
    //   type: '手势签到',
    //   time: '10:00',
    //   status: '缺勤',
    // },
    // {
    //   date: '2021/5/30',
    //   type: '手势签到',
    //   time: '9:00',
    //   status: '已签到',
    // }
  ]
  constructor(private teaService:TeacherService) { }

  ionViewWillEnter(){
    this.teaService.getCheckLog().then((resp:any)=>{
      this.detail = resp
    }).catch((err)=>{
      console.log('err')
    })
  }

  ngOnInit() {
  }

}
