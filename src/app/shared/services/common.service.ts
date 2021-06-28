import { serveUrl } from './constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private dev:boolean = false;
  // private dev:boolean = true;

  constructor() { }


  transferUrl(origin:string){
    if(this.dev){
      return '/api' + origin
    }
    else{
      return  serveUrl + '/api' + origin
    }
  }
}
