import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  devises:any[]=[];
  isLoggedIn: boolean = false;
  isLoggedInC: boolean = false;
isLoggedInB:boolean=false;
  constructor(private http:HttpClient,private authService: AuthentificationService) {
    
  }
  ngOnInit(): void {
   this.LoadDevises();
   this.isLoggedIn = this.authService.isLoggedIn;
   this.isLoggedInC=this.authService.isLoggedInC;
   this.isLoggedInB=this.authService.isLoggedInB;
  }
LoadDevises():void{
  const url='http://localhost:8080/api/v1/devise/all';
  this.http.get<any[]>(url).subscribe(devises =>
    {
this.devises=devises;
    });

}
logout(): void {
  this.authService.logout();
  this.isLoggedIn = false;
}
logoutC(): void {
  this.authService.logoutC();
  this.isLoggedInC = false;
}
logoutB():void{
  this.authService.logoutB();
  this.isLoggedInB=false;
}
}
