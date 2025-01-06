import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ProductsServiceService } from '../../services/products-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Producto, ResponseAPIGetAll } from '../../interfaces/ResponseAPI_GetAll';
import { Product } from '../../../sale/interfaces/ResponseApi_AddProductToSale';
import { CommonModule } from '@angular/common';
import { QueryObject } from '../../../interfaces/QueryObject';
import { PaginacionComponent } from '../../../_shared/components/paginacion/paginacion.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, HttpClientModule, CommonModule, PaginacionComponent],
  providers: [ProductsServiceService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  query: QueryObject = {
    numeroPagina: 1,
    tamañoPagina: 10,
    SortBy: '',
    IsDescending: true

  }
  cantProductos: number =0;
  cantPaginas: number = 0;
  productArray: Producto[] =[]

  private productService: ProductsServiceService = inject(ProductsServiceService)

  ngOnInit(): void {
    this.getAllProduct();

  }

  getAllProduct(){

    this.productService.GetAllProducts(this.query)
      .then((products) => {
        this.productArray = products.productos
        this.cantProductos = products.total
        this.calcularCantPaginas();
      }).catch((error) =>{
        console.log(error);
      })
  }

  calcularCantPaginas(){
    if(this.query.tamañoPagina)
      this.cantPaginas = Math.ceil(this.cantProductos / this.query.tamañoPagina);
  }


  onPageChanged(page: number): void {
    this.query.numeroPagina = page;  // Actualiza la página actual
    this.getAllProduct();  // Método para cargar los resultados de acuerdo con la nueva página
  }

}
