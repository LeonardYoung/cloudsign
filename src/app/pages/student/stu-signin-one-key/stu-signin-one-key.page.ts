import { ToastController, NavController, ViewWillEnter } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../service/student.service';
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-stu-signin-one-key',
  templateUrl: './stu-signin-one-key.page.html',
  styleUrls: ['./stu-signin-one-key.page.scss'],
})
export class StuSigninOneKeyPage implements OnInit,ViewWillEnter {

  cid: string = ''
  // taskId: string = ''
  startString = ''
  endString = ''
  

  constructor(private activeRouter: ActivatedRoute,private stuServer:StudentService,
    private toastCtl:ToastController,
    private navCtl:NavController) {
    const that = this
    this.activeRouter.queryParams.subscribe(queryParsm => {
      // that.taskId = queryParsm.id
      that.cid = queryParsm.cid
    });
  }
  ionViewWillEnter(){
    const task = this.stuServer.getCurTask()
    this.startString = task.gmt_create
    const endTime = dayjs(task.gmt_create).add(task.time_limit,'second')
    this.endString = endTime.format('YYYY-MM-DD HH:mm:ss')
  }

  ngOnInit() {
    
    
  }
  async onClickSignin() {
    const toast = await this.toastCtl.create({
      duration: 1500,
      position: 'top'
    });
    this.stuServer.CheckIn(this.cid).then(()=>{
      toast.message = '签到成功'
      toast.present()
      this.navCtl.back()
    }).catch((err)=>{
      toast.message = err
      toast.present()
    })

  }

}
