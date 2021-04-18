import { LoginVo } from './../login/loginvo';
import { serveUrl } from './../../../shared/services/constant';
import { signupVO } from './../signup/signupvo';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
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

  constructor(private localStorage: LocalStorageService,private http: HttpClient) {
    // this.users = this.localStorage.get(USER_KEY, []);
  }

  /**
   * 向服务端发送验证码请求
   * @param phone 
   */
  sendCodeRequest(phone: string) {
    const that = this;
    const api = serveUrl + '/user/sms'
    const params:any = {
      phone: phone
    }
    return new Promise(function(resolve,reject){
      that.http.post(api,params,that.httpOptions).subscribe((response:any)=>{
        console.log(response);
        if (response.code == 0) {
          that.smsCode = response.data.code
          resolve(that.smsCode)
        }
        else{
          reject(response.msg)
        }
      },(error:HttpErrorResponse)=>{
        // let errmsg= `error:${error.error} \r\n msg:${error.message} \r\n status:${error.statusText}`
        reject('网络请求失败')
      })
    })
  }


  checkSmsCode(input: string) {
    if (this.smsCode == null) {
      return {
        error: "请发送验证码"
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
    const api = serveUrl + '/user/regist'
    const that = this;

    //发送请求
    return new Promise(function (resolve, reject) {
      axios.post(api, data)
        .then(function (response) {
          console.log(response);
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
  /** 
   * 想服务端发送登录请求
   * 
   */
  loginRequest(input: LoginVo, loginType: string) {
    let params: LoginVo = {};
    params.type = "1"

    if (loginType == 'pwd') {
      params.username = input.username
      params.password = input.password
    }
    else if (loginType == 'code') {
      params.phone = input.phone
      params.code = input.code
    }

    //发送请求
    const api = serveUrl + '/user/login'
    const that = this;
    return new Promise(function (resolve, reject) {
      axios.post(api, params)
        .then(function (response) {
          console.log(response);
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })

  }

}
