import { TeacherService } from './../service/teacher.service';
import { ViewWillEnter } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MemberInfo } from './../vo/member-info';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit,ViewWillEnter {

  member: MemberInfo = {
    name:''
  }

  constructor(private activateRoute: ActivatedRoute, private teaService:TeacherService) {
    const that = this
    this.activateRoute.queryParams.subscribe(queryParsm => {
      this.member.sid = queryParsm.sid

      // 测试数据
      this.teaService.getMemberBySid(queryParsm.sid).then((resp)=>{
        that.member = resp
        console.log(that.member)
      })
    });
  }
  ionViewWillEnter(){
    
  }

  ngOnInit() {
  }


}
