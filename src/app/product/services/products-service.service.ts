import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Producto, ResponseAPIGetAll } from '../interfaces/ResponseAPI_GetAll';
import { firstValueFrom } from 'rxjs';
import { QueryObject } from '../../interfaces/QueryObject';
import { CreateProductDto } from '../interfaces/CreateProductDto';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  private baseUrl: string = "http://localhost:5134/taller-backend/Product/";
  public errors: string[] = []
  private http = inject(HttpClient);

  async GetAllProducts(queryObject: QueryObject): Promise<ResponseAPIGetAll>{
    try{
      const params = new HttpParams({ fromObject: { ...queryObject } });
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAll>(
          `${this.baseUrl}/obtenerProductos`, {params}));
      return Promise.resolve(response);

    } catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }

  async CreateProduct(product: CreateProductDto, imageFile: File): Promise<string>{
    try{
      const formData = new FormData();

      formData.append('Nombre', product.nombre);
      formData.append('Tipo', product.tipo);
      formData.append('Precio', product.precio.toString());
      formData.append('Stock', product.stock.toString());

      formData.append('imageFile', imageFile, imageFile.name);

      const response = await firstValueFrom(
        this.http.post<string>(`${this.baseUrl}/AñadirProducto`, formData)
      );
      return Promise.resolve(response);

    }catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }

  async UpdateProduct(id: number,product: CreateProductDto, imageFile: File): Promise<string>{
    try{
      const formData = new FormData();
      formData.append('id', id.toString());

      formData.append('Nombre', product.nombre);
      formData.append('Tipo', product.tipo);
      formData.append('Precio', product.precio.toString());
      formData.append('Stock', product.stock.toString());

      formData.append('imageFile', imageFile, imageFile.name);

      const response = await firstValueFrom(
        this.http.put<string>(`${this.baseUrl}/AñadirProducto`, formData)
      );
      return Promise.resolve(response);

    }catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }

  async DeleteProduct(id: number): Promise<string>{
    try{

      const response = await firstValueFrom(
        this.http.post<string>(`${this.baseUrl}/AñadirProducto`, id)
      );
      return Promise.resolve(response);

    }catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }

  constructor() { }
}
