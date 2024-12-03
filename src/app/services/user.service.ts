import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  storedToken = localStorage.getItem('authToken'); 

  constructor() {}

  async getUsuarios(): Promise<Usuario[]> {
    const response = await fetch(`https://localhost:7190/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storedToken}`,
      },
    });
    return response.json();
  }

  async cambiarSubscripcion(userId: number, subscriptionId: number): Promise<void> {
    await fetch(`https://localhost:7190/user/${userId}/change-subscription/${subscriptionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storedToken}`,
      },
    });
  }

  async borrarUsuario(userId: number): Promise<void> {
    await fetch(`https://localhost:7190/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storedToken}`,
      },
    });
  }

  
}