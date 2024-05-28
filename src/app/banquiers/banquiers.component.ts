import { Component, OnInit } from '@angular/core';
import { Banquier } from './banquier.model';
import { AuthentificationService } from '../authentification.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-banquiers',
  templateUrl: './banquiers.component.html',
  styleUrl: './banquiers.component.css'
})
export class BanquiersComponent implements OnInit {
  banquiers: Banquier[] = [];
  isDataLoaded: boolean = false;
  constructor(private authservice: AuthentificationService,private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchBanquiers();
  }

  fetchBanquiers(): void {
    this.http.get<Banquier[]>('http://localhost:8080/api/v1/banquiers/affBanquiers').subscribe(
      data => {
        this.banquiers = data;
        this.isDataLoaded = true; 
      },
      error => {
        console.error('Erreur lors de la récupération des banquiers:', error);
        this.isDataLoaded = false; 
      }
    );
  }
  deleteBanquier(email: string): void {
    this.http.delete(`http://localhost:8080/api/v1/banquiers/delete/${email}`, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
          alert('Le banquier a été supprimé avec succès !');
          this.fetchBanquiers();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du banquier:', error);
          alert('Échec de la suppression du banquier');
        }
      });
  }
  
}
