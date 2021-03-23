import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {

  constructor(private localStorage: LocalStorageService) {
    // this.users = this.localStorage.get(USER_KEY, []);
  }
}
