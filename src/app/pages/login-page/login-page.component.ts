import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  authService = inject(AuthService);
  router = inject(Router);

  errorLogin = false;

  async login(loginForm: NgForm) {
    const { username, password } = loginForm.value;
    const loginData = { username, password };

    try {
      await this.authService.login(loginData);
      this.router.navigate(['/dashboard/converter']);
    } catch (error) {
      this.errorLogin = true;
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'Invalid username or password',
        timer: 3000,
      });
    }
  }
}
