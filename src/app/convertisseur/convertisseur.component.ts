import { Component, OnInit } from '@angular/core';
import { ConverterService } from '../converter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-convertisseur',
  templateUrl: './convertisseur.component.html',
  styleUrls: ['./convertisseur.component.css']
})
export class ConvertisseurComponent implements OnInit {
  exchangeRates: any;
  conversionForm: FormGroup;
  convertedValue: number = 0;

  constructor(private converter: ConverterService, private formBuilder: FormBuilder) {
    this.conversionForm = this.formBuilder.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      fromCurrency: ['EUR', Validators.required],
      toCurrency: ['USD', Validators.required]
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
    if (this.conversionForm.invalid) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }
  
    const amount = this.conversionForm.value.amount;
    const fromCurrency = this.conversionForm.value.fromCurrency;
    const toCurrency = this.conversionForm.value.toCurrency;
  
    const fromRate = this.exchangeRates.rates[fromCurrency];
    const toRate = this.exchangeRates.rates[toCurrency];
  
    if (fromRate && toRate) {
      this.convertedValue = parseFloat(((amount / fromRate) * toRate).toFixed(2));
    } else {
      alert('La conversion n\'est pas disponible pour ces devises.');
    }
  }
  
}
