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
    this.emailExists = false;
    this.cinExists = false;
    this.registrationSubscription = this.authService.registerClient(this.user).subscribe({
      next: (response: any) => {
        console.log('Registration successful');
        // Inform the user that an email has been sent for verification
        alert('An email has been sent to your inbox for verification. Please verify your email to complete the registration process.');
        // Optionally, you can navigate the user to a different page or display a message
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
