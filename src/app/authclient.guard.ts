import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class authclientGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedInC) {
      this.router.navigate(['/portailCL']);
      return false;
    }
    return true;
  }
}