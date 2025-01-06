import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ResponseAPIAddProductToSale } from '../interfaces/ResponseApi_AddProductToSale';
import { AddProductDto } from '../interfaces/AddProductoDto';
import { ConfirmSaleDto } from '../interfaces/ConfirmSaleDto';
import { QueryObject } from '../../interfaces/QueryObject';
import { ResponseAPIGetSalesUser } from '../interfaces/ResponseApi_GetSalesUser';
import { AuthService } from '../../jwt/auth.service';
import { ResponseAPIGetOnlySaleUser } from '../interfaces/ResponseApi_GetOnlySaleUser';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private baseUrl: string = "http://localhost:5134/taller-backend/Sale";
  public errors: string[] = []
  private http = inject(HttpClient);

  constructor(private authService: AuthService) {}

  async CreateSale(): Promise<string>{
    try{

      const token = this.authService.getToken();

      if (!token) {
          throw new Error('Token no encontrado');
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const response = await firstValueFrom(
        this.http.post<string>(`${this.baseUrl}/CrearCarrito`, undefined, {headers})
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
      const token = this.authService.getToken();

      if (!token) {
          throw new Error('Token no encontrado');
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    const response = await firstValueFrom(
      this.http.put<ResponseAPIAddProductToSale>(`${this.baseUrl}/AgregarProducto`, product, {headers})
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
      const token = this.authService.getToken();

      if (!token) {
          throw new Error('Token no encontrado');
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      const response = await firstValueFrom(
        this.http.put<ResponseAPIAddProductToSale>(`${this.baseUrl}/DisminuirProducto`, product,{headers})
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
      const token = this.authService.getToken();

      if (!token) {
          throw new Error('Token no encontrado');
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const response = await firstValueFrom(
        this.http.put<ResponseAPIAddProductToSale>(`${this.baseUrl}/RemoverProducto`, idProduct, {headers})
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
      const token = this.authService.getToken();

      if (!token) {
          throw new Error('Token no encontrado');
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const response = await firstValueFrom(
        this.http.post<string>(`${this.baseUrl}/ConfirmarVenta`, info, {headers})
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
      const token = this.authService.getToken();

      if (!token) {
          throw new Error('Token no encontrado');
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      const params = new HttpParams({ fromObject: { ...queryObject } });
      const response = await firstValueFrom(
      this.http.get<ResponseAPIGetSalesUser>(`${this.baseUrl}/ConfirmarVenta`, {params, headers} )
    );
    return Promise.resolve(response);

    }catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }

  async GetOnlySaleUser(): Promise<ResponseAPIGetOnlySaleUser>{
    try{
      const token = this.authService.getToken();

      if (!token) {
          throw new Error('Token no encontrado');
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const response = await firstValueFrom(
      this.http.get<ResponseAPIGetOnlySaleUser>(`${this.baseUrl}/Carrito`, { headers} )
    );
    return Promise.resolve(response);

    }catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }


}
