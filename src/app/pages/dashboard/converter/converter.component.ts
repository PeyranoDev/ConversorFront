import { Component, inject } from '@angular/core';
import { Currency } from '../../../interfaces/currency';
import { CurrencyService } from '../../../services/currency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversionService } from '../../../services/conversion.service';
import { ConversionResult } from '../../../interfaces/conversion-result';
import Swal from 'sweetalert2';

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
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Error en la conversión',
          text: error.message || 'Ha ocurrido un error al realizar la conversión.',
          timer: 5000,
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos antes de realizar la conversión.',
        timer: 3000,
      });
    }
  }
}