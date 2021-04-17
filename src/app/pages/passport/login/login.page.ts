import { PassportServiceService } from './../services/passport-service.service';
import { LoginVo } from './loginvo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular';

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
    code:'',
    type:'',
  }
  loginType: string = 'pwd'
  constructor(private toastCtl: ToastController,private passportService: PassportServiceService) { }

  ngOnInit() {
    this.loginSlides.lockSwipeToNext(true)
    this.loginSlides.lockSwipeToPrev(true)

  }

  onClickSmsLogin(){
    this.loginType = 'code'

    this.loginSlides.lockSwipeToNext(false)
    this.loginSlides.slideNext();
    this.loginSlides.lockSwipeToNext(true)

  }
  /**
   * 监听“密码登录”按钮
   */
  onClickPwdLogin(){
    this.loginType = 'pwd'

    this.loginSlides.lockSwipeToPrev(false)
    this.loginSlides.slidePrev();
    this.loginSlides.lockSwipeToPrev(true)
  }
  /**
   * 监听“获取验证码”按钮
   */
  async getCode(){
    const toast = await this.toastCtl.create({
      duration: 1500,
      position:'middle'
    });
    
    if(this.loginTable.phone == null || this.loginTable.phone == ''){
      toast.message = '请输入手机号码'
      toast.present()
      return
    }
    
    const phoneRegExp = new RegExp(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3,5-9]))\d{8}$/);
    let valid = phoneRegExp.test(this.loginTable.phone) 
    if(valid == false){
      toast.message = '请输入正确的手机号码'
      toast.present()
      return
    }
    this.passportService.sendCodeRequest(this.loginTable.phone)
  }

  /**
   * 登录按钮
   */
  async onLogin(){
    const toast = await this.toastCtl.create({
      message: '',
      duration: 1500,
      position:'middle'
    });

    this.passportService.loginRequest(this.loginTable,this.loginType)
      .then((resp:any) => {
        if(resp.code == 0){
          toast.message = '登录成功';
        }
        else{
          toast.message = `登录失败【${resp.msg}】`
        }

      })
      .catch(err => {
        console.log('请求失败，请检查网络',err)
        toast.message = '登录失败'
      })
      .finally(()=>{
        toast.present()
      })
  }

}
