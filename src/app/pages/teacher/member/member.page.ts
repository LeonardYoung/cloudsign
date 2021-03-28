import { ActivatedRoute } from '@angular/router';
import { MemberInfo } from './../vo/member-info';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {

  member: MemberInfo = {
    name: '',
    No: '',
    gender: '',
    school: '',
    depart: '',
    exp: null,
  }
  constructor(private activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(queryParsm => {
      this.member.No = queryParsm.No

      // 测试数据
      this.member = {
        name: '学生666',
        No: '111',
        gender: 'boy',
        school: '福州大学',
        depart: '数计学院',
        exp: 333,
      }
    });
  }

  ngOnInit() {
  }

}
