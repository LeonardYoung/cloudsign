import { Router } from '@angular/router';
import { CourseInfo } from './../vo/course-info';
import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls: ['./course-list.page.scss'],
})
export class CourseListPage implements OnInit,ViewWillEnter {

  courseList: CourseInfo[] = [
    // {
    //   courseName: '课1',
    //   courseCode: 123456,
    //   classRoom: '东3-101',
    //   startTime: '13:00',
    //   endTime: '18:00',
    // },
    // {
    //   courseName: '课2',
    //   courseCode: 123456,
    //   classRoom: '东3-101',
    //   startTime: '13:00',
    //   endTime: '18:00',
    // },
    // {
    //   courseName: '课3',
    //   courseCode: 123456,
    //   classRoom: '东3-101',
    //   startTime: '13:00',
    //   endTime: '18:00',
    // },
  ]
  deleteFlag = false

  constructor(private router:Router,private teacherService:TeacherService) { }
  ionViewWillEnter(): void {
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
        id:'test',
        name:course.coursename
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
