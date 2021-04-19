import { serveUrl } from './../../../shared/services/constant';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  httpOptions = { //http请求头
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })//请求头进行转格式，防止出现415错误
  };

  constructor(private http: HttpClient) { }

  
  /**
   * 获取学校列表
   * @param page 页数
   * @returns 
   */
  getSchoolsPage(page:number){
    const api = serveUrl + '/school'
    const params = new HttpParams().set('page',''+page).set('size','10')
    return this.getPage(params,api)
  }
  getCollegePage(sch_code:string,page:number){
    const api = serveUrl + '/college'
    const params = new HttpParams().set('page',''+page).set('size','10').set('sch_code',sch_code)
    return this.getPage(params,api)
  }
  getMajorPage(sch_code:string,co_code:string, page:number){
    const api = serveUrl + '/major'
    const params = new HttpParams().set('page',''+page).set('size','10').set('sch',sch_code).set('col',co_code)
    return this.getPage(params,api)
  }
  getPage(params: HttpParams,api:string){
    const that = this
    return new Promise(function(resolve,reject){
      that.http.get(api,{params}).subscribe((response:any)=>{
        if(response.code == 0){
          resolve(response.data)
        }
        else{
          reject({
            errmsg:response.msg
          })
        }
      },(error)=>{
        reject({
          errmsg: '网络请求失败'
        })
      })
    })
  }
}
