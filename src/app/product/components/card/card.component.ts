import { Component, inject, Input, input } from '@angular/core';
import { Producto } from '../../interfaces/ResponseAPI_GetAll';

import { SalesService } from '../../../sale/services/sales.service';
import { AddProductDto } from '../../../sale/interfaces/AddProductoDto';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [],
  providers: [SalesService],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  private saleService: SalesService = inject(SalesService)
  @Input() produtc: Producto
  contador: number = 0; // Variable para el número

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

  increment() {
    this.contador++;
  }

  decrement() {
    this.contador--;
  }

  addSale() {
    console.log("id:",this.produtc.id);
    console.log("contador:", this.contador)
    if(this.contador == 0) return;
    else if(this.contador >=1  ){

      if(this.produtc.id != null){

        try {
          this.saleService.CreateSale();
          const addProduct: AddProductDto ={

            idProduct: this.produtc.id,
            cantidad:  this.contador

          }

          const response = this.saleService.AddProductToSale(addProduct);
          console.log(response);

        } catch (error) {
          console.error('Error al añadir el producto a la venta:', error);
        }


      }

    }else if(this.produtc.id != null){
      try {
        const addProduct: AddProductDto ={
          idProduct: this.produtc.id,
          cantidad:  (this.contador )

        }

        const response = this.saleService.SubtractProductToSale(addProduct);

        console.log(response);

      } catch (error) {
        console.error('Error al restar el producto a la venta:', error);
      }


    }
  }

}
