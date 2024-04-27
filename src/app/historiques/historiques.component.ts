import { Component, OnInit } from '@angular/core';
import { annonces } from './annonces.module';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-historiques',
  templateUrl: './historiques.component.html',
  styleUrl: './historiques.component.css'
})
export class HistoriquesComponent implements OnInit {
annonces:annonces[]=[];
isLoggedIn: boolean = false;
cin:any;
constructor(private httpclient: HttpClient,private authService:AuthentificationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
this.cin=localStorage.getItem('cin');
    this.getAnnonces();

  }
getAnnonces():void{
  this.httpclient.get<annonces[]>(`http://localhost:8080/api/v1/annoncesC/annoncesClient/${this.cin}`).subscribe(data=>
  {
    this.annonces=data;
  });
}
}
