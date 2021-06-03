import { signupVO } from './signupvo';
import { PassportServiceService } from './../services/passport-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

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
    type: '4',
    msgcode: '',
  }
  codeCmpt: any = {
    // valid: true,
    text: '获取验证码',
    btnDisable: false,
    timer: null,
    ms: null,
    count: 0,
    countMax: 10,
  };
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
      position: 'top'
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
  async getCode() {
    // 1.校验
    const toast = await this.toastctl.create({
      duration: 1500,
      position: 'top'
    });

    if (this.signup.phone == null || this.signup.phone == '') {
      toast.message = '请输入手机号码'
      toast.present()
      return
    }

    const phoneRegExp = new RegExp(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3,5-9]))\d{8}$/);
    let valid = phoneRegExp.test(this.signup.phone)
    if (valid == false) {
      toast.message = '请输入正确的手机号码'
      toast.present()
      return
    }
    // 2.发送请求
    this.passportServicec.sendCodeRequest(this.signup.phone).then(resp => {
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
  /**
   * 监听“快速注册”按钮
   */
  async onFastSignup() {
    let fastvo: signupVO = {}
    fastvo.phone = this.signup.phone
    fastvo.username = this.signup.phone
    fastvo.msgcode = this.signup.msgcode
    fastvo.type = '4'
    fastvo.password = 'abc'
    // this.signupReq(fastvo)

    const toast = await this.toastctl.create({
      message: '',
      duration: 3000,
      position: 'top'
    });
    //发送注册请求
    this.passportServicec.signupRequest(fastvo)
      .then((resp: any) => {
        if (resp.code == 2002) {
          //注册成功，显示下一页
          this.signupSlides.lockSwipeToNext(false);
          this.signupSlides.slideNext()
          this.signupSlides.slideNext()
          this.signupSlides.lockSwipeToNext(true);
        }
        else {
          toast.message = `注册失败【${resp.error}】`
          toast.present()
        }

      })
      .catch(err => {
        console.log('请求失败，请检查网络', err)
        toast.message = '请求失败，请检查网络'
        toast.present()
      })
  }
  // async signupReq(data: signupVO) {
  //   const toast = await this.toastctl.create({
  //     message: '',
  //     duration: 3000,
  //     position: 'top'
  //   });
  //   //发送注册请求
  //   this.passportServicec.signupRequest(data)
  //     .then((resp: any) => {
  //       if (resp.code == 0) {
  //         //注册成功，显示下一页
  //         this.signupSlides.lockSwipeToNext(false);
  //         this.signupSlides.slideNext()
  //         this.signupSlides.lockSwipeToNext(true);
  //       }
  //       else {
  //         toast.message = `注册失败【${resp.msg}】`
  //         toast.present()
  //       }

  //     })
  //     .catch(err => {
  //       console.log('请求失败，请检查网络', err)
  //       toast.message = '请求失败，请检查网络'
  //       toast.present()
  //     })
  // }
  /**
   * 监听“注册”请求
   * @returns 
   */
  async onSubmit() {
    const toast = await this.toastctl.create({
      message: '',
      duration: 3000,
      position: 'top'
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
