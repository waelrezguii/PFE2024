import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BanqueajoutFormDialogComponent } from '../banqueajout-form-dialog/banqueajout-form-dialog.component';

@Component({
  selector: 'app-ajoutdev',
  templateUrl: './ajoutdev.component.html',
  styleUrl: './ajoutdev.component.css'
})
export class AjoutdevComponent implements OnInit{
  devForm: FormGroup;
  
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<BanqueajoutFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.devForm = new FormGroup({
      codedev: new FormControl('', [Validators.required]),
      nomdevise: new FormControl('', [Validators.required]),
      drapeau: new FormControl('', [Validators.required]),
      libelle: new FormControl('', [Validators.required])

    });
  }

  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.devForm.valid) {
      this.http.post('http://localhost:8080/api/v1/devise/ajouterDevise', this.devForm.value, { responseType: 'text' })
        .subscribe({
          next: (response) => {
            console.log('La devise a été ajoutée avec succès:', response);
            this.dialogRef.close();
          },
          error: (error) => {
            console.error('Erreur:', error);
          }
        });
    } else {
      console.error('Form is not valid:', this.devForm.errors);
    }
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
