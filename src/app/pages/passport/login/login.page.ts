import { Router } from '@angular/router';
import { PassportServiceService } from './../services/passport-service.service';
import { LoginVo } from './loginvo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('loginSlides', { static: true }) loginSlides: IonSlides;
  loginTable: LoginVo = {
    username: '',
    phone: '',
    password: '',
    code: '',
    type: '1',
  }
  loginType: string = 'pwd'
  checkImg:string = ''
  codeCmpt: any = {
    // valid: true,
    text: '获取验证码',
    btnDisable: false,
    timer: null,
    ms: null,
    count: 0,
    countMax: 10,
  };

  constructor(private toastCtl: ToastController, private passportService: PassportServiceService,private router: Router) { }

  ngOnInit() {
    this.loginSlides.lockSwipeToNext(true)
    this.loginSlides.lockSwipeToPrev(true)
    this.getCheckImg()

  }
  
  onClickImg(){
    this.getCheckImg()
  }
  /**
   *获取图形验证码
   *
   * @memberof LoginPage
   */
  async getCheckImg(){
    const toast = await this.toastCtl.create({
      duration: 1500,
      position: 'top'
    });
    
    const that =this
    this.passportService.getCheckImg().then((resp:any) => {
      console.log(resp)
      that.checkImg = resp.img
      that.loginTable.uuid = resp.uuid
    }).catch((err:any)=>{
      toast.message = `发送失败【${err}】`
      toast.present()
      return
    })
  }

  onClickSmsLogin() {
    this.loginType = 'code'
    this.loginTable.type = '2'

    this.loginSlides.lockSwipeToNext(false)
    this.loginSlides.slideNext();
    this.loginSlides.lockSwipeToNext(true)

  }
  /**
   * 监听“密码登录”按钮
   */
  onClickPwdLogin() {
    this.loginType = 'pwd'
    this.loginTable.type = '1'

    this.loginSlides.lockSwipeToPrev(false)
    this.loginSlides.slidePrev();
    this.loginSlides.lockSwipeToPrev(true)
  }
  /**
   * 监听“获取验证码”按钮
   */
  async getCode() {
    // 1.校验
    const toast = await this.toastCtl.create({
      duration: 1500,
      position: 'top'
    });

    if (this.loginTable.phone == null || this.loginTable.phone == '') {
      toast.message = '请输入手机号码'
      toast.present()
      return
    }

    const phoneRegExp = new RegExp(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3,5-9]))\d{8}$/);
    let valid = phoneRegExp.test(this.loginTable.phone)
    if (valid == false) {
      toast.message = '请输入正确的手机号码'
      toast.present()
      return
    }
    // 2.发送请求
    this.passportService.sendCodeRequest(this.loginTable.phone).then(resp => {
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
      // // 可以重新发送验证码
      // this.codeCmpt.ms.isUnsubscribed()
      // this.codeCmpt.btnDisable = false;
      // window.clearInterval(this.codeCmpt.timer);
      // this.codeCmpt.text = '获取验证码';
      return
    })
  }

  /**
   * 登录按钮
   */
  async onLogin() {
    const toast = await this.toastCtl.create({
      message: '',
      duration: 1500,
      position: 'top'
    });

    this.passportService.loginRequest(this.loginTable, this.loginType)
      .then(() => {
        toast.message = '登录成功';
        this.router.navigateByUrl('/tabs/teacher')
      })
      .catch(err => {
        toast.message = `登录失败【${err.errmsg}】`
      })
      .finally(() => {
        toast.present()
      })
  }

}
