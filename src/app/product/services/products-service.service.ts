import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Producto, ResponseAPIGetAll } from '../interfaces/ResponseAPI_GetAll';
import { firstValueFrom } from 'rxjs';
import { QueryObject } from '../../interfaces/QueryObject';
import { CreateProductDto } from '../interfaces/CreateProductDto';
import { AuthService } from '../../jwt/auth.service';

//** Servicio que maneja las operaciones relacionadas con los productos (crear, obtener, actualizar, eliminar). */
@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  //** sting que reprensenta la url del service */
  private baseUrl: string = "http://localhost:5134/taller-backend/Product";
  //** Arreglo para almacenar mensajes de error. */
  public errors: string[] = []
  //** Inyección del servicio HttpClient para realizar las peticiones HTTP. */
  private http = inject(HttpClient);

  constructor(private authService: AuthService) {}

  //** Método para obtener todos los productos, aplicando parámetros de consulta. */
  async GetAllProducts(queryObject: QueryObject): Promise<ResponseAPIGetAll>{
    try{
      const params = new HttpParams({ fromObject: { ...queryObject } });
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAll>(
          `${this.baseUrl}/obtenerProductos`, {params}));
      return Promise.resolve(response);

    } catch (error){
      console.log('Error en GetAllProducts',error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message)

      return Promise.reject(error);
    }
  }

  //** Método para crear un producto, enviando los datos y una imagen asociada. */
  async CreateProduct(product: CreateProductDto, imageFile: File): Promise<string>{
    try{
      const formData = new FormData();

      formData.append('Nombre', product.nombre);
      formData.append('Tipo', product.tipo);
      formData.append('Precio', product.precio.toString());
      formData.append('Stock', product.stock.toString());

      formData.append('imageFile', imageFile, imageFile.name);


      const token = this.authService.getToken();

      if (!token) {
          throw new Error('Token no encontrado');
      }

      const response = await firstValueFrom(
          this.http.post<string>(`${this.baseUrl}/AñadirProducto`, formData, {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          })
      );

      console.log("token: ",token)


      return Promise.resolve(response);

    }catch (error){
      console.log('Error en CreateProduct',error);
      if(error instanceof HttpErrorResponse){
        const errorMessage =
          typeof error.error === 'string' ? error.error : error.message;
        this.errors.push(errorMessage);
      }


      return Promise.reject(error);
    }
  }

  //** Método para actualizar un producto, enviando su ID, datos y una imagen. */
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

   //** Método para eliminar un producto, enviando su ID. */
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


}
