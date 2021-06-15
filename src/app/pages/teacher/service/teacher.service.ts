import { TaskDTO } from './../signin-action/dto/task';
import { MeService } from './../../me/services/me.service';
import { MemberInfo } from './../vo/member-info';
import { TOKEN_KEY } from './../../../shared/services/local-storage.service';
import { LocalStorageService, USER_INFO_KEY } from 'src/app/shared/services/local-storage.service';
import { CourseInfo } from './../vo/course-info';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  httpOptions = { //http请求头
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })//请求头进行转格式，防止出现415错误
  };
  curMembers: MemberInfo[] = []
  curSid: string = ''
  curCid: string = ''
  taskIdMap = new Map()
  constructor(private http: HttpClient, private comService: CommonService, 
    private localService: LocalStorageService,
    private meService: MeService) { }

  courseAddReq(course: CourseInfo) {
    const api = this.comService.transferUrl('/course')
    const that = this;

    const info: any = this.localService.get(USER_INFO_KEY, {})

    course.teacher_tid = info.tid
    course.school_code = info.schoolCode
    course.college_code = info.collegeCode
    course.major_code = info.majorCode

    return new Promise<void>(function (resolve, reject) {
      that.http.post(api, course, that.httpOptions).subscribe((response: any) => {
        if (response.code == 2004) {
          resolve(response.data)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('网络请求失败')
      })
    })

  }
  /**
   * 向后端获取教师的班课列表
   *
   * @return {*} 
   * @memberof TeacherService
   */
  courseListGet() {
    const api = this.comService.transferUrl('/course/t')
    const that = this;
    const info: any = this.localService.get(USER_INFO_KEY, {})
    const params = new HttpParams().set('tid', info.tid)
    return new Promise<void>(function (resolve, reject) {
      that.http.get(api, { params }).subscribe((response: any) => {
        if (response.code == 2000) {
          resolve(response.data)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('网络请求失败')
      })
    })
  }
  getHeader() {

    const token = this.localService.get(TOKEN_KEY, {})
    // let headers = new HttpHeaders();
    // headers.set('Content-Type','application/json')
    // headers.set('Authorization',token)
    // this.httpOptions = {
    //   headers
    // }
    // return this.httpOptions
    console.log(token)

    this.httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('token', token)

    };
    console.log(this.httpOptions)
    return this.httpOptions

  }

  /**
   *删除班课请求
   *
   * @param {string} cid
   * @return {*} 
   * @memberof TeacherService
   */
  courseDelete(cid: string) {
    const api = this.comService.transferUrl('/course/' + cid)
    const option = this.getHeader()
    const that = this;
    // console.log(option)
    return new Promise<void>(function (resolve, reject) {
      that.http.delete(api, option).subscribe((response: any) => {
        console.log(response)
        if (response.code == 2005) {
          resolve(response.data)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('网络请求失败')
      })
    })
  }

  /**
   *根据班课ID获取所有学生的信息
   *
   * @param {string} cid
   * @memberof TeacherService
   */
  getStuOfCourse(cid: string) {
    const api = this.comService.transferUrl('/course/c')
    const that = this;
    this.curCid = cid
    const params = new HttpParams().set('cid', cid)
    return new Promise<void>(function (resolve, reject) {
      that.http.get(api, { params }).subscribe((response: any) => {
        if (response.code == 2000) {
          resolve(response.data)
          that.curMembers = response.data
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('网络请求失败')
      })
    })
  }
  async getMemberBySid<MemberInfo>(sid: string) {
    this.curSid = sid
    for (const m of this.curMembers) {
      if (m.sid == sid) {
        m.school_name = <string>await this.meService.getSchoolNameByCode(m.school_code)
        m.college_name = <string>await this.meService.getCollegeNameByCode(m.school_code, m.college_code)
        m.major_name = <string>await this.meService.getMajorNameByCode(m.school_code, m.college_code, m.major_code)
        return m
      }
    }
  }
  /**
   *根据任务号和班课号,获取所有学生的签到状态
   *
   * @return {*} 
   * @memberof TeacherService
   */
   getCheckResult(){
    const api = this.comService.transferUrl('/check/result')
    const that = this;
    const tid = this.taskIdMap.get(this.curCid)
    return new Promise<void>(function (resolve, reject) {
      if(tid == null){
        reject(0)
        return
      }
      const params = new HttpParams().set('cid', that.curCid).set('tid',tid)
      that.http.get(api, { params }).subscribe((response: any) => {
        if (response.code == 2000) {
          resolve(response.data)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('网络请求失败')
      })
    })
  }
  /**
   *获取学生的签到明细
   *
   * @param {*} cid
   * @param {*} sid
   * @return {*} 
   * @memberof TeacherService
   */
  getCheckLog(){
    const api = this.comService.transferUrl('/check/log')
    const that = this;
    const params = new HttpParams().set('cid', this.curCid).set('sid',this.curSid)
    return new Promise<void>(function (resolve, reject) {
      that.http.get(api, { params }).subscribe((response: any) => {
        if (response.code == 2000) {
          resolve(response.data)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('网络请求失败')
      })
    })
  }
  /**
   *发起定时签到任务
   *
   * @return {*} 
   * @memberof TeacherService
   */
  addTaskTimeLimitSign(timeLimit){
    const api = this.comService.transferUrl('/check/task')
    const option = this.getHeader()
    const that = this;
    let task:TaskDTO = {
      course_cid: this.curCid,
      type: '1',
      time_limit:timeLimit
    }
    return new Promise<void>(function (resolve, reject) {
      that.http.post(api,task, option).subscribe((response: any) => {
        console.log(response)
        if (response.code == 2004) {
          // 保存taskid
          that.taskIdMap.set(that.curCid,response.data)
          resolve(response.data)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('网络请求失败')
      })
    })
  }
  /**
   *发起手势签到任务
   *
   * @return {*} 
   * @memberof TeacherService
   */
   addTaskGestureSign(password,time_limit){
    const api = this.comService.transferUrl('/check/task')
    const option = this.getHeader()
    const that = this;
    let task:TaskDTO = {
      course_cid: this.curCid,
      type: '1',
      password,
      time_limit
    }
    return new Promise<void>(function (resolve, reject) {
      that.http.post(api,task, option).subscribe((response: any) => {
        console.log(response)
        if (response.code == 2004) {
          that.taskIdMap.set(that.curCid,response.data)
          resolve(response.data)
        }
        else {
          reject(response.error)
        }

      }, (error: HttpErrorResponse) => {
        reject('网络请求失败')
      })
    })
  }
}
