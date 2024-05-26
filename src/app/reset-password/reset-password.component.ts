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
  isError: boolean = false; 

  constructor(
    private authService: AuthentificationService,
    private route: ActivatedRoute,
    private router: Router 
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
        this.router.navigate(['/portailC']); 
      },
      error: (error) => {
        this.message = 'Failed to reset password. ' + error.error.message;
        this.isError = true;
      }
    });
  }
}
