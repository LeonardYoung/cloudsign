import { MeService } from './../../me/services/me.service';
import { CommonService } from './../../../shared/services/common.service';
import { TeacherInfoVo } from './../../me/vo/teacherInfoVo';
import { StuInfoVo } from './../../me/vo/stuInfoVo';
import { ForgotPwdVo } from './../forgot-passward/forgotPwdVo';
import { LoginVo } from './../login/loginvo';
import { serveUrl } from './../../../shared/services/constant';
import { signupVO } from './../signup/signupvo';
import { LocalStorageService, UID_KEY, USER_TYPE_KEY, USER_INFO_KEY } from './../../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import axios from 'axios'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {

  private smsCode: string = null;
  httpOptions = { //http请求头
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })//请求头进行转格式，防止出现415错误
  };

  constructor(private localStorage: LocalStorageService,private http: HttpClient,
    private comService:CommonService,private meService:MeService) {
    // this.users = this.localStorage.get(USER_KEY, []);
    
  }

  /**
   * 向服务端发送验证码请求
   * @param phone 
   */
  sendCodeRequest(phone: string) {
    const that = this;
    const api = this.comService.transferUrl('/code/smsCode')
    const params:any = {
      phone: phone
    }
    return new Promise(function(resolve,reject){
      that.http.post(api,params,that.httpOptions).subscribe((response:any)=>{
        // if (response.code == 0) {
        //   that.smsCode = response.data
        //   resolve(that.smsCode)
        // }
        // else{
        //   reject(response.msg)
        // }
        that.smsCode = '8888'
        resolve(that.smsCode)
      },(error:HttpErrorResponse)=>{
        // let errmsg= `error:${error.error} \r\n msg:${error.message} \r\n status:${error.statusText}`
        reject('网络请求失败')
      })
    })
  }
  /**
   *获取图形验证码
   *
   * @memberof PassportServiceService
   */
  getCheckImg(){
    const api = this.comService.transferUrl('/code/captcha')
    const that = this;
    return new Promise(function(resolve,reject){
      that.http.get(api).subscribe((response:any)=>{
        if(response.code == 2002){
          resolve(response.data)
        }
        else{
          reject(response.error)
        }
        
      },(error:HttpErrorResponse)=>{
        reject('网络请求失败')
      })
    })
  }


  checkSmsCode(input: string) {
    if (this.smsCode == null) {
      return {
        error: "请先发送验证码"
      }
    }
    if (this.smsCode == input) {
      this.smsCode = null;
      return {
        code: 0,
      }
    }
    else {
      return {
        error: "验证码错误"
      }
    }

  }

  /**
   * 向服务端发送注册请求
   * @param data 用户数据
   */
  signupRequest(data: signupVO) {
    const api = this.comService.transferUrl('/auth/register')
    const that = this;

    //发送请求
    return new Promise(function (resolve, reject) {
      axios.post(api, data)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  /** 
   * 向服务端发送登录请求
   * 
   */
  loginRequest(input: LoginVo, loginType: string) {
    let params: any = {};
    params.type = input.type

    if (loginType == 'pwd') {
      params.identifier = input.username
      params.credential = input.password
    }
    else if (loginType == 'code') {
      params.identifier = input.phone
      params.credential = input.code
    }
    params.uuid = input.uuid
    params.code = input.picCode
    

    //发送请求
    const api = this.comService.transferUrl('/auth/login')
    const that = this;
    return new Promise(function (resolve, reject) {
      axios.post(api, params)
        .then(function (response:any) {
          if(response.data.code == 2001){
            if(response.data.data.user.userRole.id == 3 || response.data.data.user.userRole.id == 4){
              resolve({
                success: true
              })
              that.meService.getMeInfo(response.data)
            }
            else{
              reject({
                errmsg:'请登录学生或老师账号'
              })
            }
          }
          else{
            reject({
              errmsg:response.data.error
            })
          }
          
        })
        .catch(function (error) {
          reject({
            errmsg:'请求失败'
          })
        })
    })

  }
  // /**
  //  * 根据登录返回，获取个人信息
  //  */
  // getMeInfo(resp: any){
  //   // 存入本地
  //   const uid = resp.data.uid
  //   this.localStorage.set(UID_KEY,uid)
    
  //   const type = resp.data.type
  //   this.localStorage.set(USER_TYPE_KEY,type)

  //   if(type == 3){
  //     const api = this.comService.transferUrl('/teacher/' + uid )
  //     this.http.get(api,this.httpOptions).subscribe((response:any)=>{
  //       const teainfo:TeacherInfoVo = response.data
  //       this.localStorage.set(USER_INFO_KEY,teainfo)
  //     })
  //   }
  //   else if(type == 4){
  //     const api = this.comService.transferUrl('/student/' + uid )
  //     this.http.get(api,this.httpOptions).subscribe((response:any)=>{
  //       const stuinfo:StuInfoVo = response.data
  //       this.localStorage.set(USER_INFO_KEY,stuinfo)
  //     })
  //   }
  // }
  sendPwdForgotRequest(input:ForgotPwdVo){
    const that = this;
    const api = this.comService.transferUrl('/user/pwd-forget')
    return new Promise(function(resolve,reject){
      that.http.post(api,input,that.httpOptions).subscribe((response:any)=>{
        if(response.code == 0){
          resolve({
            success: true
          })
        }
        else{
          reject({
            errmsg:response.msg
          })
        }
      },(err:any)=>{
        reject({
          errmsg:'网络请求失败'
        })
      })
    })

  }

}
