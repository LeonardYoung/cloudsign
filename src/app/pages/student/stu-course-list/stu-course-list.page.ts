import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseInfo } from '../../teacher/vo/course-info';

@Component({
  selector: 'app-stu-course-list',
  templateUrl: './stu-course-list.page.html',
  styleUrls: ['./stu-course-list.page.scss'],
})
export class StuCourseListPage implements OnInit {

  testData: CourseInfo[] = [
    {
      courseName: '课1',
      courseCode: 123456,
      classRoom: '东3-101',
      startTime: '13:00',
      endTime: '18:00',
    },
    {
      courseName: '课2',
      courseCode: 123456,
      classRoom: '东3-101',
      startTime: '13:00',
      endTime: '18:00',
    },
    {
      courseName: '课3',
      courseCode: 123456,
      classRoom: '东3-101',
      startTime: '13:00',
      endTime: '18:00',
    },
  ]
  deleteFlag = false
  constructor(private router:Router) { }

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
    this.router.navigate(['/tabs/student/detail'],{
      queryParams:{
        id:'test',
        name:course.courseName
      }
    })
  }

}
