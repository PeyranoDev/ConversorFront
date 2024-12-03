import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ClickOutsideDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean = false;
  isUserMenuOpen = false;
  usuario: any;
  isAdminPanel: boolean = false;

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.usuario = this.authService.getCurrentUser();
  }

  togglePanel(isAdminPanel: boolean) {
    this.isAdminPanel = isAdminPanel;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
  }

  signOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  
  }
}
