import { Component } from '@angular/core';
import { Utilisateur } from './client.module';
import { AuthentificationService } from '../authentification.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listeclients',
  templateUrl: './listeclients.component.html',
  styleUrl: './listeclients.component.css'
})
export class ListeclientsComponent {
  clients: Utilisateur[] = [];
  isLoading: boolean = true;
  private apiUrl = 'http://localhost:8080/api/v1/utilisateurs';
  constructor(private authservice: AuthentificationService,private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchClients();
  }
  fetchClients(): void {
    this.http.get<Utilisateur[]>(`${this.apiUrl}/affClients`).subscribe({
      next: (data) => {
        this.clients = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des clients:', err);
        this.isLoading = false;
      }
    });
  }
  onUpdate(client: Utilisateur): void {
    this.http.put<Utilisateur>(`${this.apiUrl}/update/${client.cin}`, client).subscribe({
      next: (response) => {
        alert('Client mis à jour avec succès!');
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du client:', error);
        alert('Échec de la mise à jour du client.');
      }
    });
  }
  onDelete(cin: string): void {
    this.http.delete(`${this.apiUrl}/delete/${cin}`).subscribe({
      next: () => {
        alert('Client supprimé avec succès!');
        this.fetchClients(); 
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du client:', error);
        alert('Échec de la suppression du client.');
      }
    });
  }
}
