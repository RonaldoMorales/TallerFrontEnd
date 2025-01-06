import { Component, inject } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { SaleProduct } from '../../interfaces/ResponseApi_GetOnlySaleUser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../components/card/card.component";
import { FormsFinalizarCompraComponent } from '../../components/forms-finalizar-compra/forms-finalizar-compra.component';

@Component({
  selector: 'app-ver-carro',
  standalone: true,
  imports: [ HttpClientModule, CommonModule, CardComponent, FormsFinalizarCompraComponent],
  providers: [SalesService],
  templateUrl: './ver-carro.component.html',
  styleUrl: './ver-carro.component.css'
})
export class VerCarroComponent {

    productArray: SaleProduct[] =[]
    isFormVisible = false;

    private saleService: SalesService = inject(SalesService)

    ngOnInit(): void {
      this.getAllProduct();

    }

    getAllProduct(){

      this.saleService.GetOnlySaleUser()
        .then((products) => {
          this.productArray = products.saleProduct;

        }).catch((error) =>{
          console.log(error);
        })
    }

    toggleForm() {
      this.isFormVisible = !this.isFormVisible; // Cambiar el estado de visibilidad
    }



}
