import { TeacherService } from './../service/teacher.service';
import { ViewWillEnter, ToastController } from '@ionic/angular';
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
    }).catch(async (err)=>{
      if(err == 0){
        console.log('请先发起签到')
        const toast = await that.toastCtl.create({
          duration: 1000,
          position: 'top'
        });
        toast.message = '请先发起签到'
        toast.present()
      }
    })
  }

  stuCheckList: any[] = []
  // lateList: MemberInfo[] = []
  // normalList: MemberInfo[] = [  ]

  constructor(private teaService: TeacherService,private toastCtl:ToastController) {

  }

  ngOnInit() {
  }

}
