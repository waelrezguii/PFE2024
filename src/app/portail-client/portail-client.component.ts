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
    this.authService.loginC(this.email, this.password).subscribe(
      response => {
        if (response.user) {
          console.log('Connexion réussie');
        }
      },
      error => {
        let message = 'Une erreur inconnue est survenue.';
        if (error.error.message === "L'email n'existe pas dans notre système.") {
          message = "L'email n'existe pas dans notre système.";
        } else if (error.error.message === "Le mot de passe est incorrect.") {
          message = "Le mot de passe est incorrect.";
        } else if (error.status === 404) {
          message = 'Utilisateur non trouvé.';
        }else if (error.status === 403) {
          alert('Votre compte n\'est pas encore vérifié. Veuillez vérifier votre e-mail pour le processus de vérification.');
        }
       // alert(message);
      }
    );
  } else {
    if (!this.email && !this.password) {
      console.error('Email et mot de passe sont requis');
      alert('Veuillez entrer l’email et le mot de passe.');
    } else if (!this.email) {
      console.error('L’email est requis');
      alert('Veuillez entrer l’email.');
    } else if (!this.password) {
      console.error('Le mot de passe est requis');
      alert('Veuillez entrer le mot de passe.');
    }
  }
}

logout():void{
  this.authService.logoutC();
}
}

