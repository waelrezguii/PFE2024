import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../authentification.service';
import { HttpClient } from '@angular/common/http';
import { utilisateur } from '../register/utilisateur.model';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-gestion-annonces',
  templateUrl: './gestion-annonces.component.html',
  styleUrls: ['./gestion-annonces.component.css']
})
export class GestionAnnoncesComponent implements OnInit {
  cin: any;
  utilisateur:any;
  annoncesData = {
    type: '',
    montant: 0,
    utilisateur:'' // Include the 'cin' property here
  };

  constructor(private authService: AuthentificationService, private httpclient: HttpClient) {}

  ngOnInit(): void {
    if (this.authService.isLoggedInC) {
      this.cin = localStorage.getItem('cin');
      this.utilisateur=localStorage.getItem('user');
    }
  }

  onSubmit(): void {
    if (this.authService.isLoggedInC ) {
      // Set the cin property
      this.annoncesData.utilisateur = this.cin;
  
      // Send the data to the server
      this.httpclient.post('http://localhost:8080/api/v1/annoncesC/add', this.annoncesData)
        .subscribe({
          next: response => {
            console.log('Announcement added successfully:', response);
            // Optionally, reset the form or perform other actions upon success
          },
          error: error => {
            console.error('Error adding announcement:', error);
            // Handle the error as needed
          }
        });
    } else {
      console.error('User not logged in or Cin not available.');
      // Handle the case where the user is not logged in or Cin is not available
    }
  }
}