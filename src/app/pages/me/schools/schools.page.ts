import { Router } from '@angular/router';
import { MajorVo } from './../vo/majorVo';
import { CollegeVo } from './../vo/collegeVo';
import { MeService } from './../services/me.service';
import { SchoolVo } from './../vo/schoolVo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.page.html',
  styleUrls: ['./schools.page.scss'],
})
export class SchoolsPage implements OnInit {

  @ViewChild('schoolSlides', { static: true }) schoolSlides: IonSlides;
  constructor(private meService: MeService, private toastCtl: ToastController,private router: Router) { }

  titles: string[] = [
    '选择学校',
    '选择学院',
    '选择专业'
  ]
  schoolData: any = {
    allLoaded: false,
    curPage: 1
  }
  schoolList: SchoolVo[] = []

  collegeData: any = {
    allLoaded: false,
    curPage: 1
  }
  collegeList: CollegeVo[] = []

  majorData: any = {
    allLoaded: false,
    curPage: 1
  }
  majorList: MajorVo[] = []


  curChoice = [
    {
      code: null,
      name: null
    },
    {
      code: null,
      name: null
    },
    {
      code: null,
      name: null
    },
  ]
  curSlideIndex = 0;

  toast: any = null;

  async ngOnInit() {
    this.schoolSlides.lockSwipeToNext(true)
    this.schoolSlides.lockSwipeToPrev(true)

    this.toast = await this.toastCtl.create({
      message: '',
      duration: 1500,
      position: 'top'
    });

    this.meService.getSchoolsPage(1).then((resp: any) => {
      this.schoolList = this.schoolList.concat(resp.pageData)
      console.log(this.schoolList)
    }).catch(err => {
      this.toast.message = err.errmsg
      this.toast.present()
    })
    this.curSlideIndex = 0;
  }
  /**
   * 上一页
   */
  onClickBack() {
    if(this.curSlideIndex == 0){
      this.router.navigateByUrl('/tabs/me/edit')
      return
    }
    this.schoolSlides.lockSwipeToPrev(false)
    this.schoolSlides.slidePrev()
    this.schoolSlides.lockSwipeToPrev(true)
    this.curSlideIndex--;
  }
  /**
   * 下一页
   */
  toNextSlide() {
    this.schoolSlides.lockSwipeToNext(false)
    this.schoolSlides.slideNext()
    this.schoolSlides.lockSwipeToNext(true)
    this.curSlideIndex ++;
  }
  /**
   * 点击学校
   * @param schCode 
   */
  onClickSchool(sch) {
    //保存当前学校选择
    this.curChoice[0].name = sch.schName
    this.curChoice[0].code = sch.schCode
    //清空上一次的学院选择
    this.collegeList = [];
    this.collegeData = {
      allLoaded: false,
      curPage: 1
    }
    this.toNextSlide()

    this.meService.getCollegePage(sch.schCode, 1).then((resp: any) => {
      this.collegeList = this.collegeList.concat(resp.pageData)
    }).catch(err => {
      this.toast.message = err.errmsg
      this.toast.present()
    })
  }

  /**
   * 点击学院
   * @param colCode 
   */
  onClickCollege(co) {
    //保存当前学院选择
    this.curChoice[1].name = co.colName
    this.curChoice[1].code = co.colCode
    //清空上一次的专业选择
    this.majorList = [];
    this.majorData = {
      allLoaded: false,
      curPage: 1
    }
    this.toNextSlide()

    this.meService.getMajorPage(this.curChoice[0].code, co.colCode, 1).then((resp: any) => {
      this.majorList = this.majorList.concat(resp.pageData)
    }).catch(err => {
      this.toast.message = err.errmsg
      this.toast.present()
    })
  }
  /**
   * 点击专业
   * @param ma 专业
   */
  onClickMajor(ma) {
    //保存当前专业选择
    this.curChoice[2].name = ma.majName
    this.curChoice[2].code = ma.majCode
    
    console.log(this.curChoice)
    this.meService.saveSchoolsChoice(this.curChoice)
    let url = ' '
    if( this.meService.schoolsChoiceFrom == 'course'){
      url = '/tabs/teacher/add'
      this.meService.schoolsChoiceFrom = 'me'
    }
    else{
      url = '/tabs/me/edit'
    }
    this.router.navigate([url],{
      queryParams:{
        schoolChange:true
      }
    })
  }


  async onInfiniteSchool(event) {
    if(this.curSlideIndex != 0){
      event.target.complete()
      return;
    }

    this.schoolData.curPage++;
    this.meService.getSchoolsPage(this.schoolData.curPage).then((resp: any) => {
      this.schoolList = this.schoolList.concat(resp.pageData)
      event.target.complete()
    }).catch(err => {
      this.toast.message = err.errmsg
      this.toast.present()
    })
  }
  onInfiniteCollege(event) {
    if(this.curSlideIndex != 1){
      event.target.complete()
      return;
    }
    this.collegeData.curPage++;
    this.meService.getCollegePage(this.curChoice[0].code,this.collegeData.curPage).then((resp: any) => {
      this.collegeList = this.collegeList.concat(resp.pageData)
      event.target.complete()
    }).catch(err => {
      this.toast.message = err.errmsg
      this.toast.present()
    })
  }
  onInfiniteMajor(event){
    if(this.curSlideIndex != 2){
      event.target.complete()
      return;
    }
    this.majorData.curPage++;
    this.meService.getMajorPage(this.curChoice[0].code,this.curChoice[1].code,this.majorData.curPage).then((resp: any) => {
      this.majorList = this.majorList.concat(resp.pageData)
      event.target.complete()
    }).catch(err => {
      this.toast.message = err.errmsg
      this.toast.present()
    })
  }

}
