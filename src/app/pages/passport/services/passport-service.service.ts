import { signupVO } from './../signup/signupvo';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {

  constructor(private localStorage: LocalStorageService) {
    // this.users = this.localStorage.get(USER_KEY, []);
  }

  /**
   * 向服务端发送验证码请求
   * @param phone 
   */
  sendCodeRequest(phone: string){
    console.log('sendCodeReq ',phone);
  }
  /**
   * 向服务端发送注册请求
   * @param data 用户数据
   */
  signupRequest(data: signupVO){
    console.log('signupRequest ',data);
  }
}
