import { Component, OnInit } from '@angular/core';
import { ConverterService } from '../converter.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-convertisseur',
  templateUrl: './convertisseur.component.html',
  styleUrl: './convertisseur.component.css'
})
export class ConvertisseurComponent implements OnInit {
  exchangeRates: any;
  conversionForm: FormGroup;
  convertedValue: number = 0; // Initialize convertedValue here

  constructor(private converter: ConverterService, private formBuilder: FormBuilder) {
    this.conversionForm = this.formBuilder.group({
      amount: [null],
      fromCurrency: ['EUR'],
      toCurrency: ['USD']
    });
  }

  ngOnInit(): void {
    this.getExchangeRates();
  }

  getExchangeRates() {
    this.converter.getExchangeRates().subscribe(
      data => {
        this.exchangeRates = data;
      },
      error => {
        console.error('Error fetching exchange rates:', error);
      }
    );
  }

  convertCurrency() {
    const amount = this.conversionForm.value.amount;
    const fromCurrency = this.conversionForm.value.fromCurrency;
    const toCurrency = this.conversionForm.value.toCurrency;

    const fromRate = this.exchangeRates.rates[fromCurrency];
    const toRate = this.exchangeRates.rates[toCurrency];

    this.convertedValue = (amount / fromRate) * toRate;
  }
}
