import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedInB = this.authService.isLoggedInB;
    this.isLoggedInC=this.authService.isLoggedInC;
    this.route.params.subscribe(params => {
      this.idA = +params['id']; 
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
      data: {idA:this.idA}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
          alert('L\'annonce a été acceptée avec réussite.');
          this.router.navigate(['/ForumE']);
        },
        error: (error) => {
          console.error('Error accepting announcement:', error);
        },
      });
  }
  
}
