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
        console.error('Error fetching clients:', err);
        this.isLoading = false;
      }
    });
  }
  onUpdate(client: Utilisateur): void {
    this.http.put<Utilisateur>(`${this.apiUrl}/update/${client.cin}`, client).subscribe({
      next: (response) => {
        alert('Client updated successfully!');
      },
      error: (error) => {
        console.error('Error updating client:', error);
        alert('Failed to update client.');
      }
    });
  }
  onDelete(cin: string): void {
    this.http.delete(`${this.apiUrl}/delete/${cin}`).subscribe({
      next: () => {
        alert('Client deleted successfully!');
        this.fetchClients(); 
      },
      error: (error) => {
        console.error('Error deleting client:', error);
        alert('Failed to delete client.');
      }
    });
  }
}
