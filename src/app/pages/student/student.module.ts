import { SharedModule } from './../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { StuSigninOneKeyPage } from './stu-signin-one-key/stu-signin-one-key.page';
import { StuSigninGesturePage } from './stu-signin-gesture/stu-signin-gesture.page';
import { StuCourseListPage } from './stu-course-list/stu-course-list.page';
import { JoinCoursePage } from './join-course/join-course.page';
import { CourseDetailPage } from './course-detail/course-detail.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@NgModule({
  declarations: [
    CourseDetailPage,
    JoinCoursePage,
    StuCourseListPage,
    StuSigninGesturePage,
    StuSigninOneKeyPage
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
  ],
  providers: [
    BarcodeScanner,
  ],
})
export class StudentModule { }
