import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-portail-clogged',
  templateUrl: './portail-clogged.component.html',
  styleUrls: ['./portail-clogged.component.css']
})
export class PortailCLoggedComponent implements OnInit {
  nom: string | null = null;
  prenom: string | null = null;

  constructor(private authService: AuthentificationService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedInC) {
      this.nom = sessionStorage.getItem('nom');
      this.prenom = sessionStorage.getItem('prenom');
    }
  }

  getFullName(): string {
    if (this.nom && this.prenom) {
      return `Bienvenue, ${this.nom} ${this.prenom} !`;
    } else if (this.nom) {
      return `Bienvenue, ${this.nom} !`;
    } else if (this.prenom) {
      return `Bienvenue, ${this.prenom} !`;
    } else {
      return '';
    }
  }
}
