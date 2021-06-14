import { TeacherService } from './../service/teacher.service';
import { ViewWillEnter } from '@ionic/angular';
import { MemberInfo } from './../vo/member-info';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseInfo } from '../vo/course-info';

@Component({
  selector: 'app-signin-record',
  templateUrl: './signin-record.page.html',
  styleUrls: ['./signin-record.page.scss'],
})
export class SigninRecordPage implements OnInit,ViewWillEnter {

  courseInfo: CourseInfo = {};
  ionViewWillEnter(){
    const that = this
    this.teaService.getCheckResult().then((resp:any)=>{
      that.stuCheckList = resp
    }).catch((err)=>{
      if(err == 0){
        console.log('请先发起签到')
      }
    })
  }

  stuCheckList: any[] = []
  // lateList: MemberInfo[] = []
  // normalList: MemberInfo[] = [  ]

  constructor(private teaService: TeacherService) {

  }

  ngOnInit() {
  }

}
