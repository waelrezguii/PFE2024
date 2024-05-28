import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-form-dialog',
  templateUrl: './post-form-dialog.component.html',
  styleUrls: ['./post-form-dialog.component.css']
})
export class PostFormDialogComponent implements OnInit {
  idA!: number;
  email!: string;
  taux!: number;
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
    this.email = sessionStorage.getItem('email')!; 
    this.idA = this.data.idA;
  }

  validateForm(): boolean {
    if (this.taux == null || this.taux <= 0) {
      this.errorMessage = 'Le taux ne doit pas être nul, négatif ou égal à zéro';
      return false;
    }

    this.errorMessage = ''; 
    return true;
  }

  onSubmit(): void {
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
      .post('http://localhost:8080/api/v1/annoncesB/add', this.annoncesData)
      .subscribe({
        next: (response) => {
          console.log('Succès:', response);
          this.dialogRef.close();
          window.location.reload();
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout:", error);
          if (error.status === 400) {
            alert(error.error);
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
