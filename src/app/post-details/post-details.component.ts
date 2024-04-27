import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import { MatDialog } from '@angular/material/dialog';
import { annoncesb } from './annoncesb.module';
import { PostFormDialogComponent } from '../post-form-dialog/post-form-dialog.component';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  annoncesB: annoncesb[] = [];
  isLoggedInB = false;
  isLoggedInC=false;
  idA: number | null = null;

  constructor(
    private httpclient: HttpClient,
    private authService: AuthentificationService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoggedInB = this.authService.isLoggedInB;
    this.isLoggedInC=this.authService.isLoggedInC;
    this.route.params.subscribe(params => {
      this.idA = +params['id']; // '+' is used to convert string to number
      if (this.idA) {
        this.getAnnonces();
      } else {
        console.error('Invalid idA in the URL');
      }
    });
  }

  Ajouter(): void {
    const dialogRef = this.dialog.open(PostFormDialogComponent, {
      width: '400px',
      data: {idA:this.idA} // You can pass initial data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Refresh the list of banks or perform any other actions after dialog is closed
    });
  }

  getAnnonces(): void {
    this.httpclient.get<annoncesb[]>(`http://localhost:8080/api/v1/annoncesB/aff/${this.idA}`).subscribe(data => {
      this.annoncesB = data;
    });
  }
  acceptAnnouncement(): void {
    this.httpclient.put(`http://localhost:8080/api/v1/annoncesC/${this.idA}/accept`, {})
      .subscribe({
        next: (response) => {
          console.log('Announcement accepted:', response);
          // Refresh the list of announcements or perform any other necessary actions
        },
        error: (error) => {
          console.error('Error accepting announcement:', error);
          // Handle error as needed
        },
      });
  }
  
}
