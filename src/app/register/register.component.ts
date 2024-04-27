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
    if (!this.user.mdp) {
      alert('Veuillez saisir un mot de passe.');
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
    if (!this.user.cin) {
      alert('Veuillez saisir votre CIN.');
      return;
    }
    if (!/^\d{8}$/.test(this.user.cin)) {
      alert('Le CIN doit comporter exactement 8 chiffres.');
      return;
    }
  
    this.emailExists = false;
    this.cinExists = false;
    this.registrationSubscription = this.authService.registerClient(this.user).subscribe({
      next: (response: any) => {
        console.log('Registration successful');
        alert('An email has been sent to your inbox for verification. Please verify your email to complete the registration process.');
        this.router.navigate(['/portailC']);
      },
      error: (error: any) => {
        if (error.message.includes('email')) {
          this.emailExists = true;
          this.errorMessage = error.message;
        } else if (error.message.includes('cin')) {
          this.cinExists = true;
          this.errorMessage = error.message;
        } else {
          console.error('An unexpected error occurred:', error.message || 'An unexpected error occurred');
          this.errorMessage = error.message || 'An unexpected error occurred';
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
