import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoauthGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if ( !this.authService.isLoggedIn() ) {
        //router.navigate(['/dashboard']);
        return true;
      } else {
        this.router.navigate(['/dashboard']);
      }
      return false;
    // return true;
  }
  
}
