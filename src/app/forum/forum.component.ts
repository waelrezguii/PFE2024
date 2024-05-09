import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthentificationService) {}

  ngOnInit(): void {
     this.isLoggedIn = this.authService.isLoggedIn;
  }

}
