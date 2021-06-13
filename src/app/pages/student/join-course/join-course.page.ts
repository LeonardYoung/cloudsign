import { StudentService } from './../service/student.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseInfo } from '../../teacher/vo/course-info';

@Component({
  selector: 'app-join-course',
  templateUrl: './join-course.page.html',
  styleUrls: ['./join-course.page.scss'],
})
export class JoinCoursePage implements OnInit {

  cid:string = ''
  courseList: CourseInfo[] = []
  constructor(private router:Router, private stuService: StudentService) {
    
   }

  ngOnInit() {
    const that = this
    this.stuService.getAllCourse().then((resp:any)=>{
      that.courseList = resp.pageData
    })
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
        id:course.cid,
        from:'1'
      }
    })
  }

}
