import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const token = localStorage.getItem('authToken');

    if (token && !this.authService.getCurrentUser()) {
      await this.authService.fetchUserDetails(token);
    }

    if (this.authService.getCurrentUser()) {
      this.router.navigate(['/dashboard/converter']);
      return false;
    }

    return true;
  }
}
