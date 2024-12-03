import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../interfaces/user';
import Swal from 'sweetalert2';
import { SubscriptionService } from '../../../services/subscription.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  subscriptions: any[] = []; 
  currentUser: any;

  constructor() {
    this.loadSubscriptions();  
    this.currentUser = this.authService.getCurrentUser();
  }

  subscriptionService = inject(SubscriptionService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  async loadSubscriptions(): Promise<void> {
    try {
      this.subscriptions = await this.subscriptionService.getSubscriptions();
    } catch (error) {
      console.error('Error al cargar las subscripciones:', error);
    }
  }

  async openChangeSubscriptionModal(): Promise<void> {
    const { value: selectedSubscriptionId } = await Swal.fire({
      title: `Cambiar suscripción para ${this.currentUser?.username}`,
      input: 'select',
      inputOptions: this.getSubscriptionOptions(),
      inputValue: this.currentUser?.subscriptionId, 
      showCancelButton: true,
      confirmButtonText: 'Cambiar',
      cancelButtonText: 'Cancelar',
      preConfirm: (selectedId) => selectedId, 
    });

    if (selectedSubscriptionId) {
      try {
       
        await this.subscriptionService.updateSubscription(selectedSubscriptionId);
        Swal.fire('Éxito', 'La suscripción ha sido cambiada correctamente.', 'success');

        this.currentUser.subscriptionId = selectedSubscriptionId;
      } catch (error) {
        console.error('Error al cambiar la suscripción:', error);
        Swal.fire('Error', 'No se pudo cambiar la suscripción.', 'error');
      }
    }
  }

  getSubscriptionOptions(): { [key: string]: string } {
    const options: { [key: string]: string } = {};
    this.subscriptions.forEach((subscription) => {
      options[subscription.id] = subscription.id.toString();
    });
    return options;
  }
}