import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  message: string = '';
  isError: boolean = false; // This will control the class of the alert

  constructor(
    private authService: AuthentificationService,
    private route: ActivatedRoute,
    private router: Router // Inject the Router service
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token')!;
    });  }

  resetPassword() {
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        this.message = 'Password has been reset successfully.';
        this.isError = false;
        // Navigate to portailC after successful password reset
        this.router.navigate(['/portailC']); // Adjust the route as needed
      },
      error: (error) => {
        this.message = 'Failed to reset password. ' + error.error.message;
        this.isError = true;
      }
    });
  }
}
