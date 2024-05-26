import { Component, OnDestroy } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  user: any = {};
  emailExists: boolean = false;
  cinExists: boolean = false;
  errorMessage: string = '';
  private registrationSubscription: Subscription | undefined;

  constructor(private authService: AuthentificationService, private router: Router) {}

  registerClient(): void {
    if (!this.user.email) {
      alert('Veuillez saisir une adresse e-mail.');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.user.email)) {
        alert('Le format de l’adresse e-mail est invalide.');
        return;
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!this.user.mdp || !passwordRegex.test(this.user.mdp)) {
        alert('Le mot de passe doit comporter au moins 8 caractères et inclure au moins une lettre majuscule, un caractère spécial et un chiffre.');
        return;
    }
    if (!this.user.nom) {
      alert('Veuillez saisir votre nom.');
      return;
    }
    if (!this.user.prenom) {
      alert('Veuillez saisir votre prénom.');
      return;
    }
    if (!this.user.cin || !/^\d{8}$/.test(this.user.cin)) {
      alert('Le CIN doit comporter exactement 8 chiffres.');
      return;
    }

    this.emailExists = false;
    this.cinExists = false;
    this.registrationSubscription = this.authService.registerClient(this.user).subscribe({
      next: (response: any) => {
        console.log('Inscription réussie');
        alert('Un e-mail de vérification a été envoyé à votre adresse. Veuillez vérifier votre e-mail pour compléter le processus d’inscription.');
        this.router.navigate(['/portailC']);
      },
      error: (error: any) => {
        if (error.error && error.error.error) {
          this.errorMessage = error.error.error;
          alert(this.errorMessage);
        } else {
          console.error('Une erreur inattendue est survenue :', error.message || 'Une erreur inattendue est survenue');
          this.errorMessage = error.message || 'Une erreur inattendue est survenue';
          alert(this.errorMessage);
        }
      }
    });
  }
  

  ngOnDestroy(): void {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }
}
