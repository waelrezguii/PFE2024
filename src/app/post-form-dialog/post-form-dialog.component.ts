import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-form-dialog',
  templateUrl: './post-form-dialog.component.html',
  styleUrls: ['./post-form-dialog.component.css']
})
export class PostFormDialogComponent implements OnInit {
  idA!: number; // Non-null assertion operator
  email!: string; // Non-null assertion operator
  taux!: number; // Declare taux as a number
  errorMessage: string = '';

  annoncesData: any = {
    idAB: '',
    taux: '',
    banquiers: {
      email: ''
    },
    annoncesClient: ''
  };

  constructor(
    private httpclient: HttpClient,
    public dialogRef: MatDialogRef<PostFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email')!; // Using non-null assertion operator
    this.idA = this.data.idA;
  }

  // Validation function
  validateForm(): boolean {
    if (this.taux == null || this.taux <= 0) {
      this.errorMessage = 'Le taux ne doit pas être nul, négatif ou égal à zéro';
      return false;
    }

    this.errorMessage = ''; // Clear previous errors
    return true;
  }

  onSubmit(): void {
    // Validate the form data before submission
    if (!this.validateForm()) {
      alert(this.errorMessage);
      return;
    }

    this.annoncesData.banquiers = {
      email: this.email
    };
    this.annoncesData.annoncesClient = {
      idA: this.idA
    };
    this.annoncesData.taux = this.taux;

    this.httpclient
      .post('http://localhost:8080/api/v1/annonces-banquiers/add', this.annoncesData)
      .subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.dialogRef.close();
          window.location.reload(); // Reload the page
        },
        error: (error) => {
          console.error('Error adding:', error);
          if (error.status === 400) {
            alert(error.error); // Show backend error message directly
          } else {
            alert('Erreur inconnue. Veuillez réessayer.');
          }
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
