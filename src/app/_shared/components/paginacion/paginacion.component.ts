import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-paginacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Input() currentPage: number = 1; // Página actual, que puedes pasar como Input
  @Input() totalPages: number = 1;  // Total de páginas, también como Input
  @Output() pageChanged: EventEmitter<number> = new EventEmitter(); // Evento cuando se cambia de página

  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage); // Emite el número de página seleccionado
    }
  }

}
