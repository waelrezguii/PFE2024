import { Component, OnInit } from '@angular/core';
import { annonces } from '../historiques/annonces.module';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forum-everyone',
  templateUrl: './forum-everyone.component.html',
  styleUrl: './forum-everyone.component.css'
})
export class ForumEveryoneComponent implements OnInit {
  cin: string | null = null;
  isLoggedInB:boolean=false;

  annoncesC:annonces[]=[];
  annoncesB: annonces[] = [];
  constructor(private httpclient:HttpClient,private authService: AuthentificationService,private router: Router){}
  ngOnInit(): void {
    if (this.authService.isLoggedInC) {
      this.cin = sessionStorage.getItem('cin');
    }
    this.isLoggedInB=this.authService.isLoggedInB;
    this.getAnnoncesC();
    this.getAnnoncesB();

  }
  getAnnoncesC():void{
    this.httpclient.get<annonces[]>(`http://localhost:8080/api/v1/annoncesC/annoncesClient/${this.cin}`).subscribe(data=>
    {
      this.annoncesC=data;
    });
  }
  getAnnoncesB():void{
    if (this.isLoggedInB) {
      this.httpclient.get<annonces[]>("http://localhost:8080/api/v1/annoncesC/annoncesClient").subscribe(data => {
        this.annoncesB = data;
      });
    }
  }

}
