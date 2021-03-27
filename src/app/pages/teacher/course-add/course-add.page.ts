import { CourseInfo } from './../vo/course-info';
import { TeacherService } from './../service/teacher.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.page.html',
  styleUrls: ['./course-add.page.scss'],
})
export class CourseAddPage implements OnInit {

  courseAddVo: CourseInfo = {
    courseName: '',
    courseCode: null,
    classRoom: '',
    startTime: '',
    endTime: '',
  };
  stime:string = ''
  etime:string = ''

  constructor(private teacherService:TeacherService) { }

  ngOnInit() {
  }
  sTimeChange(){
    const dTime = new Date(Date.parse(this.stime));
    this.courseAddVo.startTime = this.dateFormat("HH:MM",dTime)
  }

  eTimeChange(){

    const dTime = new Date(Date.parse(this.etime));
    this.courseAddVo.endTime = this.dateFormat("HH:MM",dTime)
  }

  onSubmit(form){
    console.log(form)
    if(form.valid){
      this.teacherService.courseAddReq();
    }
    else{
      console.log('表单错误,pass')
    }
  }


  dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

}
