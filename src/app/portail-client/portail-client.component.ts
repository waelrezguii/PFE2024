import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-portail-client',
  templateUrl: './portail-client.component.html',
  styleUrl: './portail-client.component.css'
})
export class PortailClientComponent {
  email:string|null=null;
  password:string|null=null;
  constructor(private authService : AuthentificationService)
{}
login(): void {
  if (this.email && this.password) {
    this.authService.loginC(this.email, this.password).subscribe(response => {
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
  this.authService.logoutC();
}
}

