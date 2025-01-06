import { Component, inject } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { SaleProduct } from '../../interfaces/ResponseApi_GetOnlySaleUser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../components/card/card.component";
import { FormsFinalizarCompraComponent } from '../../components/forms-finalizar-compra/forms-finalizar-compra.component';

//**
// Componente que representa la vista del carrito de compras del usuario.
// Permite ver los productos agregados al carrito, así como mostrar el formulario para finalizar la compra.
// El formulario se muestra/oculta mediante un botón.
//**
@Component({
  selector: 'app-ver-carro',
  standalone: true,
  imports: [ HttpClientModule, CommonModule, CardComponent, FormsFinalizarCompraComponent],
  providers: [SalesService],
  templateUrl: './ver-carro.component.html',
  styleUrl: './ver-carro.component.css'
})
export class VerCarroComponent {


  //** Array de productos en el carrito. */
  productArray: SaleProduct[] =[]
   //** Variable que controla la visibilidad del formulario para finalizar la compra. */
  isFormVisible = false;
  //** Inyección del servicio SalesService para gestionar las operaciones relacionadas con el carrito. */
  private saleService: SalesService = inject(SalesService)
  //**
  // Método que se ejecuta al iniciar el componente. Llama a getAllProduct para obtener los productos en el carrito.
  //**
  ngOnInit(): void {
    this.getAllProduct();
  }
  //**
  // Método para obtener los productos en el carrito de compras del usuario. Llama al servicio SalesService.
  //**
  getAllProduct(){
    this.saleService.GetOnlySaleUser()
      .then((products) => {
        this.productArray = products.saleProduct;
      }).catch((error) =>{
        console.log(error);
      })
  }
  //**
  // Método para alternar la visibilidad del formulario para finalizar la compra.
  //**
  toggleForm() {
    this.isFormVisible = !this.isFormVisible; // Cambiar el estado de visibilidad
  }



}
