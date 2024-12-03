import { Component, inject } from '@angular/core';
import { Currency, CurrencyUpdate } from '../../../../interfaces/currency';
import { CurrencyService } from '../../../../services/currency.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-currency',
  standalone: true,
  imports: [],
  templateUrl: './edit-currency.component.html',
  styleUrl: './edit-currency.component.scss'
})
export class EditCurrencyComponent {
  currencies: Currency[] = [];
  currencyToUpdate: CurrencyUpdate = { CurrencyId: 0, code: null, legend: null, convertibilityIndex: null };

  currencyService = inject(CurrencyService);

  ngOnInit(): void {
    this.loadCurrencies();
  }

  async loadCurrencies(): Promise<void> {
    try {
      const response = await this.currencyService.getCurrencies();
      console.log('Datos de monedas:', response);
      this.currencies = response.map(currency => ({
        ...currency,
      }));
    } catch (error) {
      console.error('Error al obtener monedas', error);
    }
  }

  async updateCurrency(): Promise<void> {
    if (this.currencyToUpdate.CurrencyId) {
      try {
        await this.currencyService.updateCurrency(this.currencyToUpdate);
        console.log('Moneda actualizada con éxito');
        this.loadCurrencies(); 
      } catch (error) {
        console.error('Error al actualizar la moneda', error);
      }
    }
  }

  openEditModal(currency: Currency): void {
    Swal.fire({
      title: 'Editar Moneda',
      html: `
        <input type="text" id="code" class="swal2-input" value="${currency.code}" placeholder="Código">
        <input type="text" id="legend" class="swal2-input" value="${currency.legend}" placeholder="Leyenda">
        <input type="number" id="convertibilityIndex" class="swal2-input" value="${currency.convertibilityIndex}" placeholder="Índice de Convertibilidad">
      `,
      confirmButtonText: 'Guardar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const code = (document.getElementById('code') as HTMLInputElement).value;
        const legend = (document.getElementById('legend') as HTMLInputElement).value;
        const convertibilityIndex = parseFloat((document.getElementById('convertibilityIndex') as HTMLInputElement).value);

        if (!code || !legend || isNaN(convertibilityIndex)) {
          Swal.showValidationMessage('Por favor, rellene todos los campos correctamente');
          return false;
        }

        this.currencyToUpdate = {
          CurrencyId: currency.id,
          code,
          legend,
          convertibilityIndex,
        };

        return true;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateCurrency();
      }
    });
  }
}
