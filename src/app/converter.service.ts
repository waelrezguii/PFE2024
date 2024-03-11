import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  private apiKey = '3351ee7c6b947722464f05249015ce44'; // Replace 'YOUR_API_KEY' with your actual API key
  private apiUrl = 'http://data.fixer.io/api/lastest';
  constructor(private http: HttpClient) { }
  getExchangeRates(): Observable<any> {
    const url = `${this.apiUrl}?access_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
