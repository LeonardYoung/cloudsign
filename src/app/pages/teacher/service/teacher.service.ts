import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor() { }

  courseAddReq(){
    console.log('course add')
  }
}
