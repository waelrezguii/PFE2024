import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  isError: boolean = false;
  constructor(private authService: AuthentificationService) {}

  submitEmail() {
    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.message = 'Le lien de récupération a été envoyé.';
        this.isError = false;
      },
      error: (error) => {
        this.message = error.message;
        this.isError = true;
      }
    });
  }
}
