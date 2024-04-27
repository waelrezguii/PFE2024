import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-portail-blogged',
  templateUrl: './portail-blogged.component.html',
  styleUrl: './portail-blogged.component.css'
})
export class PortailBloggedComponent implements OnInit {
constructor(private authService:AuthentificationService){
}
  ngOnInit(): void {
  
  }

  getAdminB(): string {
    const user = JSON.parse(localStorage.getItem('user2') || '{}');
    if (user.banque.codeB) {
      return `Bienvenue, Admin ${user.banque.codeB} !`;
    } else {
      return '';
    }
  }

}
