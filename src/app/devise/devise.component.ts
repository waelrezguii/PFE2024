import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { MatDialog } from '@angular/material/dialog';
import { AjoutdevComponent } from '../ajoutdev/ajoutdev.component';

@Component({
  selector: 'app-devise',
  templateUrl: './devise.component.html',
  styleUrl: './devise.component.css'
})
export class DeviseComponent implements OnInit {
  devises:any[]=[];
  isLoggedIn: boolean = false;

  constructor(private http:HttpClient,private authService:AuthentificationService,public dialog:MatDialog) {
    
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;

   this.LoadDevises();
  }
LoadDevises():void{
  const url='http://localhost:8080/api/v1/devise/all';
  this.http.get<any[]>(url).subscribe(devises =>
    {
this.devises=devises;
    });

}
Ajouter(): void {
  const dialogRef = this.dialog.open(AjoutdevComponent, {
    width: '400px',
    data: {} // You can pass initial data if needed
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Refresh the list of banks or perform any other actions after dialog is closed
    this.LoadDevises();
  });
}
}
