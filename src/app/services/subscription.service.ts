import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { iSubscripcion } from '../interfaces/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  storedToken = localStorage.getItem('authToken');  

  constructor() {}

  async getSubscriptions(): Promise<any[]> {

    const response = await fetch('https://localhost:7190/subscription', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storedToken}`  
      }
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error('No se pudo obtener las suscripciones');
    }
  }

  async updateSubscription(subscriptionId: number): Promise<void> {
    try {
      const response = await fetch(`https://localhost:7190/user/subscription/manage/${subscriptionId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.storedToken}`  
        },
      });
      if (!response.ok) {
        throw new Error('Error al actualizar la suscripción');
      }
    } catch (error) {
      console.error('Error al actualizar la suscripción', error);
      throw error;
    }
  }
}