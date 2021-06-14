import { USER_INFO_KEY } from './../../../shared/services/local-storage.service';
import { CourseDetail } from './../course-detail/dto/courseDetail';
import { MeService } from './../../me/services/me.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  httpOptions = { //http请求头
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })//请求头进行转格式，防止出现415错误
  };
  curTask:any = {}
  constructor(private http: HttpClient, private comService: CommonService, private localService: LocalStorageService
        , private meService:MeService) { }

  getAllCourse(){
    const api = this.comService.transferUrl('/course/list')
    const that = this;
    const params = new HttpParams().set('sch', '10386').set('col','1038601').set('maj','80701')
                  .set('page','1').set('size','100')
    return new Promise<void>(function (resolve, reject) {
      that.http.get(api, { params }).subscribe((response: any) => {
        if (response.code == 2000) {
          resolve(response.data)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('参数错误')
      })
    })
  }
  getCurTask(){
    return this.curTask
  }
  getCourseDetail(cid:string){
    const api = this.comService.transferUrl('/course')
    const that = this;
    const params = new HttpParams().set('cid', cid)
    return new Promise<CourseDetail>(function (resolve, reject) {
      that.http.get(api, { params }).subscribe(async (response: any) => {
        if (response.code == 2000) {
          let course: CourseDetail = response.data
          course.school_name = <string>await that.meService.getSchoolNameByCode(course.school_code)
          course.college_name = <string>await that.meService.getCollegeNameByCode(course.school_code, course.college_code)
          course.major_name = <string>await that.meService.getMajorNameByCode(course.school_code, course.college_code,course.major_code)

          const teainfo = await that.meService.getTeacherById(course.teacher_tid)
          course.teacher_name = teainfo.name

          resolve(course)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('参数错误')
      })
    })
  }
  joinCourse(cid:string){
    const pinfo = this.localService.get(USER_INFO_KEY,{})
    const api = this.comService.transferUrl('/course/select')
    const that = this;
    const params = new HttpParams().set('sid', pinfo.sid).set('cid',cid)
    return new Promise<void>(function (resolve, reject) {
      that.http.get(api, { params }).subscribe((response: any) => {
        if (response.code == 2004) {
          resolve(response.data)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('参数错误')
      })
    })
  }
  unjoinCourse(cid:string){
    const pinfo = this.localService.get(USER_INFO_KEY,{})
    const api = this.comService.transferUrl('/course/unselect')
    const that = this;
    const params = new HttpParams().set('sid', pinfo.sid).set('cid',cid)
    return new Promise<void>(function (resolve, reject) {
      that.http.get(api, { params }).subscribe((response: any) => {
        if (response.code == 2005) {
          resolve(response.data)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('参数错误')
      })
    })
  }
  getCourseOfStu(){
    const pinfo = this.localService.get(USER_INFO_KEY,{})
    const api = this.comService.transferUrl('/course/s')
    const that = this;
    const params = new HttpParams().set('sid', pinfo.sid)
    return new Promise<void>(function (resolve, reject) {
      that.http.get(api, { params }).subscribe((response: any) => {
        if (response.code == 2000) {
          resolve(response.data)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('参数错误')
      })
    })
  }
  /**
   * 获取签到任务
   *
   * @param {string} cid
   * @return {*} 
   * @memberof StudentService
   */
  getCheckTasks(cid:string){
    const api = this.comService.transferUrl('/check')
    const that = this;
    const params = new HttpParams().set('cid', cid)
    return new Promise<void>(function (resolve, reject) {
      that.http.get(api, { params }).subscribe((response: any) => {
        if (response.code == 2000) {
          that.curTask = response.data
          resolve(response.data)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('参数错误')
      })
    })
  }
  /**
   *学生签到
   *
   * @param {string} cid
   * @return {*} 
   * @memberof StudentService
   */
  CheckIn(cid:string){
    const api = this.comService.transferUrl('/check')
    const pinfo = this.localService.get(USER_INFO_KEY,{})

    const that = this;
    const params = {
      classId : cid,
      sid: pinfo.sid
    }
    return new Promise<void>(function (resolve, reject) {
      that.http.post(api, params ).subscribe((response: any) => {
        if (response.code == 2007) {
          resolve(response.data)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('参数错误')
      })
    })
  }
}
