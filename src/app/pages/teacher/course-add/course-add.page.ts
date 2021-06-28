import { Router } from '@angular/router';
import { MeService } from './../../me/services/me.service';
import { CourseInfo } from './../vo/course-info';
import { TeacherService } from './../service/teacher.service';
import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.page.html',
  styleUrls: ['./course-add.page.scss'],
})

export class CourseAddPage implements OnInit, ViewWillEnter {


  courseAddVo: CourseInfo = {};
  schoolName: null
  collegeName : null
  majorName : null

  finish:boolean= false
  newCourseId = ' '


  constructor(private teacherService: TeacherService,
    private toastctl: ToastController,
    private nav: NavController,
    private router: Router,
    private meService: MeService) { }

  ngOnInit() {
  }


  async onSubmit(form) {
    const toast = await this.toastctl.create({
      message: '',
      duration: 3000,
      position: 'top'
    });
    const that = this

    if (form.valid) {
      this.teacherService.courseAddReq(this.courseAddVo).then((resp:any) => {
        that.newCourseId = resp + ''
        that.finish = true

        // toast.message = '添加成功'
        // toast.present()
        // that.router.navigateByUrl('/tabs/teacher/list')
        
      }).catch((err) => {
        toast.message = err
        toast.present()
      })
    }
    else {
      console.log('表单错误,pass')
    }
  }
  onClickSchools() {
    this.meService.schoolsChoiceFrom = 'course'
    this.nav.navigateForward('/tabs/me/schools')
  }
  onClickBack(){
    this.router.navigateByUrl('/tabs/teacher/list')
  }
  ionViewWillEnter() {
    const schoolChoice = this.meService.getSchoolsChoice()
    this.finish = false
    if( schoolChoice !== undefined && schoolChoice !== null){
      this.schoolName = schoolChoice[0].name
      this.collegeName = schoolChoice[1].name
      this.majorName = schoolChoice[2].name
    }
    

  }


  dateFormat(fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
  }

}
