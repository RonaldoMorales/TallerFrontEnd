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

//**
// Servicio que gestiona las operaciones relacionadas con el carrito de compras y las ventas.
// Contiene métodos para crear ventas, agregar o quitar productos del carrito, confirmar ventas y obtener información sobre el carrito y las ventas del usuario.
//**
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  //** URL base para las solicitudes relacionadas con ventas. */
  private baseUrl: string = "http://localhost:5134/taller-backend/Sale";
  //** Array que almacena los errores producidos por las operaciones del servicio. */
  public errors: string[] = []
   //** Inyección del cliente HTTP para realizar las solicitudes. */
  private http = inject(HttpClient);

  //** Inyección del servicio de autenticación para obtener el token de usuario. */
  constructor(private authService: AuthService) {}

  //**
  // Método para crear un nuevo carrito de compras para el usuario.
  // Devuelve el ID del carrito creado.
  //**
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

  //**
  // Método para agregar un producto al carrito de compras del usuario.
  // Recibe un objeto `AddProductDto` con los detalles del producto a agregar.
  //**
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

  //**
  // Método para restar un producto del carrito de compras del usuario.
  // Recibe un objeto `AddProductDto` con los detalles del producto a restar.
  //**
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

  //**
  // Método para remover un producto del carrito de compras del usuario.
  // Recibe el ID del producto a eliminar.
  //**
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

  //**
  // Método para confirmar la venta, enviando la información de la venta.
  // Recibe un objeto `ConfirmSaleDto` con los datos necesarios para confirmar la compra.
  //**
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

  //**
  // Método para obtener las ventas del usuario, utilizando los parámetros de paginación del `QueryObject`.
  //**
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

  //**
  // Método para obtener el carrito de compras del usuario.
  //**
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
