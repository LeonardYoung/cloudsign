import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MeService } from './../services/me.service';
import { PersonalInfoVo } from './../vo/personal-Info-vo';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LocalStorageService, USER_INFO_KEY, USER_TYPE_KEY } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-edit-my-info',
  templateUrl: './edit-my-info.page.html',
  styleUrls: ['./edit-my-info.page.scss'],
})
export class EditMyInfoPage implements OnInit ,AfterViewInit{

  pInfo :PersonalInfoVo = {
    // name:'',
    // phone:'',
    // gender:'',
    // identity:''
  }


  // userInfo:any = null;
  userType:any = null;
  constructor(private meService: MeService,private localService:LocalStorageService,
    private router:Router,private toastCtl :ToastController,private nav: NavController,
    private activeRouter: ActivatedRoute) {
      const localInfo = this.meService.getPInfo()
      Object.assign(this.pInfo,localInfo)
      console.log(this.pInfo)
      
     }

  async ngOnInit() {
    console.log('edit page init')
    this.userType = this.localService.get(USER_TYPE_KEY,null)
    const that = this

    this.activeRouter.queryParams.subscribe(queryParsm => {
      if(queryParsm.schoolChange){
        const schoolChoice = that.meService.getSchoolsChoice()
        that.pInfo.schoolCode = schoolChoice[0].code
        that.pInfo.schoolName = schoolChoice[0].name

        that.pInfo.collegeCode = schoolChoice[1].code
        that.pInfo.collegeName = schoolChoice[1].name

        that.pInfo.majorCode = schoolChoice[2].code
        that.pInfo.majorName = schoolChoice[2].name

        console.log(schoolChoice)
        console.log(that.pInfo)
      }
   });
    
    
    
  }
  ngAfterViewInit(){
    // this.pInfo = this.meService.getPInfo()
  }
  onClickSchools(){
    this.nav.navigateForward('/tabs/me/schools')
  }
  
  async onClickFinish(){
    const toast = await this.toastCtl.create({
      duration: 1000,
      position: 'top'
    });
    const that = this
    this.meService.sendUserUpdate(this.pInfo).then(resp=>{
      toast.message = '更新成功'
      toast.present()
      that.meService.setPInfo(that.pInfo)
    }).catch(err=>{
      toast.message = err.errmsg
      toast.present()
    })
  }
  onClickBack(){
    this.router.navigateByUrl('/tabs/me')

  }

}
