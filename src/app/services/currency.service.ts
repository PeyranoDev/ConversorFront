import { Injectable } from '@angular/core';
import { Currency, CurrencyUpdate } from '../interfaces/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  storedToken = localStorage.getItem('authToken'); 
  
  async getCurrencies(): Promise<Currency[]> {
    const response = await fetch("https://localhost:7190/api/currency", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storedToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener monedas');
    }

    return response.json();
  }

  async updateCurrency(currency: CurrencyUpdate): Promise<void> {
    const response = await fetch("https://localhost:7190/api/currency", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storedToken}`,
      },
      body: JSON.stringify(currency)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la moneda');
    }
  }
}