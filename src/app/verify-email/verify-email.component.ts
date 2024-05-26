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
        console.error('Error: token is undefined');
      }
    });
  }

  verifyEmail(): void {
    if (!this.token) {
      this.errorMessage = 'The verification token is missing. Please try registering again.';
      return;
    }
  
    this.emailVerificationSubscription = this.authService.verifyEmailToken(this.token).subscribe({
      next: (response: any) => {
        console.log('Email verified successfully', response);
        this.verified = true;
    
        this.router.navigate(['/portailC']);
      },
      error: (error: any) => {
        console.error('Error verifying email:', error);
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
