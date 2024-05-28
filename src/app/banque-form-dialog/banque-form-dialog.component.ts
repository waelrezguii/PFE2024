import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { banque } from '../banques/banques.module';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-banque-form-dialog',
  templateUrl: './banque-form-dialog.component.html',
  styleUrls: ['./banque-form-dialog.component.css']
})
export class BanqueFormDialogComponent implements OnInit {
  codeB:any;
  banqueData: {
    email: '';
    mdp: '';
    banque:banque;
  };

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<BanqueFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthentificationService
  ) {
    this.banqueData = {
      email: '',
      mdp: '',
      banque: {
        codeB: '',
        nombanque: ''
      }
    };
  }
  ngOnInit(): void {
  }

  onSubmit(): void {
    this.banqueData.banque = {
      codeB: this.codeB,
      nombanque: ''
    };
    this.http.post('http://localhost:8080/api/v1/banquiers/ajouterBanquiers', this.banqueData)
      .subscribe({
        next: response => {
          console.log('Banque ajoutée avec succès:', response);
          this.dialogRef.close();
        },
        error: error => {
          console.error("Erreur lors de l'ajout de la banque :", error);
        }
      });
    console.log(this.banqueData);
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  
}