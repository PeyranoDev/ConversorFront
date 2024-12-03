import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  errorLogin = false

  async register(registerForm: NgForm) {
    if (registerForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos correctamente.',
        timer: 3000,
      });
      return;
    }
  
    const { username, password, email, secondPassword, typeOfSubscription } = registerForm.value;
  
    if (password !== secondPassword) {
      console.log(password, secondPassword)
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Por favor, asegúrate de que ambas contraseñas sean iguales.',
        timer: 3000,
      });
      return;
    }
  
    const subscriptionMap = { Free: 1, Trial: 2, Pro: 3 };

    const subscriptionId = subscriptionMap[typeOfSubscription as keyof typeof subscriptionMap];
    if (!subscriptionId) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la suscripción',
        text: 'Tipo de suscripción no válido.',
        timer: 3000,
      });
      return;
    }
  
    const registerData = {
      username,
      password,
      email,
      secondPassword,
      subscriptionId,
    };
  
    
    const response = await this.authService.register(registerData);
  
    if (response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: response.message,
        timer: 3000,
      });
      this.router.navigate(['/login']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: response.message,
        timer: 3000,
      });
    }
  }
}  