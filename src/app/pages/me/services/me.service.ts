import { CommonService } from './../../../shared/services/common.service';
import { StuInfoVo } from './../vo/stuInfoVo';
import { TeacherInfoVo } from './../vo/teacherInfoVo';
import { LocalStorageService, USER_TYPE_KEY, USER_INFO_KEY, UID_KEY } from './../../../shared/services/local-storage.service';
import { PersonalInfoVo } from './../vo/personal-Info-vo';
import { serveUrl } from './../../../shared/services/constant';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  httpOptions = { //http请求头
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })//请求头进行转格式，防止出现415错误
  };

  private schoolsChoice: any[]
  private pInfo: PersonalInfoVo;

  constructor(private http: HttpClient, private localService: LocalStorageService, private comService: CommonService) { }


  /**
   * 获取学校列表
   * @param page 页数
   * @returns 
   */
  getSchoolsPage(page: number) {
    const api = this.comService.transferUrl('/org/school-list')
    const params = new HttpParams().set('page', '' + page).set('size', '10')
    return this.getRequest(params, api)
  }
  getCollegePage(schCode: string, page: number) {
    const api = this.comService.transferUrl('/org/college-list')
    const params = new HttpParams().set('page', '' + page).set('size', '10').set('schCode', schCode)
    return this.getRequest(params, api)
  }
  getMajorPage(schCode: string, colCode: string, page: number) {
    const api = this.comService.transferUrl('/org/major-list')
    const params = new HttpParams().set('page', '' + page).set('size', '10').set('colCode', colCode)
    return this.getRequest(params, api)
  }
  /**
   * 发起get请求
   * @param params 参数
   * @param api 接口
   * @returns promise
   */
  getRequest(params: HttpParams, api: string) {
    const that = this
    return new Promise(function (resolve, reject) {
      that.http.get(api, { params }).subscribe((response: any) => {
        if (response.code == 2000) {
          resolve(response.data)
        }
        else {
          reject({
            errmsg: response.msg
          })
        }
      }, (error) => {
        reject({
          errmsg: '网络请求失败'
        })
      })
    })
  }
  getTeacherById(id:string){
    const api = this.comService.transferUrl('/teacher')
    const params = new HttpParams().set('tid', id)
    const that = this
    return new Promise<any>(function (resolve, reject) {
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
  getSchoolNameByCode(code) {
    const api = this.comService.transferUrl('/org/school')
    const params = new HttpParams().set('schCode', code)
    const that = this
    return new Promise(function (resolve, reject) {
      if (code == null) {
        resolve(null)
        return
      }
      that.getRequest(params, api).then((resp: any) => {
        resolve(resp.schName)
      }).catch(err => {
        console.error('err in getSchoolNameByCode')
      })
    })
  }
  getCollegeNameByCode(schCode, colCode) {
    const api = this.comService.transferUrl('/org/college')
    const params = new HttpParams().set('schCode', '' + schCode).set('colCode', '' + colCode)
    const that = this
    return new Promise(function (resolve, reject) {
      if (schCode == null || colCode == null) {
        resolve(null)
        return
      }
      that.getRequest(params, api).then((resp: any) => {
        resolve(resp.colName)
      }).catch(err => {
        console.error('err in getCollegeNameByCode')
      })
    })
  }
  getMajorNameByCode(schCode, colCode, maCode) {
    const api = this.comService.transferUrl('/org/major')
    const params = new HttpParams().set('colCode', '' + colCode).set('majCode', '' + maCode)
    const that = this
    return new Promise(function (resolve, reject) {
      if (schCode == null || colCode == null || maCode == null) {
        resolve(null)
        return
      }
      that.getRequest(params, api).then((resp: any) => {
        resolve(resp.majName)
      }).catch(err => {
        console.error('err in getMajorNameByCode')
      })
    })
  }
  /**
   * 根据登录返回，获取个人信息
   */
  async getMeInfo(resp: any) {


    const type = resp.data.user.userRole.id
    this.localService.set(USER_TYPE_KEY, type)

    let uid = null
    //教师
    if (type == 3) {
      uid = resp.data.user.info.tid
      this.localService.set(UID_KEY, uid)
    }
    //学生
    else if (type == 4) {
      uid = resp.data.user.info.sid
      this.localService.set(UID_KEY, uid)
    }

    //清空本地缓存
    this.localService.set(USER_INFO_KEY, {})

    //快速注册时，不会有学号
    if (uid == null) {
      return
    }
    // let param = {
    //   tid: uid
    // }


    this.pInfo = resp.data.user.info
    this.pInfo.schoolCode = resp.data.user.info.school_code
    this.pInfo.collegeCode = resp.data.user.info.college_code
    this.pInfo.majorCode = resp.data.user.info.major_code

    this.pInfo.schoolName = <string>await this.getSchoolNameByCode(this.pInfo.schoolCode)
    this.pInfo.collegeName = <string>await this.getCollegeNameByCode(this.pInfo.schoolCode, this.pInfo.collegeCode)
    this.pInfo.majorName = <string>await this.getMajorNameByCode(this.pInfo.schoolCode, this.pInfo.collegeCode, this.pInfo.majorCode)

    console.log(this.pInfo)
    this.localService.set(USER_INFO_KEY, this.pInfo)

    // if (type == 3) {
    //   const api = this.comService.transferUrl('/api/teacher/?tid=' + uid)
    //   this.http.get(api,this.httpOptions ).subscribe((response: any) => {
    //     const teainfo: TeacherInfoVo = response.data
    //     this.convertFromTeaDto(teainfo).then((localData) => {
    //       this.localService.set(USER_INFO_KEY, localData)
    //       this.pInfo = localData
    //     })

    //   })
    // }
    // else if (type == 4) {
    //   const api = this.comService.transferUrl('/api/student/?tid=' + uid)
    //   this.http.get(api, this.httpOptions).subscribe((response: any) => {
    //     const stuinfo: StuInfoVo = response.data
    //     this.convertFromStuDto(stuinfo).then((localData) => {
    //       this.localService.set(USER_INFO_KEY, localData)
    //       this.pInfo = localData
    //     })
    //   })
    // }
  }
  getPInfo() {
    if (this.pInfo == null) {
      this.pInfo = this.localService.get(USER_INFO_KEY, {});
    }
    return this.pInfo
  }
  setPInfo(info) {
    this.pInfo = info
    this.localService.set(USER_INFO_KEY, info)
  }

  // async convertFromStuDto(serveDto: StuInfoVo) {
  //   let localData: PersonalInfoVo = {}
  //   //格式转换
  //   localData.phone = serveDto.st_phone
  //   localData.name = serveDto.st_name
  //   localData.gender = serveDto.st_sex
  //   localData.tid = serveDto.st_id
  //   localData.schoolCode = serveDto.st_school
  //   localData.collegeCode = serveDto.st_college
  //   localData.majorCode = serveDto.st_major

  //   localData.schoolName = <string>await this.getSchoolNameByCode(localData.schoolCode)
  //   localData.collegeName = <string>await this.getCollegeNameByCode(localData.schoolCode,localData.collegeCode)
  //   localData.majorName = <string>await this.getMajorNameByCode(localData.schoolCode,localData.collegeCode,localData.majorCode)

  //   return localData
  // }
  // async convertFromTeaDto(serveDto: TeacherInfoVo) {
  //   let localData: PersonalInfoVo = {}
  //   //格式转换
  //   localData.phone = serveDto.te_phone
  //   localData.name = serveDto.te_name
  //   localData.gender = serveDto.te_sex
  //   localData.tid = serveDto.te_id
  //   localData.schoolCode = serveDto.te_school
  //   localData.collegeCode = serveDto.te_college
  //   localData.majorCode = serveDto.te_major

  //   localData.schoolName = <string>await this.getSchoolNameByCode(localData.schoolCode)
  //   localData.collegeName = <string>await this.getCollegeNameByCode(localData.schoolCode,localData.collegeCode)
  //   localData.majorName = <string>await this.getMajorNameByCode(localData.schoolCode,localData.collegeCode,localData.majorCode)

  //   return localData
  // }


  /**
   *向服务器发送更改用户信息请求
   *
   * @param {PersonalInfoVo} userInfo
   * @return {*} 
   * @memberof MeService
   */
  sendUserUpdate(userInfo: PersonalInfoVo) {
    const type = this.localService.get(USER_TYPE_KEY, {})
    const that = this
    return new Promise(function (resolve, reject) {
      console.log(userInfo)
      let api: any;
      let params: any ={
        college_code: userInfo.collegeCode,
        
        major_code: userInfo.majorCode,
        name: userInfo.name,
        school_code: userInfo.schoolCode,
        phone: userInfo.phone

      }
      params.gender = userInfo.gender == '1' ? '男' : '女'
      if (type == 3) {
        api = that.comService.transferUrl('/teacher')
        params.tid = userInfo.tid

      }
      else if (type == 4) {
        api = that.comService.transferUrl('/student')
        params.sid = userInfo.sid
      }
      that.http.put(api, params).subscribe((resp: any) => {
        if (resp.code == 2006) {
          that.localService.set(USER_INFO_KEY, userInfo)
          resolve({
            success: true
          })
        } else {
          reject({
            errmsg: resp.msg
          })
        }
      }, (err) => {
        reject({
          errmsg: '网络请求错误'
        })
      })
    })

  }
  // getDtoAsServer(localDto: PersonalInfoVo) {
  //   const type = this.localService.get(USER_TYPE_KEY, {})
  //   if (type == 3) {
  //     let serverDto: TeacherInfoVo = {}
  //     serverDto.te_name = localDto.name
  //     serverDto.te_phone = localDto.phone
  //     serverDto.te_sex = localDto.gender
  //     serverDto.te_id = localDto.identity

  //     serverDto.te_college = localDto.collegeCode
  //     serverDto.te_school = localDto.schoolCode
  //     serverDto.te_major = localDto.majorCode
  //     return serverDto
  //   }
  //   else if (type == 4) {
  //     let serverDto: StuInfoVo = {}
  //     serverDto.st_name = localDto.name
  //     serverDto.st_phone = localDto.phone
  //     serverDto.st_sex = localDto.gender
  //     serverDto.st_id = localDto.identity

  //     serverDto.st_college = localDto.collegeCode
  //     serverDto.st_school = localDto.schoolCode
  //     serverDto.st_major = localDto.majorCode
  //     return serverDto
  //   }
  // }

  // getDtoAsLocal() {
  //   const that = this
  //   return new Promise(async function (resolve, reject) {
  //     let localData: PersonalInfoVo = {}
  //     const type = that.localService.get(USER_TYPE_KEY, {})
  //     if (type == 3) {
  //       const serveDto: TeacherInfoVo = that.localService.get(USER_INFO_KEY, {});
  //       //格式转换
  //       localData.phone = serveDto.te_phone
  //       localData.name = serveDto.te_name
  //       localData.gender = serveDto.te_sex
  //       localData.identity = serveDto.te_id
  //       localData.schoolCode = serveDto.te_school
  //       localData.collegeCode = serveDto.te_college
  //       localData.majorCode = serveDto.te_major

  //       localData.schoolName = <string>await that.getSchoolNameByCode(localData.schoolCode)
  //       localData.collegeName = <string>await that.getCollegeNameByCode(localData.collegeCode)
  //       localData.majorName = <string>await that.getMajorNameByCode(localData.majorCode)

  //     }
  //     else if (type == 4) {
  //       const serveDto: StuInfoVo = that.localService.get(USER_INFO_KEY, {});
  //       //格式转换
  //       localData.phone = serveDto.st_phone
  //       localData.name = serveDto.st_name
  //       localData.gender = serveDto.st_sex
  //       localData.identity = serveDto.st_id
  //       localData.schoolCode = serveDto.st_school
  //       localData.collegeCode = serveDto.st_college
  //       localData.majorCode = serveDto.st_major

  //       localData.schoolName = <string>await that.getSchoolNameByCode(localData.schoolCode)
  //       localData.collegeName = <string>await that.getCollegeNameByCode(localData.collegeCode)
  //       localData.majorName = <string>await that.getMajorNameByCode(localData.majorCode)
  //       console.log(localData)
  //     }
  //     resolve(localData)
  //   })

  // }

  saveSchoolsChoice(choice: any[]) {
    this.schoolsChoice = choice;
  }
  getSchoolsChoice() {
    return this.schoolsChoice
  }
}
