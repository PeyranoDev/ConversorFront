import { Injectable } from '@angular/core';
import { ConversionResult } from '../interfaces/conversion-result';
import { ConversionHistory } from '../interfaces/conversion-history';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  private storedToken: string | null = localStorage.getItem('authToken');

  async convertCurrency(initialCurrencyId: number, finalCurrencyId: number, amount: number
  ): Promise<ConversionResult> {
    const dto = {
      InitialCurrencyId: initialCurrencyId,
      FinalCurrencyId: finalCurrencyId,
      Amount: amount,
    };

    const response = await fetch('https://localhost:7190/api/conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storedToken}`,
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new Error('Error al realizar la conversión');
    }

    return await response.json();
  }

  async getConversionHistory(): Promise<ConversionHistory[]> {
    const response = await fetch('https://localhost:7190/api/conversion', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storedToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener el historial de conversiones');
    }

    return response.json();
  }
}