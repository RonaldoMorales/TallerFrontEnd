import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ResponseAPIAddProductToSale } from '../interfaces/ResponseApi_AddProductToSale';
import { AddProductDto } from '../interfaces/AddProductoDto';
import { ConfirmSaleDto } from '../interfaces/ConfirmSaleDto';
import { QueryObject } from '../../interfaces/QueryObject';
import { ResponseAPIGetSalesUser } from '../interfaces/ResponseApi_GetSalesUser';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private baseUrl: string = "http://localhost:5134/taller-backend/Sale/";
  public errors: string[] = []
  private http = inject(HttpClient);

  constructor() { }

  async CreateSale(): Promise<string>{
    try{
    const response = await firstValueFrom(
      this.http.post<string>(`${this.baseUrl}/CrearCarrito`, null)
    );
    return Promise.resolve(response);

    }catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }

  async AddProductToSale(product: AddProductDto): Promise<ResponseAPIAddProductToSale>{
    try{
    const response = await firstValueFrom(
      this.http.put<ResponseAPIAddProductToSale>(`${this.baseUrl}/AgregarProducto`, product)
    );
    return Promise.resolve(response);

    }catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }

  async SubtractProductToSale(product: AddProductDto): Promise<ResponseAPIAddProductToSale>{
    try{
    const response = await firstValueFrom(
      this.http.put<ResponseAPIAddProductToSale>(`${this.baseUrl}/DisminuirProducto`, product)
    );
    return Promise.resolve(response);

    }catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }

  async RemoveProductToSale(idProduct: number): Promise<ResponseAPIAddProductToSale>{
    try{
    const response = await firstValueFrom(
      this.http.put<ResponseAPIAddProductToSale>(`${this.baseUrl}/RemoverProducto`, idProduct)
    );
    return Promise.resolve(response);

    }catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }

  async ConfirmProductToSale(info: ConfirmSaleDto): Promise<string>{
    try{
    const response = await firstValueFrom(
      this.http.post<string>(`${this.baseUrl}/ConfirmarVenta`, info)
    );
    return Promise.resolve(response);

    }catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }

  async GetSaleUser(queryObject: QueryObject): Promise<ResponseAPIGetSalesUser>{
    try{
      const params = new HttpParams({ fromObject: { ...queryObject } });
      const response = await firstValueFrom(
      this.http.get<ResponseAPIGetSalesUser>(`${this.baseUrl}/ConfirmarVenta`, {params})
    );
    return Promise.resolve(response);

    }catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }


}
