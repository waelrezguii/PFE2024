import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  private apiKey = '3351ee7c6b947722464f05249015ce44';
  private apiUrl = 'http://data.fixer.io/api/latest';
  constructor(private http: HttpClient) { }
  getExchangeRates(): Observable<any> {
    const url = `${this.apiUrl}?access_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
