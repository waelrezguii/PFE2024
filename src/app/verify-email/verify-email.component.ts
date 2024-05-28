import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnDestroy {
  token: string = '';
  verified: boolean = false;
  errorMessage: string = '';
  private emailVerificationSubscription: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthentificationService, private router: Router) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.token = params.get('token') || ''; 
      if (this.token) {
        this.verifyEmail();
      } else {
        console.error("Erreur: le jeton n'est pas défini");
      }
    });
  }

  verifyEmail(): void {
    if (!this.token) {
      this.errorMessage = 'Le jeton de vérification est manquant. Veuillez réessayer de vous inscrire.';
      return;
    }
  
    this.emailVerificationSubscription = this.authService.verifyEmailToken(this.token).subscribe({
      next: (response: any) => {
        console.log('E-mail vérifié avec succès', response);
        this.verified = true;
    
        this.router.navigate(['/portailC']);
      },
      error: (error: any) => {
        console.error("Erreur lors de la vérification de l'e-mail :", error);
        this.verified = false;
        this.errorMessage = error.message;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.emailVerificationSubscription) {
      this.emailVerificationSubscription.unsubscribe();
    }
  }
}
