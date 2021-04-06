import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alter-passward',
  templateUrl: './alter-passward.page.html',
  styleUrls: ['./alter-passward.page.scss'],
})
export class AlterPasswardPage implements OnInit {

  constructor() { }

  passwards : any= {
    oldPwd: '',
    newPwd: '',
    confirmPwd: '',
    
  }

  ngOnInit() {
  }
  onClickFinish(){

  }

}
