import { Component, Input } from '@angular/core';
import { SaleProduct } from '../../interfaces/ResponseApi_GetOnlySaleUser';

//**
// Componente para representar la tarjeta de un producto dentro de una venta.
//**
@Component({
  selector: 'sale-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  //** Propiedad de entrada para recibir un producto de tipo SaleProduct. */
  @Input() produtc: SaleProduct;

  constructor() {
    // Inicializa el producto con valores predeterminados
    this.produtc = {
      nombre: '',
      tipo: '',
      precio: 0,
      stock: 0,
      linkImagen: '',
      cantidad: 0,
      precioTotalProducto: 0


    };
  }

}
