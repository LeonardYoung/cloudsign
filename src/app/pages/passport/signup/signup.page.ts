import { signupVO } from './signupvo';
import { PassportServiceService } from './../services/passport-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})


export class SignupPage implements OnInit {
  signup: signupVO = {
    phone: '', //手机号
    identity: '',//学生、老师
    password: '',
    username: '',
    email: '',
    type: '1',
    msgcode: '',
  }
  confirmPassword: string = ''
  // code: string = ''

  constructor(private passportServicec: PassportServiceService, private toastctl: ToastController) { }
  @ViewChild('signupSlides', { static: true }) signupSlides: IonSlides;

  ngOnInit() {
    this.signupSlides.lockSwipeToNext(true);
    this.signupSlides.lockSwipeToPrev(true);
  }
  /**
   * 监听“下一步”按钮
   * @returns 
   */
  async onNext() {
    const toast = await this.toastctl.create({
      message: '',
      duration: 3000,
      position: 'middle'
    });

    const codeRes = this.passportServicec.checkSmsCode(this.signup.msgcode)
    if (codeRes.error != null) {
      toast.message = codeRes.error
      toast.present()
      return
    }

    // 下一页
    this.signupSlides.lockSwipeToNext(false);
    this.signupSlides.slideNext()
    this.signupSlides.lockSwipeToNext(true);
  }
  /**
   * 获取验证码
   */
  getCode() {
    this.passportServicec.sendCodeRequest(this.signup.phone)
  }
  /**
   * 监听“注册”请求
   * @returns 
   */
  async onSubmit() {
    const toast = await this.toastctl.create({
      message: '',
      duration: 3000,
      position: 'middle'
    });

    //发送注册请求
    this.passportServicec.signupRequest(this.signup)
      .then((resp: any) => {
        if (resp.code == 0) {
          //注册成功，显示下一页
          this.signupSlides.lockSwipeToNext(false);
          this.signupSlides.slideNext()
          this.signupSlides.lockSwipeToNext(true);
        }
        else {
          toast.message = `注册失败【${resp.msg}】`
          toast.present()
        }

      })
      .catch(err => {
        console.log('请求失败，请检查网络', err)
        toast.message = '请求失败，请检查网络'
        toast.present()
      })

  }

}
