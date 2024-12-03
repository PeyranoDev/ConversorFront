import { Component, inject } from '@angular/core';
import { ConversionService } from '../../../services/conversion.service';
import { CommonModule } from '@angular/common';
import { ConversionHistory } from '../../../interfaces/conversion-history';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  conversionHistory: ConversionHistory[] = [];
  conversionService = inject(ConversionService);

  ngOnInit(): void {
    this.loadConversionHistory();
  }

  async loadConversionHistory(): Promise<void> {
    try {
      this.conversionHistory = await this.conversionService.getConversionHistory();
    } catch (error) {
      console.error('Error al obtener el historial de conversiones', error);
    }
  }
}