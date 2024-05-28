import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class clientAuthGuard implements CanActivate {

  constructor(private authService: AuthentificationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedInC || this.authService.isLoggedInB ) {
      return true;
    } else {
      this.router.navigate([this.authService.isLoggedInC ? '/portailC' : 'portailB']);
      return false;
    }
  }
}

