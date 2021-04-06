import { AboutUsPage } from './about-us/about-us.page';
import { EditMyInfoPage } from './edit-my-info/edit-my-info.page';
import { AlterPasswardPage } from './alter-passward/alter-passward.page';
import { HomePage } from './home/home.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'alter-passward',
    component: AlterPasswardPage
  },
  {
    path: 'edit',
    component: EditMyInfoPage
  },
  {
    path: 'about',
    component: AboutUsPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeRoutingModule { }
