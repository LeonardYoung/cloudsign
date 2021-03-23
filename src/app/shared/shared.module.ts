import { LocalStorageService } from './services/local-storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    LocalStorageService
  ]
})
export class SharedModule { }
