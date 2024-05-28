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
      this.cin = sessionStorage.getItem('cin');
      this.utilisateur=sessionStorage.getItem('user');
    }
  }

  onSubmit(): void {
    if (this.authService.isLoggedInC) {
      this.annoncesData.utilisateur = this.cin;
      this.httpclient.post<any>('http://localhost:8080/api/v1/annoncesC/add', this.annoncesData)
        .subscribe({
          next: (response: any) => {
            console.log('Annonce ajoutée avec succès:', response);
            localStorage.setItem('annoncesData', JSON.stringify(response)); 
              localStorage.setItem('idA', response.idA); 
              const storedIdA = localStorage.getItem('idA');
            console.log('Identifiant stocké:', storedIdA);
            alert('Annonce ajoutée avec succès!');
            window.location.reload();
          },
          error: error => {
            console.error("Erreur lors de l'ajout de l'annonce:", error);
            alert("Échec de l'ajout de l'annonce. Veuillez réessayer.");
          }
        });
    } else {
      console.error('Utilisateur non connecté ou Cin non disponible.');
      alert('Vous devez être connecté pour soumettre une annonce.');
    }
  }
  
}