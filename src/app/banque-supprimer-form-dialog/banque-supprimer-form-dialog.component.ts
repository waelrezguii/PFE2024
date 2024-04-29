import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-banque-supprimer-form-dialog',
  templateUrl: './banque-supprimer-form-dialog.component.html',
  styleUrls: ['./banque-supprimer-form-dialog.component.css']
})
export class BanqueSupprimerFormDialogComponent implements OnInit {
  banqueForm: FormGroup;
  banques: any[] = [];

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<BanqueSupprimerFormDialogComponent>
  ) {
    // Initialize the form group and control
    this.banqueForm = new FormGroup({
      codeB: new FormControl('', Validators.required)
    });

    // Initialize the banques array
    this.banques = [];

    // Call the getBanques method to fetch the banques data
    this.getBanques();
  }

  ngOnInit(): void {
  }

  getBanques(): void {
    this.http.get<any>('http://localhost:8080/api/v1/banque/affBanques')
      .subscribe(response => {
        this.banques = response;
      });
  }

  onSubmit(): void {
    const codeBControl = this.banqueForm.get('codeB');

    if (this.banqueForm.valid && codeBControl) {
      const codeBValue = codeBControl.value;
      if (codeBValue) { // Ensure that the value is not null
        this.http.delete(`http://localhost:8080/api/v1/banque/supprimerBanque/${codeBValue}`)
          .subscribe({
            next: (response) => {
              console.log('Banque deleted successfully:', response);
              this.dialogRef.close(true);  // Optionally pass back a success indicator
            },
            error: (error) => {
              console.error('Error deleting banque:', error);
            }
          });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}