import { USER_TYPE_KEY } from './../../../shared/services/local-storage.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { StudentService } from './../service/student.service';
import { CourseDetail } from './../course-detail/dto/courseDetail';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseInfo } from '../../teacher/vo/course-info';
import { ViewWillEnter, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-stu-course-list',
  templateUrl: './stu-course-list.page.html',
  styleUrls: ['./stu-course-list.page.scss'],
})
export class StuCourseListPage implements OnInit,ViewWillEnter {
  

  courseList: CourseDetail[] = []
  deleteFlag = false
  enable = false
  constructor(private router:Router,
    private stuServer:StudentService,
    private localServe: LocalStorageService,
    private navCtl:NavController,
    private toastCtl: ToastController) {
   }
   ionViewWillEnter():void{
     const userType = this.localServe.get(USER_TYPE_KEY,{}) 
     if(userType == 3){
       this.enable = false
       return
     }else{
       this.enable = true
     }

     const that =this
     this.stuServer.getCourseOfStu().then((resp:any)=>{
       console.log(resp)
      that.courseList = resp
     })
    
   }

  ngOnInit() {
  }

  onClickJoin(){
    if(this.enable)
      this.navCtl.navigateForward('/tabs/student/join')
  }

  /**
   * 监听编辑按钮
   *
   * @memberof CourseListPage
   */
   onClickEdit() {
    if(this.enable)
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
   async onClickSignin(course: CourseInfo){
    console.log(course);
    const toast = await this.toastCtl.create({
      duration: 1000,
      position: 'top'
    });
    this.stuServer.getCheckTasks(course.cid).then((resp:any)=>{
      let url = ''
      if(resp.type == 1){
        url = '/tabs/student/onekey'
      }
      else{
        url = '/tabs/student/gesture'
      }
      this.router.navigate([url],{
        queryParams:{
          cid:course.cid,
          id:resp.id
        }
      })
    }).catch((err)=>{
      toast.message = '没有签到任务'
      toast.present()
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
    this.stuServer.unjoinCourse(course.cid).then(()=>{
      for(let i = 0;i < this.courseList.length;++i){
        if(this.courseList[i].cid == course.cid){
          this.courseList.splice(i,1)
          break
        }
      }
    }).catch((err)=>{
      console.log('失败')
    })
  }

  

}
