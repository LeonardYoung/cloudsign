import { HomePage } from './home/home.page';
import { EditMyInfoPage } from './edit-my-info/edit-my-info.page';
import { AlterPasswardPage } from './alter-passward/alter-passward.page';
import { AboutUsPage } from './about-us/about-us.page';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeRoutingModule } from './me-routing.module';


@NgModule({
  declarations: [
    AboutUsPage,
    AlterPasswardPage,
    EditMyInfoPage,
    HomePage
  ],
  imports: [
    CommonModule,
    MeRoutingModule,
    SharedModule
  ]
})
export class MeModule { }
