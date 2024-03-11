import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isLoggedInC: boolean = false;

  constructor(private authService: AuthentificationService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isLoggedInC=this.authService.isLoggedInC;
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
  logoutC(): void {
    this.authService.logoutC();
    this.isLoggedInC = false;
  }
}
