import { CommonService } from './services/common.service';
import { CourseItemComponent } from './component/course-item/course-item.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from './services/local-storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDirective } from './directives/confirm.directive';



@NgModule({
  declarations: [
    CourseItemComponent,
    ConfirmDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers:[
    LocalStorageService,
    CommonService
  ],
  exports: [
    CommonModule,
    FormsModule,  // 添加
    IonicModule,
    CourseItemComponent,
    ConfirmDirective
  ]
})
export class SharedModule { }
