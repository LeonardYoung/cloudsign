import { ToastController } from '@ionic/angular';
import { StudentService } from './../service/student.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseInfo } from '../../teacher/vo/course-info';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-join-course',
  templateUrl: './join-course.page.html',
  styleUrls: ['./join-course.page.scss'],
})
export class JoinCoursePage implements OnInit {

  cid: string = ''
  courseList: CourseInfo[] = []
  constructor(private router: Router,
    private stuService: StudentService,
    private barcodeScanner: BarcodeScanner,
    private toastCtl:ToastController) {

  }

  ngOnInit() {
    // const that = this
    // this.stuService.getAllCourse().then((resp: any) => {
    //   that.courseList = resp.pageData
    // })
  }

  /**
   * 监听“查看”按钮
   *
   * @param {*} course 点击的班课
   * @memberof CourseListPage
   */
  onClickCourse(course: CourseInfo) {
    this.router.navigate(['/tabs/student/detail'], {
      queryParams: {
        id: course.cid,
        from: '1'
      }
    })
  }
  /**
   *扫描二维码
   *
   * @memberof JoinCoursePage
   */
  async onClickQrCode() {
    const toast = await this.toastCtl.create({
      duration: 1000,
      position: 'top'
    });
    const that =this
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data:', barcodeData);

      this.stuService.getCourseDetail(barcodeData.text).then((resp)=>{
        that.courseList = [
          resp
        ]
      }).catch((err)=>{
        toast.message = '班课不存在'
        toast.present()
      })
    }).catch(err => {
      
      toast.message = '无法打开相机'
      toast.present()
    });
  }

  /**
   *查找班课号
   *
   * @memberof JoinCoursePage
   */
  async onClickConfirm(){
    const toast = await this.toastCtl.create({
      duration: 1000,
      position: 'top'
    });
    const that =this
    this.stuService.getCourseDetail(this.cid).then((resp)=>{
      that.courseList = [
        resp
      ]
    }).catch((err)=>{
      toast.message = '班课不存在'
      toast.present()
    })
  }

}
