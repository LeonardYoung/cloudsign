import { CourseInfo } from './../vo/course-info';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls: ['./course-list.page.scss'],
})
export class CourseListPage implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }
  onClickEdit() {
    this.deleteFlag = true;
  }
  onClickFinish(){
    this.deleteFlag = false;
  }
  onClickCourse(course){
    console.log(course);
  }
  onDeleteCourse(course){
    console.log(course);
  }

}
