import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ViewWillEnter } from '@ionic/angular';
import * as dayjs from 'dayjs';
import { StudentService } from '../service/student.service';
import PatternLock from 'patternlock';


@Component({
  selector: 'app-stu-signin-gesture',
  templateUrl: './stu-signin-gesture.page.html',
  styleUrls: ['./stu-signin-gesture.page.scss'],
})
export class StuSigninGesturePage implements OnInit,ViewWillEnter {

  startString = ''
  endString = ''
  sign_in_number: any;
  constructor(private stuServer:StudentService,
    private toastCtl:ToastController,
    private navCtl:NavController) { }

  async ngOnInit() {
    let that = this;
    
    
    let lock = new PatternLock("#patternHolder", {
      onDraw: async function (pattern) {
        //do something with pattern
        that.sign_in_number = lock.getPattern();
        const toast = await that.toastCtl.create({
          duration: 1000,
          position: 'top'
        });

        const task:any = that.stuServer.getCurTask()
        if (task.password == that.sign_in_number){
          toast.message = '签到成功'
          toast.present()
          that.navCtl.back()
        }
        else{
          toast.message = '密码错误'
          toast.present()
        }
        console.log(that.sign_in_number)
      }
    });
  }
  ionViewWillEnter(){
    const task = this.stuServer.getCurTask()
    this.startString = task.gmt_create
    const endTime = dayjs(task.gmt_create).add(task.time_limit,'second')
    this.endString = endTime.format('YYYY-MM-DD HH:mm:ss')
  }

}
