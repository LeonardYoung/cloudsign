import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { SigninTotalPage } from './signin-total/signin-total.page';
import { SigninRecordPage } from './signin-record/signin-record.page';
import { SigninDetailPage } from './signin-detail/signin-detail.page';
import { MemberPage } from './member/member.page';
import { CourseInfoPage } from './course-info/course-info.page';
import { CourseAddPage } from './course-add/course-add.page';
import { CourseListPage } from './course-list/course-list.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    TeacherRoutingModule,
    SharedModule,
    FormsModule,
    IonicModule,
    QRCodeModule
  ],
  declarations: [
    CourseListPage,
    CourseAddPage,
    CourseInfoPage,
    MemberPage,
    SigninDetailPage,
    SigninRecordPage,
    SigninTotalPage
  ],
  
})
export class TeacherModule { }
