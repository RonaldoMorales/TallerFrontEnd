import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * Componente que representa una barra de navegación para paginación
 * en la aplicación. Permite seleccionar la página actual y navega
 * entre las páginas disponibles.
 */
@Component({
  selector: 'shared-paginacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  //**
  // Página actual, que puedes pasar como Input al componente. */
  @Input() currentPage: number = 1;
  //**
  // Total de páginas, también como Input para controlar el rango de paginación */
  @Input() totalPages: number = 1;
  //**
  //  Evento Output para notificar cuando se cambia la página. */
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  /**
   * Método para manejar el cambio de página.
   * Verifica si la página está dentro del rango válido y, si es así,
   * actualiza la página actual y emite el nuevo valor de la página.
   *
   * @param page Número de la página seleccionada.
   */
  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage); // Emite el número de página seleccionado
    }
  }

}
