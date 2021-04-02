import { CourseInfo } from './../../../pages/teacher/vo/course-info';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent implements OnInit {
  @Input("courseInfo") courseInfo: CourseInfo
  @Input("haveSigninBtn") haveSigninBtn: number
  @Input("status") deleteFlag: boolean = false

  @Output() private infoClick = new EventEmitter<CourseInfo>()
  @Output() private signinClick = new EventEmitter<CourseInfo>()
  @Output() private deleteClick = new EventEmitter<CourseInfo>()

  constructor() { }

  ngOnInit() {
    // console.log(this.courseInfo)
    // console.log(this.haveSigninBtn)
  }

  /**
   * 监听“查看”按钮，发送给父组件
   *
   * @param {*} course 点击的班课
   * @memberof CourseListPage
   */
   onClickCourse(course: CourseInfo){
    this.infoClick.emit(course)
    
  }
  /**
   * 监听“签到”按钮，发送给父组件
   *
   * @param {*} course 点击的班课
   * @memberof CourseListPage
   */
   onClickSignin(course: CourseInfo){
    this.signinClick.emit(course)
  }
  /**
   * 监听“删除”按钮，发送给父组件
   *
   * @param {*} course 点击的班课
   * @memberof CourseListPage
   */
   onDeleteCourse(course: CourseInfo){
    this.deleteClick.emit(course)
  }

  

}
