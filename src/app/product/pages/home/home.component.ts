import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ProductsServiceService } from '../../services/products-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Producto, ResponseAPIGetAll } from '../../interfaces/ResponseAPI_GetAll';
import { Product } from '../../../sale/interfaces/ResponseApi_AddProductToSale';
import { CommonModule } from '@angular/common';
import { QueryObject } from '../../../interfaces/QueryObject';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, HttpClientModule, CommonModule],
  providers: [ProductsServiceService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  productArray: Producto[] =[]

  private productService: ProductsServiceService = inject(ProductsServiceService)

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct(){
    const query: QueryObject = {
      numeroPagina: 1,
      tamañoPagina: 6,
      SortBy: '',
      IsDescending: true

    }
    this.productService.GetAllProducts(query)
      .then((products) => {
        this.productArray = products.productos
      }).catch((error) =>{
        console.log(error);
      })
  }

}
