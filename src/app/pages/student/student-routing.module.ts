import { StuSigninOneKeyPage } from './stu-signin-one-key/stu-signin-one-key.page';
import { StuSigninGesturePage } from './stu-signin-gesture/stu-signin-gesture.page';
import { StuCourseListPage } from './stu-course-list/stu-course-list.page';
import { JoinCoursePage } from './join-course/join-course.page';
import { CourseDetailPage } from './course-detail/course-detail.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'list'
  },
  {
    path:'detail',
    component: CourseDetailPage
  },
  {
    path:'join',
    component: JoinCoursePage
  },
  {
    path:'list',
    component: StuCourseListPage
  },
  {
    path:'gesture',
    component: StuSigninGesturePage
  },
  {
    path:'onekey',
    component: StuSigninOneKeyPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
