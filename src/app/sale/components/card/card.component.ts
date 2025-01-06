import { Component, Input } from '@angular/core';
import { SaleProduct } from '../../interfaces/ResponseApi_GetOnlySaleUser';

@Component({
  selector: 'sale-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

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
