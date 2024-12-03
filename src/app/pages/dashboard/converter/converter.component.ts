import { Component, inject } from '@angular/core';
import { Currency } from '../../../interfaces/currency';
import { CurrencyService } from '../../../services/currency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversionService } from '../../../services/conversion.service';
import { ConversionResult } from '../../../interfaces/conversion-result';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})
export class ConverterComponent {
  fromCurrency: Currency | null = null;
  toCurrency: Currency | null = null;
  amount: number = 0;
  result: number | null = null;
  currencies: Currency[] = [];

  currencyService = inject(CurrencyService);
  conversionService = inject(ConversionService);

  ngOnInit(): void {
    this.loadCurrencies();
  }

  async loadCurrencies(): Promise<void> {
    try {
      this.currencies = await this.currencyService.getCurrencies();
    } catch (error) {
      console.error('Error al cargar las monedas', error);
    }
  }

  async convertCurrency(): Promise<void> {
    if (this.amount > 0 && this.fromCurrency && this.toCurrency) {
      try {
        const conversionResult = await this.conversionService.convertCurrency(
          this.fromCurrency.id,
          this.toCurrency.id,
          this.amount
        );
        this.result = conversionResult.convertedAmount;
      } catch (error) {
        console.error('Error al realizar la conversión', error);
      }
    } else {
      console.warn('Por favor complete todos los campos');
    }
  }
}

