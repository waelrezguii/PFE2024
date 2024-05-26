import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portail-banquiers',
  templateUrl: './portail-banquiers.component.html',
  styleUrl: './portail-banquiers.component.css'
})
export class PortailBanquiersComponent {
  email:string|null=null;
  password:string|null=null;
  constructor(private authService:AuthentificationService,  private router: Router){

  }
  
  login(): void {
    if (!this.email) {
      alert('Veuillez saisir une adresse e-mail.');
      return;
    }
    if (!this.password) {
      alert('Veuillez saisir un mot de passe.');
      return;
    }

    this.authService.loginB(this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/portailBlogged']); 
      },
      error: (error) => {
     
        if (error.error.error === 'Email not found') {
          alert('L\'adresse e-mail n\'existe pas.');
        } else if (error.error.error === 'Incorrect password') {
          alert('Le mot de passe est incorrect.'); 
        } else {
          alert('Une erreur inconnue est survenue.'); 
        }
      }
    });
  }
  logout():void{
    this.authService.logoutB();
  }
}
