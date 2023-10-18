import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, mapToCanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if(!this.userService.currentUser){
        alert("Please select the user!");
        // 未選擇使用者，返回首頁
        this.router.navigate(['/']);
      }
    return this.userService.currentUser?true:false;
  }
}

export const authGuard = mapToCanActivate([AuthGuard])
