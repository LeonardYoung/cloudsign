import { StudentService } from './../service/student.service';
import { CourseDetail } from './../course-detail/dto/courseDetail';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseInfo } from '../../teacher/vo/course-info';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-stu-course-list',
  templateUrl: './stu-course-list.page.html',
  styleUrls: ['./stu-course-list.page.scss'],
})
export class StuCourseListPage implements OnInit,ViewWillEnter {
  

  courseList: CourseDetail[] = []
  deleteFlag = false
  constructor(private router:Router,private stuServer:StudentService) {
   }
   ionViewWillEnter():void{
     const that =this
     this.stuServer.getCourseOfStu().then((resp:any)=>{
       console.log(resp)
      that.courseList = resp
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
    console.log('-----',course);
    this.router.navigate(['/tabs/student/detail'],{
      queryParams:{
        id:course.cid,
        from:'0'
      }
    })
  }
  /**
   * 监听“签到”按钮
   *
   * @param {*} course 点击的班课
   * @memberof CourseListPage
   */
   onClickSignin(course: CourseInfo){
    console.log(course);
    this.router.navigate(['/tabs/student/onekey'],{
      queryParams:{
        id:course.cid,
        name:course.coursename
      }
    })
  }

  /**
   * 监听“删除”按钮
   *
   * @param {*} course 点击的班课
   * @memberof CourseListPage
   */
   onClickDelete(course: CourseInfo){
    console.log(course);
    
  }

  

}
