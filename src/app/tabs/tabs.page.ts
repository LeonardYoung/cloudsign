import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  // private auth:number = 0;
  constructor(private route: Router) {}

  onClickMe(){
    this.route.navigateByUrl('/tabs/me')
  }

}
