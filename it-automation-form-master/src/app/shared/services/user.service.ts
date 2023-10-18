import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userList = [
    {value:'veterwc_hsu',label:'User-V****'}
  ];

  currentUser=this._userList[0];

  constructor() {}

  get userList(){
    return this._userList;
  }
}
