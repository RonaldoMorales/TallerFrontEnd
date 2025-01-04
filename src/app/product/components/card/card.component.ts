import { Component, Input, input } from '@angular/core';
import { Producto } from '../../interfaces/ResponseAPI_GetAll';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() produtc: Producto

  constructor(){
    this.produtc = {
      id:         0,
      nombre:     "",
      tipo:       "",
      precio:     -1,
      stock:      -1,
      linkImagen: ""

    }
  }

}
