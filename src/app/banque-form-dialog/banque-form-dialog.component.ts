import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import{MAT_DIALOG_DATA, MatDialogRef} from'@angular/material/dialog';
@Component({
  selector: 'app-banque-form-dialog',
  templateUrl: './banque-form-dialog.component.html',
  styleUrl: './banque-form-dialog.component.css'
})
export class BanqueFormDialogComponent {
  banqueData = {
    email: '',
    mdp: '',
    codeB:''
  };

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<BanqueFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  onSubmit(): void {
    this.http.post('http://localhost:8080/api/v1/banquiers/ajouterBanquiers', this.banqueData)
      .subscribe({
        next: response => {
          console.log('Banque added successfully:', response);
          this.dialogRef.close();
        },
        error: error => {
          console.error('Error adding banque:', error);
          // Handle error as needed
        }
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
