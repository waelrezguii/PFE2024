import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gestion-annonces',
  templateUrl: './gestion-annonces.component.html',
  styleUrls: ['./gestion-annonces.component.css']
})
export class GestionAnnoncesComponent implements OnInit {

  cin: any;
  utilisateur:any;
  annoncesData = {
    ida:'',
    type: '',
    montant: 0,
    utilisateur:'',
    devise: {
      Codedev: ''
    }
  };

  constructor(private authService: AuthentificationService, private httpclient: HttpClient) {}

  ngOnInit(): void {
    if (this.authService.isLoggedInC) {
      this.cin = localStorage.getItem('cin');
      this.utilisateur=localStorage.getItem('user');
    }
  }

  onSubmit(): void {
    if (this.authService.isLoggedInC) {
      this.annoncesData.utilisateur = this.cin;
      this.httpclient.post<any>('http://localhost:8080/api/v1/annoncesC/add', this.annoncesData)
        .subscribe({
          next: (response: any) => {
            console.log('Announcement added successfully:', response);
            localStorage.setItem('annoncesData', JSON.stringify(response)); 
              localStorage.setItem('idA', response.idA); 
              const storedIdA = localStorage.getItem('idA');
            console.log('Stored idA:', storedIdA);
          },
          error: error => {
            console.error('Error adding announcement:', error);
          }
        });
    } else {
      console.error('User not logged in or Cin not available.');
    }
  }
  
}