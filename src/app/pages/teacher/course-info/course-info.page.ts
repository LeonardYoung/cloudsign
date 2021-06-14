import { TeacherService } from './../service/teacher.service';
import { ViewWillEnter, NavController } from '@ionic/angular';
import { MemberInfo } from './../vo/member-info';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseInfo } from '../vo/course-info';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.page.html',
  styleUrls: ['./course-info.page.scss'],
})
export class CourseInfoPage implements OnInit, ViewWillEnter {

  courseInfo: CourseInfo = {};
  cid: string = null

  members: MemberInfo[] = [  ]


  constructor(private activeRouter: ActivatedRoute, private router: Router, private teaServer: TeacherService
    ,private navCtl:NavController) {
    const that = this
    this.activeRouter.queryParams.subscribe(queryParsm => {
      let cid = that.cid
      if(queryParsm.id !== null){
        cid = queryParsm.id
      }

      this.teaServer.getStuOfCourse(cid).then((resp: any) => {
        that.members = resp
      })
    });
  }
  ionViewWillEnter() {

  }

  ngOnInit() {
  }
  /**
   * 点击“查看签到记录”按钮
   *
   * @memberof CourseInfoPage
   */
  onClickRecord() {
    this.router.navigate(['/tabs/teacher/signin-record'], {
      queryParams: {
        id: 'test',
        name: this.courseInfo.coursename
      }
    })
  }
  onClickCheck(){
    this.navCtl.navigateForward('/tabs/teacher/action/main')
  }

}
