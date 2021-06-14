import { TeacherService } from './../../service/teacher.service';
import { NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin-one-key',
  templateUrl: './signin-one-key.page.html',
  styleUrls: ['./signin-one-key.page.scss'],
})
export class SigninOneKeyPage implements OnInit {

  constructor(private navCtl:NavController,private teaService:TeacherService,private toaslCtl:ToastController) { }

  timeLimit:any = '60'
  ngOnInit() {
  }
  onClickCheck(){
    this.teaService.addTaskTimeLimitSign(this.timeLimit).then(async (resp:any)=>{
      console.log(resp)
      const toast = await this.toaslCtl.create({
        message: '',
        duration: 3000,
        position: 'top'
      });
      toast.message = '签到已发起'
      toast.present()

      this.navCtl.back()
      this.navCtl.back()
    })
  }

}
