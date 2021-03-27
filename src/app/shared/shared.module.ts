import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from './services/local-storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers:[
    LocalStorageService
  ],
  exports: [
    CommonModule,
    FormsModule,  // 添加
    IonicModule
  ]
})
export class SharedModule { }
