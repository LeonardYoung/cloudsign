import { Injectable } from '@angular/core';

export const UID_KEY='UID'
export const USER_TYPE_KEY='Usertype'
export const USER_INFO_KEY='Userinfo'


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorage = window.localStorage;
  constructor() { }

  get(key: string, defaultValue: any): any {
    this.checkKey(key);
    let value: any = this.localStorage.getItem(key);
    try{
      value = JSON.parse(value);
    } catch (error) {
      value = null;
    }
    if (value === null && defaultValue) {
      value = defaultValue;
    }
    return value;
  }

  insert(key: string, value: any) {
    this.checkKey(key);
    this.set(key, value);
  }

  set(key: string, value: any) {
    this.checkKey(key);
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this.checkKey(key);
    this.localStorage.removeItem(key);
  }
  checkKey(key: string){
    if (key === 'undefined'){
      throw new Error('null key passed');
    }
    if (key.length === 0){
      throw new Error('lenth of key is 0');
    }
  }
}


