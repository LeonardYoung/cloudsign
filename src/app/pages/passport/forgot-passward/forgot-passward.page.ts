import { ForgotPwdVo } from './forgotPwdVo';
import { PassportServiceService } from './../services/passport-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-passward',
  templateUrl: './forgot-passward.page.html',
  styleUrls: ['./forgot-passward.page.scss'],
})
export class ForgotPasswardPage implements OnInit {

  phone: string = '';
  code: string = '';

  password:string = '';
  confirmPassword:string = '';

  codeCmpt: any = {
    // valid: true,
    text: '获取验证码',
    btnDisable: false,
    timer: null,
    ms: null,
    count: 0,
    countMax: 10,
  };
  constructor(private toastCtl: ToastController,private passportService: PassportServiceService,private router: Router) { }
  @ViewChild('signupSlides', { static: true }) signupSlides: IonSlides;

  ngOnInit() {
    this.signupSlides.lockSwipeToNext(true)
    this.signupSlides.lockSwipeToPrev(true)
  }
  /**
   * 监听下一步按钮
   * @returns 
   */
  async onNext(){
    const toast = await this.toastCtl.create({
      message: '',
      duration: 3000,
      position: 'top'
    });

    const codeRes = this.passportService.checkSmsCode(this.code)
    if (codeRes.error != null) {
      toast.message = codeRes.error
      toast.present()
      return
    }

    this.signupSlides.lockSwipeToNext(false)
    this.signupSlides.slideNext()
    this.signupSlides.lockSwipeToNext(true)
  }
  async onConfirm(){
    const toast = await this.toastCtl.create({
      duration: 1000,
      position: 'top'
    });
    
    const submitTable: ForgotPwdVo = {
      phone: this.phone,
      code: this.code,
      newPass: this.password,
      newPassAgain: this.confirmPassword
    }
    this.passportService.sendPwdForgotRequest(submitTable).then(()=>{
      toast.message='修改成功,返回登录页...'
      this.router.navigateByUrl('/passport/login')
    }).catch(err=>{
      toast.message = `修改失败【${err.errmsg}】`
    }).finally(()=>{
      toast.present()
    })
  }
  async getCode() {
    // 1.校验
    const toast = await this.toastCtl.create({
      duration: 1000,
      position: 'top'
    });

    if (this.phone == null || this.phone == '') {
      toast.message = '请输入手机号码'
      toast.present()
      return
    }

    const phoneRegExp = new RegExp(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3,5-9]))\d{8}$/);
    let valid = phoneRegExp.test(this.phone)
    if (valid == false) {
      toast.message = '请输入正确的手机号码'
      toast.present()
      return
    }
    // 2.发送请求
    this.passportService.sendCodeRequest(this.phone).then(resp => {
      toast.message = '验证码发送成功'
      toast.present()
      // 3. 使按钮不可用
      this.codeCmpt.btnDisable = true;
      this.codeCmpt.text = this.codeCmpt.countMax + ' s后重新获取';
      // 开启定时器
      this.codeCmpt.count = this.codeCmpt.countMax;
      let stream = new Observable(observe => {
        this.codeCmpt.timer = setInterval(() => {
          this.codeCmpt.count--;
          observe.next();
        }, 1000);
      });
      this.codeCmpt.ms = stream.subscribe(() => {
        if (this.codeCmpt.count === 0) {
          this.codeCmpt.btnDisable = false;
          window.clearInterval(this.codeCmpt.timer);
          this.codeCmpt.text = '获取验证码';
        }
        else {
          this.codeCmpt.text = this.codeCmpt.count + ' s后重新获取';
        }
      });
      return
    }).catch(err => {
      toast.message = `发送失败【${err}】`
      toast.present()
      return
    })
  }

}
