import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario: Usuario | undefined; 

  constructor() {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      this.fetchUserDetails(storedToken);
    }
  }


  login(loginData: { username: string, password: string }) {
    return fetch("https://localhost:7190/api/Authenticate", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    }).then(res => res.text())
      .then(token => {
        if (token) {
          localStorage.setItem("authToken", token); 
          this.fetchUserDetails(token); 
        }
      });
  }

  register(registerData: { username: string; password: string; email: string; secondPassword: string; subscriptionId: number })
  : Promise<{ success: boolean; message: string }> {
    return fetch("https://localhost:7190/user", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    })
      .then(async res => {
        if (res.status == 204) {
          return { success: true, message: "Usuario creado exitosamente" };
        } else {
          const errorMessage = await res.text();
          return { success: false, message: errorMessage || `Error ${res.status}` };
        }
      })
      .catch(() => ({ success: false, message: "Error de red o conexión con el servidor." }));
  }


  public async fetchUserDetails(token: string) {
    try {
      const response = await fetch('https://localhost:7190/user/details', {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const userDetails = await response.json();
      if (response.status === 200) {
        this.usuario = userDetails; 
        console.log(this.usuario)
      }
    } catch (error) {
      console.error('Error al obtener detalles del usuario:', error);
    }
  }

  logout() {
    localStorage.removeItem('authToken'); 
    this.usuario = undefined;
  }

  getCurrentUser() {
    return this.usuario;
  }
}
