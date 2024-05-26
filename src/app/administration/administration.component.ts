import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {
  email:string|null=null;
  password:string|null=null;

  constructor(private authService : AuthentificationService){

  }
  login(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        () => {
   
          console.log('Connexion réussie');
        },
        error => {
          console.error('Échec de la connexion:', error);
          let errorMessage = 'Erreur inconnue survenue'; 
          if (error.status === 401) {
            errorMessage = error.error.message; 
          } else if (error.status === 404) {
            errorMessage = 'Email introuvable.';
          }
          console.log(errorMessage);
          alert(errorMessage); 
        }
      );
    } else {
      if (!this.email && !this.password) {
        console.error('Email et mot de passe sont nuls');
        alert('L’email et le mot de passe sont requis');
      } else if (!this.email) {
        console.error('Email est nul');
        alert('L’email est requis');
      } else if (!this.password) {
        console.error('Mot de passe est nul');
        alert('Le mot de passe est requis');
      }
    }
  }
  
  logout():void{
 this.authService.logout();
  }

}
