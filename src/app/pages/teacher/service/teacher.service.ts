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
  constructor(private http: HttpClient, private comService: CommonService, private localService: LocalStorageService) { }

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
          resolve()
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
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('token',token)
       
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
      that.http.delete(api,option).subscribe((response: any) => {
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
}
