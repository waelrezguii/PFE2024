import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartDataset, ChartOptions } from 'chart.js';
import { banque } from './exchange.module';

@Component({
  selector: 'app-exchange-chart',
  templateUrl: './exchange-chart.component.html',
  styleUrls: ['./exchange-chart.component.css']
})
export class ExchangeChartComponent implements OnInit, AfterViewInit {
  devises: string[] = [];
  banques: string[] = [];
  selectedD: string = '';
  selectedB: string = '';
  selectedMonth: number = new Date().getMonth() + 1;
  tableData: any[] = [];
  isDataLoaded: boolean = true;
  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDevises();
    this.fetchBanques();
  }

  ngAfterViewInit(): void {
    this.fetchTabledata();
  }

  fetchDevises(): void {
    this.http.get<any>('http://localhost:8080/api/v1/Cours/NomDevList').subscribe(data => {
      this.devises = data;
    });
  }

  fetchBanques(): void {
    this.http.get<banque[]>('http://localhost:8080/api/v1/banque/affBanques').subscribe(data => {
      this.banques = data.map(banque => banque.codeB);
    });
  }

  fetchTabledata(): void {
    if (this.selectedD && this.selectedB) {
      this.http.get<any[]>(`http://localhost:8080/api/v1/Cours/bySelection/${this.selectedD}/${this.selectedB}/${this.selectedMonth}`).subscribe(data => {
        this.tableData = data;
        this.isDataLoaded = true;
        this.processChartData(data);
      });
    }
  }

  processChartData(data: any[]): void {
    data.sort((a, b) => {
      const dateA = new Date(a.date_cours);
      const dateB = new Date(b.date_cours);
      return dateA.getTime() - dateB.getTime();
    });
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Canvas element not found');
      return;
    }

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.date_cours), 
        datasets: [{
          label: 'Achat',
          data: data.map(item => item.achat), 
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }, {
          label: 'Vente',
          data: data.map(item => item.vente), 
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: this.lineChartOptions
    });
  }
}