import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-portail-banquiers',
  templateUrl: './portail-banquiers.component.html',
  styleUrl: './portail-banquiers.component.css'
})
export class PortailBanquiersComponent {
  email:string|null=null;
  password:string|null=null;
  constructor(private authService:AuthentificationService){

  }
  login(): void {
    if (this.email && this.password) {
      this.authService.loginB(this.email, this.password).subscribe(response => {
        if (response) {
          console.log('Logged in successfully');
        } else {
          console.error('Login failed');
        }
      });
    } else {
      console.error('Email or password is null');
    }
  }
  logout():void{
    this.authService.logoutB();
  }
}
