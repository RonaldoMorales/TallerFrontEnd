import { Component, inject, Input, input } from '@angular/core';
import { Producto } from '../../interfaces/ResponseAPI_GetAll';

import { SalesService } from '../../../sale/services/sales.service';
import { AddProductDto } from '../../../sale/interfaces/AddProductoDto';
//**
// * Componente que representa una tarje de producto
// * en la aplicación. Permite visualizar, aumentar la cantidad de producto
// * y añadir al carro. */
@Component({
  selector: 'product-card',
  standalone: true,
  imports: [],
  providers: [SalesService],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
//**
// Inyección del servicio SalesService para su uso dentro del componente. */
  private saleService: SalesService = inject(SalesService)
  //**
  // Propiedad de entrada para recibir un producto de tipo Producto. */
  @Input() produtc: Producto
//**
// Variable para llevar el conteo de productos. */
  contador: number = 0;
 //**
 //  Constructor del componente, inicializa el producto con valores por defecto. */
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
  //**
  // Método para incrementar el contador. */
  increment() {
    this.contador++;
  }
  //**
  // Método para decrementar el contador. */
  decrement() {
    this.contador--;
  }
  //**
  // Método para agregar el producto a la venta. */
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
