import { Component, Inject, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-form-dialog',
  templateUrl: './post-form-dialog.component.html',
  styleUrls: ['./post-form-dialog.component.css']
})
export class PostFormDialogComponent implements OnInit {
  idA!: number; // Using non-null assertion operator
  email!: string; // Using non-null assertion operator
  annoncesData: any = {
    idAB: '',
    taux: '',
    banquiers: {
      email: ''
    },
    annoncesClient: ''
  };

  constructor(
    private authService: AuthentificationService,
    private httpclient: HttpClient,
    public dialogRef: MatDialogRef<PostFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email')!; // Using non-null assertion operator
    this.idA =this.data.idA;
  }

  onSubmit(): void {
    this.annoncesData.banquiers = {
      email: this.email
    };
    this.annoncesData.annoncesClient = {
      idA: this.idA
    };
    this.httpclient
      .post('http://localhost:8080/api/v1/annoncesB/add', this.annoncesData)
      .subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.dialogRef.close();
          window.location.reload(); // Reload the page
        },
        error: (error) => {
          console.error('Error adding:', error);
          if (error.status === 400) {
            // Handle the case where the banquier has already added two offers
            // You can show an error message or notification to the user
            // For example:
            alert('You have already added two offers for this annonces client.');
          }
        },
      });
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
