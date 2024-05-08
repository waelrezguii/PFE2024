import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { devise } from './devise1.module';
import { AuthentificationService } from '../authentification.service';
@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  NomDevList: string[]=[];
  CodeDevList: devise | null = null; // Change the type to array of objects
  codeBParameter: string = ''; 
  nomd: string = ''; 
  selectedDate: string = ''; 
  tableData:any[]=[];
  codedev: string = '';
  drapeau:any;
  isDataLoaded:boolean=false;
  money:number=0;
  selectedFile: File | null = null;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient,private datePipe: DatePipe,private authService:AuthentificationService){

  }

  ngOnInit(): void {
   this.getNomDevList();
   this.isLoggedIn = this.authService.isLoggedIn;

  }

  getNomDevList():void{
    const url = `http://localhost:8080/api/v1/Cours/NomDevList`;
    this.http.get<string[]>(url).subscribe(data=>{
      this.NomDevList=data;
    });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  fetchTableData(): void {
    if (this.nomd && this.selectedDate) {
      const url1 = `http://localhost:8080/api/v1/Cours/byNomdevAndDate/${this.nomd}/${this.selectedDate}`;
      this.http.get<any[]>(url1).subscribe(data => {
        this.tableData = data;
        this.isDataLoaded = true;
        if (data.length > 0) {
          this.codedev = data[0].codeDev; // Access codedev from the first element
          this.getCodeDev();
        }
      });
    }
  }

  getCodeDev(): void {
    const url = `http://localhost:8080/api/v1/devise/byCodedev/${this.codedev}`;
    this.http.get<devise>(url).subscribe(data => {
      console.log(data); // Log the response to check its structure
      this.CodeDevList = data;
      this.drapeau = this.CodeDevList.drapeau; // Access drapeau directly
      console.log(this.CodeDevList);
      console.log(this.drapeau);
    });
  }

  calculateAchat(item: any): number {
    return item.achat * this.money;
  }

  calculateVente(item: any): number {
    return item.vente * this.money;
  }

  // New method for file upload
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadCSV(): void {
    if (!this.selectedFile) {
      alert('Please select a CSV file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const url = `http://localhost:8080/api/v1/Cours/uploadCSV`;

    this.http.post(url, formData, { responseType: 'text' })
      .subscribe(response => {
        console.log(response);
        alert(response);
      }, error => {
        console.error(error);
        alert('Error uploading file. Please try again.');
      });
  }
}
