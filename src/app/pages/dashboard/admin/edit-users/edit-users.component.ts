import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../../services/user.service';
import { SubscriptionService } from '../../../../services/subscription.service';

@Component({
  selector: 'app-edit-users',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './edit-users.component.html',
  styleUrl: './edit-users.component.scss'
})
export class EditUsersComponent {
  usuarios: any[] = [];
  subscriptions: any[] = []; 

  constructor() {
    this.loadSubscriptions();  
  }

  userService = inject(UserService);
  subscriptionService = inject(SubscriptionService);

  ngOnInit(): void {
    this.loadUsers();
    this.loadSubscriptions();
  }

  async loadUsers(): Promise<void> {
    this.usuarios = await this.userService.getUsuarios();
  }


  async loadSubscriptions(): Promise<void> {
    try {
      this.subscriptions = await this.subscriptionService.getSubscriptions();
    } catch (error) {
      console.error('Error al cargar las subscripciones:', error);
    }
  }


  async openChangeSubscriptionModal(usuario: any): Promise<void> {
    const { value: selectedSubscriptionId } = await Swal.fire({
      title: `Cambiar suscripción para ${usuario.username}`,
      input: 'select',
      inputOptions: this.getSubscriptionOptions(),
      inputValue: usuario.subscriptionId,  
      showCancelButton: true,
      confirmButtonText: 'Cambiar',
      cancelButtonText: 'Cancelar',
      preConfirm: (selectedId) => selectedId, 
    });

    if (selectedSubscriptionId) {
      try {
        await this.userService.cambiarSubscripcion(usuario.id, selectedSubscriptionId);
        Swal.fire('Éxito', 'La suscripción ha sido cambiada correctamente.', 'success');
        await this.loadUsers(); 
      } catch (error) {
        console.error('Error al cambiar la suscripción:', error);
        Swal.fire('Error', 'No se pudo cambiar la suscripción.', 'error');
      }
    }
  }

  async openDeleteUserModal(usuario: any): Promise<void> {
    const result = await Swal.fire({
      title: `¿Estás seguro de que quieres eliminar a ${usuario.username}?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await this.userService.borrarUsuario(usuario.id);
        Swal.fire('Eliminado', 'El usuario ha sido eliminado correctamente.', 'success');
        await this.loadUsers(); 
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
      }
    }
  }

  getSubscriptionOptions(): { [key: string]: string } {
    const options: { [key: string]: string } = {};
    this.subscriptions.forEach((subscription) => {
      options[subscription.type] = subscription.id.toString();  // Usamos el tipo y el id
    });
    return options;
  }
}