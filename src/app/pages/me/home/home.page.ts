import { MeService } from './../services/me.service';
import { LocalStorageService, USER_INFO_KEY, USER_TYPE_KEY } from './../../../shared/services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userInfo:any = null;
  userType:string = null;
  constructor(private localService: LocalStorageService,private meService: MeService) { }

  ngOnInit() {
    // this.userInfo = this.localService.get(USER_INFO_KEY,{})
    this.userType = this.localService.get(USER_TYPE_KEY,{})
    this.userInfo = this.meService.getPInfo();
    
  }

}
