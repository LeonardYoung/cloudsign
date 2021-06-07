import { MemberInfo } from './../vo/member-info';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseInfo } from '../vo/course-info';

@Component({
  selector: 'app-signin-record',
  templateUrl: './signin-record.page.html',
  styleUrls: ['./signin-record.page.scss'],
})
export class SigninRecordPage implements OnInit {

  courseInfo: CourseInfo = {};

  absenceList: MemberInfo[] = [
    {
      name: '学生1',
      No: '200327100',
      gender: 'boy',
      school: '福州大学',
      depart: '数计学院',
      totalExp: 400,
      actualExp: 300,
      level: '优秀'
    },
    {
      name: '学生2',
      No: '200327100',
      gender: 'boy',
      school: '福州大学',
      depart: '数计学院',
      totalExp: 400,
      actualExp: 300,
      level: '优秀'
    },
  ]
  lateList: MemberInfo[] = [
    {
      name: '学生1',
      No: '200327100',
      gender: 'boy',
      school: '福州大学',
      depart: '数计学院',
      totalExp: 400,
      actualExp: 300,
      level: '优秀'
    },
    {
      name: '学生2',
      No: '200327100',
      gender: 'boy',
      school: '福州大学',
      depart: '数计学院',
      totalExp: 400,
      actualExp: 300,
      level: '优秀'
    },
  ]
  normalList: MemberInfo[] = [
    {
      name: '学生1',
      No: '200327100',
      gender: 'boy',
      school: '福州大学',
      depart: '数计学院',
      totalExp: 400,
      actualExp: 300,
      level: '优秀'
    },
    {
      name: '学生2',
      No: '200327100',
      gender: 'boy',
      school: '福州大学',
      depart: '数计学院',
      totalExp: 400,
      actualExp: 300,
      level: '优秀'
    },
  ]

  constructor(private activeRouter: ActivatedRoute) {
    this.activeRouter.queryParams.subscribe(queryParsm => {
      this.courseInfo.coursename = queryParsm.name
      // this.id = parseInt(quertParsm.id);
      // this.category = this.categoryService.get(this.id);
    });
  }

  ngOnInit() {
  }

}
