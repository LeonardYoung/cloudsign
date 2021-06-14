import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import PatternLock from 'patternlock';
import { TeacherService } from '../../service/teacher.service';
// import 'patternlock/dist/patternlock.css';
declare var BMap;

@Component({
  selector: 'app-signin-gesture',
  templateUrl: './signin-gesture.page.html',
  styleUrls: ['./signin-gesture.page.scss'],
})



export class SigninGesturePage implements OnInit {

  constructor(private navCtl:NavController,
    public toastController: ToastController,
    // private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private toaslCtl:ToastController,
    private teaService:TeacherService) { }

  public post_geature_url = '';
  public sign_in_number: any;
  public course_id: any;
  public course_name: any;
  public teacher_id: any;

  public timeLimit = '60'
  // public hasPost = 0;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((result) => {
      // console.log('传入的参数：', result);
      this.course_id = result.course_id;
      this.course_name = result.course_name;
    })
    // this.teacher_id = this.localStorageService.get('userID', null);
    // console.log('教师编号：', this.teacher_id);
    let that = this;
    let lock = new PatternLock("#patternHolder", {
      onDraw: function (pattern) {
        //do something with pattern
        that.sign_in_number = lock.getPattern();

        console.log(that.sign_in_number)
      }
    });
    
  }
  async onClickCheck(){
    const toast = await this.toaslCtl.create({
      message: '',
      duration: 3000,
      position: 'top'
    });
    if(this.sign_in_number == null){
      toast.message = '请绘制手势'
      toast.present()
      return
    }
    this.teaService.addTaskGestureSign(this.sign_in_number,this.timeLimit).then((resp)=>{
      console.log(resp)
      toast.message = '签到已发起'
      toast.present()

      this.navCtl.back()
      this.navCtl.back()
    })

  }

  // async onSubmit() {
  //   // this.hasPost = 1; //准备发送数据，显示进度条
  //   this.getLocation().then((response: any) => {
  //     console.log('教师位置：', response.point.lat, response.point.lng);
  //     // this.commonService.startSignIn(this.course_id, response.point.lng, response.point.lat, this.sign_in_number).then(async (result) => {
  //     //   this.hasPost = 0;//不显示进度条
  //     //   // console.log('返回信息：', result);
  //     //   const toast = await this.toastController.create({
  //     //     color: 'light',
  //     //     duration: 2000,
  //     //     mode: 'ios',
  //     //     translucent: true,
  //     //     message: '签到设置成功!',
  //     //   });
  //     //   await toast.present();
  //     //   this.router.navigate(['/exam-sign-in'], {
  //     //     queryParams: {
  //     //       course_id: this.course_id,
  //     //       course_name: this.course_name
  //     //     }
  //     //   })
  //     // }).catch((error) => {
  //     //   this.hasPost = 0;
  //     //   // console.log('创建签到失败', error);
  //     // })
  //   }).catch((error) => {
  //     // console.log('定位失败', error);
  //   })
  // }

  getLocation() {
    // let geolocation = new BMap.Geolocation(); //新建地图对象
    // return new Promise((reslove, reject) => {
    //   geolocation.getCurrentPosition(function (r) {
    //     // console.log(this.getStatus())
    //     if (this.getStatus() == 0) {
    //       // console.log('获取位置成功：', r.point.lat, r.point.lng);
    //       reslove(r);
    //     }
    //     else {
    //       // console.log('获取位置失败:', this.getStatus());
    //       reject(this.getStatus());
    //     }
    //   });
    // })
  }

}
