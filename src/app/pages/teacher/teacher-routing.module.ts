import { SigninDetailPage } from './signin-detail/signin-detail.page';
import { SigninTotalPage } from './signin-total/signin-total.page';
import { SigninRecordPage } from './signin-record/signin-record.page';
import { MemberPage } from './member/member.page';
import { CourseInfoPage } from './course-info/course-info.page';
import { CourseAddPage } from './course-add/course-add.page';
import { CourseListPage } from './course-list/course-list.page';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'list',
    component:CourseListPage
  },
  {
    path:'add',
    component:CourseAddPage
  },
  {
    path: 'info',
    component:CourseInfoPage
  },
  {
    path: 'member',
    component:MemberPage
  },
  {
    path: 'signin-record',
    component:SigninRecordPage
  },
  {
    path: 'signin-total',
    component:SigninTotalPage
  },
  {
    path: 'signin-detail',
    component:SigninDetailPage
  },
  {
    path: 'action',
    loadChildren: () => import('./signin-action/signin-action.module').then( m => m.SigninActionModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
