import { LoginVo } from './../login/loginvo';
import { serveUrl } from './../../../shared/services/constant';
import { signupVO } from './../signup/signupvo';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import axios from 'axios'



@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {

  private smsCode: string = null;

  constructor(private localStorage: LocalStorageService) {
    // this.users = this.localStorage.get(USER_KEY, []);
  }

  /**
   * 向服务端发送验证码请求
   * @param phone 
   */
  sendCodeRequest(phone: string) {
    console.log('sendCodeReq ', phone);
    const that = this;
    axios.post(serveUrl + '/user/sms', {
      phone: phone
    })
      .then(function (response) {
        console.log(response);
        if (response.data.code == 0) {
          that.smsCode = response.data.data.code
        }
      })
      .catch(function (error) {
        console.log(error);
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
