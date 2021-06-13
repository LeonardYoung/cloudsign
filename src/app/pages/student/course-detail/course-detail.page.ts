import { ToastController, NavController } from '@ionic/angular';
import { CourseDetail } from './dto/courseDetail';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {

  cid: string = ''
  course: CourseDetail = {}
  from: '0'
  constructor(private activeRouter: ActivatedRoute, private stuService: StudentService, private toastCtl: ToastController
    , private navCtl: NavController) {
    const that = this
    this.activeRouter.queryParams.subscribe(queryParsm => {
      that.cid = queryParsm.id
      that.from = queryParsm.from

      that.stuService.getCourseDetail(that.cid).then((resp: any) => {
        that.course = resp
      })

    });
  }

  ngOnInit() {
  }
  /**
   * 监听“加入班课”按钮
   *
   * @memberof CourseDetailPage
   */
  async onClickJoin() {
    const toast = await this.toastCtl.create({
      duration: 1000,
      position: 'top'
    });
    const that = this
    this.stuService.joinCourse(this.cid).then(() => {
      toast.message = '添加成功'
      toast.present()
      that.navCtl.back()
    })
  }

}
