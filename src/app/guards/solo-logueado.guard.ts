import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const token = localStorage.getItem('authToken');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!this.authService.getCurrentUser()) {
      await this.authService.fetchUserDetails(token);
    }

    if (this.authService.getCurrentUser()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
