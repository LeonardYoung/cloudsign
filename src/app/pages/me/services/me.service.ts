import { CommonService } from './../../../shared/services/common.service';
import { StuInfoVo } from './../vo/stuInfoVo';
import { TeacherInfoVo } from './../vo/teacherInfoVo';
import { LocalStorageService, USER_TYPE_KEY, USER_INFO_KEY, UID_KEY } from './../../../shared/services/local-storage.service';
import { PersonalInfoVo } from './../vo/personal-Info-vo';
import { serveUrl } from './../../../shared/services/constant';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
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
  getCollegePage(sch_code: string, page: number) {
    const api = this.comService.transferUrl('/org/college-list')
    const params = new HttpParams().set('page', '' + page).set('size', '10').set('schCode', sch_code)
    return this.getRequest(params, api)
  }
  getMajorPage(sch_code: string, co_code: string, page: number) {
    const api = this.comService.transferUrl('/org/major-list')
    const params = new HttpParams().set('page', '' + page).set('size', '10').set('colCode', co_code)
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
        if (response.code == 0) {
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
  getSchoolNameByCode(code) {
    const api = this.comService.transferUrl('/org/school/' + code)
    const params = new HttpParams().set('schCode ', '' + code)
    const that = this
    return new Promise(function (resolve, reject) {
      if (code == null) {
        resolve(null)
        return
      }
      that.getRequest(params, api).then((resp: any) => {
        resolve(resp.sch_name)
      }).catch(err => {
        console.error('err in getSchoolNameByCode')
      })
    })
  }
  getCollegeNameByCode(schCode,colCode) {
    const api = this.comService.transferUrl('/org/college/')
    const params = new HttpParams().set('schCode ', '' + schCode).set('colCode','' + colCode)
    const that = this
    return new Promise(function (resolve, reject) {
      if (schCode == null || colCode == null) {
        resolve(null)
        return
      }
      that.getRequest(params, api).then((resp: any) => {
        resolve(resp.co_name)
      }).catch(err => {
        console.error('err in getCollegeNameByCode')
      })
    })
  }
  getMajorNameByCode(schCode,colCode,maCode) {
    const api = this.comService.transferUrl('/org/major/')
    const params = new HttpParams().set('schCode ', '' + schCode).set('colCode','' + colCode).set('majCode','' + maCode)
    const that = this
    return new Promise(function (resolve, reject) {
      if (schCode == null || colCode == null || maCode == null) {
        resolve(null)
        return
      }
      that.getRequest(params, api).then((resp: any) => {
        resolve(resp.ma_name)
      }).catch(err => {
        console.error('err in getMajorNameByCode')
      })
    })
  }
  /**
   * 根据登录返回，获取个人信息
   */
  getMeInfo(resp: any) {
    // 存入本地
    const uid = resp.data.uid
    this.localService.set(UID_KEY, uid)

    const type = resp.data.type
    this.localService.set(USER_TYPE_KEY, type)

    //清空本地缓存
    this.localService.set(USER_INFO_KEY, {})

    //快速注册时，不会有学号
    if(uid == null){
      return
    }

    if (type == 3) {
      const api = this.comService.transferUrl('/teacher/' + uid)
      this.http.get(api, this.httpOptions).subscribe((response: any) => {
        const teainfo: TeacherInfoVo = response.data
        this.convertFromTeaDto(teainfo).then((localData) => {
          this.localService.set(USER_INFO_KEY, localData)
          this.pInfo = localData
        })

      })
    }
    else if (type == 4) {
      const api = this.comService.transferUrl('/student/' + uid)
      this.http.get(api, this.httpOptions).subscribe((response: any) => {
        const stuinfo: StuInfoVo = response.data
        this.convertFromStuDto(stuinfo).then((localData) => {
          this.localService.set(USER_INFO_KEY, localData)
          this.pInfo = localData
        })
      })
    }
  }
  getPInfo() {
    if (this.pInfo == null) {
      this.pInfo = this.localService.get(USER_INFO_KEY, {});
    }
    return this.pInfo
  }
  setPInfo(info){
    this.pInfo = info
    this.localService.set(USER_INFO_KEY,info)
  }

  async convertFromStuDto(serveDto: StuInfoVo) {
    let localData: PersonalInfoVo = {}
    //格式转换
    localData.phone = serveDto.st_phone
    localData.name = serveDto.st_name
    localData.gender = serveDto.st_sex
    localData.identity = serveDto.st_id
    localData.schoolCode = serveDto.st_school
    localData.collegeCode = serveDto.st_college
    localData.majorCode = serveDto.st_major

    localData.schoolName = <string>await this.getSchoolNameByCode(localData.schoolCode)
    localData.collegeName = <string>await this.getCollegeNameByCode(localData.schoolCode,localData.collegeCode)
    localData.majorName = <string>await this.getMajorNameByCode(localData.schoolCode,localData.collegeCode,localData.majorCode)

    return localData
  }
  async convertFromTeaDto(serveDto: TeacherInfoVo) {
    let localData: PersonalInfoVo = {}
    //格式转换
    localData.phone = serveDto.te_phone
    localData.name = serveDto.te_name
    localData.gender = serveDto.te_sex
    localData.identity = serveDto.te_id
    localData.schoolCode = serveDto.te_school
    localData.collegeCode = serveDto.te_college
    localData.majorCode = serveDto.te_major

    localData.schoolName = <string>await this.getSchoolNameByCode(localData.schoolCode)
    localData.collegeName = <string>await this.getCollegeNameByCode(localData.schoolCode,localData.collegeCode)
    localData.majorName = <string>await this.getMajorNameByCode(localData.schoolCode,localData.collegeCode,localData.majorCode)

    return localData
  }


  sendUserUpdate(userInfo: PersonalInfoVo) {
    const type = this.localService.get(USER_TYPE_KEY, {})
    const that = this
    return new Promise(function (resolve, reject) {
      let api:any;
      let params:any;
      if (type == 3) {
        api = that.comService.transferUrl('/teacher')
        params = {
          te_name: userInfo.name,
          te_phone: userInfo.phone,
          te_sex: userInfo.gender,
          te_id: userInfo.identity,

          te_school: userInfo.schoolCode,
          te_college: userInfo.collegeCode,
          te_major: userInfo.majorCode,
        }
        
      }
      else if (type == 4) {
        api = that.comService.transferUrl('/student')
        params ={
          st_name: userInfo.name,
          st_phone: userInfo.phone,
          st_sex: userInfo.gender,
          st_id: userInfo.identity,

          st_school: userInfo.schoolCode,
          st_college: userInfo.collegeCode,
          st_major: userInfo.majorCode,
        }
        // that.http.put(api, params).subscribe((resp) => {
        //   console.log(resp)
        // })
      }
      that.http.put(api, params).subscribe((resp:any) => {
        if(resp.code == 0){
          resolve({
            success: true
          })
          that.localService.set(USER_INFO_KEY,that.pInfo)
        }else{
          reject({
            errmsg:resp.msg
          })
        }
      },(err)=>{
        reject({
          errmsg:'网络请求错误'
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
