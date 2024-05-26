import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class authadminsGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}