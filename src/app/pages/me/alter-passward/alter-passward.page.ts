import { MeService } from './../services/me.service';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alter-passward',
  templateUrl: './alter-passward.page.html',
  styleUrls: ['./alter-passward.page.scss'],
})
export class AlterPasswardPage implements OnInit {

  constructor(private toastCtl:ToastController,private meService:MeService) { }

  passwards : any= {
    oldPwd: '',
    newPwd: '',
    confirmPwd: '',
    
  }

  ngOnInit() {
  }
  async onClickFinish(){

    const toast = await this.toastCtl.create({
      duration: 1000,
      position: 'bottom'
    });
    if( this.passwards.newPwd !== this.passwards.confirmPwd){
      toast.message = '两次密码不一致'
      toast.present()
    }
    else{
      this.meService.passwordChange(this.passwards).then((resp)=>{
        toast.message = '修改成功'
        toast.present()
      }).catch((err)=>{
        toast.message = err
        toast.present()
      })
    }
  }

}
