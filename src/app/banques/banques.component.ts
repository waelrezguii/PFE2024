import { Component, OnInit } from '@angular/core';
import { banque } from './banques.module';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import { MatDialog } from '@angular/material/dialog';
import { BanqueFormDialogComponent } from '../banque-form-dialog/banque-form-dialog.component';
import { BanqueajoutFormDialogComponent } from '../banqueajout-form-dialog/banqueajout-form-dialog.component';
import { BanqueSupprimerFormDialogComponent } from '../banque-supprimer-form-dialog/banque-supprimer-form-dialog.component';

@Component({
  selector: 'app-banques',
  templateUrl: './banques.component.html',
  styleUrls: ['./banques.component.css']
})
export class BanquesComponent implements OnInit {
  banques: banque[] = []; // Initialize the property here
  isLoggedIn: boolean = false;

  constructor(private httpclient: HttpClient,private authService:AuthentificationService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;

    this.getBanques();

  }

  getBanques(): void {
    this.httpclient.get<any>('http://localhost:8080/api/v1/banque/affBanques').subscribe(
      response=>{
        console.log(response);
        this.banques=response;
      }
    );
    
  }
  Ajouter(): void {
    const dialogRef = this.dialog.open(BanqueFormDialogComponent, {
      width: '400px',
      data: {} // You can pass initial data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Refresh the list of banks or perform any other actions after dialog is closed
      this.getBanques();
    });
  }
  add(): void {
    const dialogRef = this.dialog.open(BanqueajoutFormDialogComponent, {
      width: '400px',
      data: {} // You can pass initial data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Refresh the list of banks or perform any other actions after dialog is closed
      this.getBanques();
    });
  }
  deleteBanque(codeB: string): void {
    this.httpclient.delete('http://localhost:8080/api/v1/banque/supprimerBanque/' + codeB, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('Banque deleted successfully:', response);
          this.getBanques(); // Refresh the list of banques
        },
        error: (error) => {
          console.error('Error occurred while deleting the banque:', error);
        }
      });
  }
  
  
}
