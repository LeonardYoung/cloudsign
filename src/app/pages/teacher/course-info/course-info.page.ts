import { MemberInfo } from './../vo/member-info';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseInfo } from '../vo/course-info';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.page.html',
  styleUrls: ['./course-info.page.scss'],
})
export class CourseInfoPage implements OnInit {

  courseInfo: CourseInfo = {
    courseName: '',
    courseCode: null,
    classRoom: '',
    startTime: '',
    endTime: '',
  };

  members: MemberInfo[] = [
    {
      name: '学生1',
      No: '200327100',
      gender: 'boy',
      school: '福州大学',
      depart: '数计学院',
      exp: 100,
    },
    {
      name: '学生2',
      No: '200327101',
      gender: 'boy',
      school: '福州大学',
      depart: '数计学院',
      exp: 222,
    },
    {
      name: '学生3',
      No: '200327102',
      gender: 'boy',
      school: '福州大学',
      depart: '数计学院',
      exp: 333,
    },
  ]


  constructor(private activeRouter: ActivatedRoute,private router:Router) {
    this.activeRouter.queryParams.subscribe(queryParsm => {
      this.courseInfo.courseName = queryParsm.name
      // this.id = parseInt(quertParsm.id);
      // this.category = this.categoryService.get(this.id);
    });
  }

  ngOnInit() {
  }
  /**
   * 点击“查看签到记录”按钮
   *
   * @memberof CourseInfoPage
   */
  onClickRecord(){
    this.router.navigate(['/tabs/teacher/signin-record'],{
      queryParams:{
        id:'test',
        name: this.courseInfo.courseName
      }
    })
  }

}
