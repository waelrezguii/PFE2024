import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class authBqGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedInB) {
      this.router.navigate(['/portailBlogged']);
      return false;
    }
    return true;
  }
}

