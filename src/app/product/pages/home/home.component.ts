import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ProductsServiceService } from '../../services/products-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Producto, ResponseAPIGetAll } from '../../interfaces/ResponseAPI_GetAll';
import { Product } from '../../../sale/interfaces/ResponseApi_AddProductToSale';
import { CommonModule } from '@angular/common';
import { QueryObject } from '../../../interfaces/QueryObject';
import { PaginacionComponent } from '../../../_shared/components/paginacion/paginacion.component';

//** Componente que representa la vista principal de productos con paginación. */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, HttpClientModule, CommonModule, PaginacionComponent],
  providers: [ProductsServiceService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  //** Objeto para almacenar la consulta de productos con parámetros de paginación y orden. */
  query: QueryObject = {
    numeroPagina: 1,
    tamañoPagina: 10,
    SortBy: '',
    IsDescending: true

  }
   //** Propiedad para almacenar la cantidad total de productos. */
  cantProductos: number =0;
  //** Propiedad para almacenar la cantidad total de páginas de productos. */
  cantPaginas: number = 0;
  //** Arreglo para almacenar los productos obtenidos. */
  productArray: Producto[] = []

  //** Inyección del servicio ProductsServiceService para obtener los productos. */
  private productService: ProductsServiceService = inject(ProductsServiceService)

  //** Método que se ejecuta al inicializar el componente, obtiene los productos. */
  ngOnInit(): void {
    this.getAllProduct();
  }

  //** Método para obtener todos los productos según la consulta actual. */
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

  //** Método para calcular la cantidad de páginas de productos según la cantidad total y el tamaño de página. */
  calcularCantPaginas(){
    if(this.query.tamañoPagina)
      this.cantPaginas = Math.ceil(this.cantProductos / this.query.tamañoPagina);
  }


  //** Método que se ejecuta cuando se cambia de página, actualiza la consulta y obtiene los productos de esa página. */
  onPageChanged(page: number): void {
    this.query.numeroPagina = page;  // Actualiza la página actual
    this.getAllProduct();  // Método para cargar los resultados de acuerdo con la nueva página
  }

}
