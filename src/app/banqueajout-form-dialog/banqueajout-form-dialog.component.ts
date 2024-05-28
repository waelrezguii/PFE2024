import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-banqueajout-form-dialog',
  templateUrl: './banqueajout-form-dialog.component.html',
  styleUrls: ['./banqueajout-form-dialog.component.css'] 
})
export class BanqueajoutFormDialogComponent implements OnInit {
  banqueForm: FormGroup;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<BanqueajoutFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.banqueForm = new FormGroup({
      codeB: new FormControl('', [Validators.required]),
      nombanque: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.banqueForm.valid) {
      this.http.post('http://localhost:8080/api/v1/banque/ajouterBanque', this.banqueForm.value, { responseType: 'text' })
        .subscribe({
          next: (response) => {
            console.log('Banque ajoutée avec succès:', response);
            this.dialogRef.close();
          },
          error: (error) => {
            console.error("Erreur lors de l'ajout de la banque:", error);
          }
        });
    } else {
      console.error("Le formulaire n'est pas valide:", this.banqueForm.errors);
    }
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
