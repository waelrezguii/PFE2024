import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {
  email:string|null=null;
  password:string|null=null;

  constructor(private authService : AuthentificationService){

  }
  login():void{
    if (this.email && this.password) {
      this.authService.login(this.email, this.password);
    } else {
      console.error('Email or password is null');
    }

  }
  logout():void{
 this.authService.logout();
  }

}
