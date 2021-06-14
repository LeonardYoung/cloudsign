import { LocalStorageService, USER_TYPE_KEY } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { CourseInfo } from './../vo/course-info';
import { Component, OnInit } from '@angular/core';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls: ['./course-list.page.scss'],
})
export class CourseListPage implements OnInit,ViewWillEnter {

  courseList: CourseInfo[] = []
  deleteFlag = false
  enable = false

  constructor(private router:Router,private teacherService:TeacherService,
    private localServe: LocalStorageService,
    private localStorage: LocalStorageService,
    private navCtl:NavController) { }
  ionViewWillEnter(): void {
    const userType = this.localServe.get(USER_TYPE_KEY,{}) 
     if(userType == 4){
       this.enable = false
       return
     }else{
       this.enable = true
     }
    const that = this
    this.teacherService.courseListGet().then((data)=>{
      that.courseList = <any>data
    })
  }

  ngOnInit() {
  }
  /**
   * 监听编辑按钮
   *
   * @memberof CourseListPage
   */
  onClickEdit() {
    this.deleteFlag = true;
  }
  onClickAdd(){
    if(this.enable)
      this.navCtl.navigateForward('/tabs/teacher/add')

  }
  /**
   * 监听完成按钮
   *
   * @memberof CourseListPage
   */
  onClickFinish(){
    this.deleteFlag = false;
  }
  /**
   * 监听“查看”按钮
   *
   * @param {*} course 点击的班课
   * @memberof CourseListPage
   */
  onClickCourse(course: CourseInfo){
    console.log(course);
    this.router.navigate(['/tabs/teacher/info'],{
      queryParams:{
        id:course.cid
      }
    })
  }
  /**
   * 监听删除按钮
   *
   * @param {*} course 选中的班课
   * @memberof CourseListPage
   */
  onDeleteCourse(course){
    console.log(course);
    const that = this
    this.teacherService.courseDelete(course.cid).then(()=>{
      that.teacherService.courseListGet().then((data)=>{
        that.courseList = <any>data
      })
    }).catch((err)=>{
      console.log(err)
    })
  }

}
