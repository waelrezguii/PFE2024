import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { devise } from './devise1.module';
import { AuthentificationService } from '../authentification.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  NomDevList: string[] = [];
  CodeDevList: devise | null = null;
  codeBParameter: string = '';
  nomd: string = '';
  selectedDate: string = '';
  tableData: any[] = [];
  codedev: string = '';
  drapeau: any;
  isDataLoaded: boolean = false;
  money: number = 0;
  selectedFile: File | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private authService: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.getNomDevList();
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  getNomDevList(): void {
    const url = `http://localhost:8080/api/v1/Cours/NomDevList`;
    this.http.get<string[]>(url).subscribe(data => {
      this.NomDevList = data;
    });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  validateInputs(): boolean {
    const today = this.formatDate(new Date());

    if (!this.nomd || !this.selectedDate) {
      alert('Veuillez remplir tous les champs correctement.');
      return false;
    }

    if (this.money <= 0) {
      alert('La somme d\'argent ne doit pas être négative ou égale à zéro.');
      return false;
    }

    if (this.selectedDate > today) {
      alert('La date sélectionnée ne doit pas dépasser la date du jour.');
      return false;
    }

    return true;
  }

  fetchTableData(): void {
    if (!this.validateInputs()) {
      return;
    }

    const url1 = `http://localhost:8080/api/v1/Cours/byNomdevAndDate/${this.nomd}/${this.selectedDate}`;
    this.http.get<any[]>(url1).subscribe(data => {
      this.tableData = data;
      this.isDataLoaded = true;
      if (data.length > 0) {
        this.codedev = data[0].codeDev;
        this.getCodeDev();
      }
    });
  }

  getCodeDev(): void {
    const url = `http://localhost:8080/api/v1/devise/byCodedev/${this.codedev}`;
    this.http.get<devise>(url).subscribe(data => {
      console.log(data); 
      this.CodeDevList = data;
      this.drapeau = this.CodeDevList.drapeau;
      console.log(this.CodeDevList);
      console.log(this.drapeau);
    });
  }

  calculateAchat(item: any): number {
    return parseFloat((item.achat * this.money).toFixed(2));
  }

  calculateVente(item: any): number {
    return parseFloat((item.vente * this.money).toFixed(2));
    }

    onFileSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        const extension = file.name.split('.').pop().toLowerCase();
        if (extension !== 'csv') {
          alert('Veuillez sélectionner un fichier CSV.');
          this.selectedFile = null;
        } else {
          this.selectedFile = file;
        }
      }
    }
    

    uploadCSV(): void {
      if (!this.selectedFile) {
        alert('Veuillez sélectionner un fichier CSV à importer.');
        return;
      }
    
   
      const formData = new FormData();
      formData.append('file', this.selectedFile);
    
      const url = 'http://localhost:8080/api/v1/Cours/uploadCSV';
    
      this.http.post(url, formData, { responseType: 'text' })
        .subscribe(response => {
          console.log(response);
          alert(response);
        }, error => {
          console.error(error);
          alert("Erreur lors de l'importation du fichier. Veuillez réessayer.");
        });
    }
 
}
