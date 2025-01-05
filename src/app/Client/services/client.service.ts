import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../jwt/auth.service';
import { RegisterDTO } from '../interfaces/RegisterDTO';
import { EditProfileDTO } from '../interfaces/EditProfileDTO';
import { CambiarContraseniaDto } from '../interfaces/CambiarContraseniaDTO';



@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:5134/taller-backend/auth'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obtener los headers comunes
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Editar perfil del usuario

  editProfile(editProfileDto: EditProfileDTO): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/EditarPerfil`, editProfileDto, { headers });
  }
  register(registerDto: RegisterDTO): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/register`, registerDto, { headers });
  }

  // Cambiar contraseña
  cambiarContrasenia(cambiarContraseniaDto: CambiarContraseniaDto): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/cambiar-contrasenia`, cambiarContraseniaDto, { headers, responseType: 'text' as 'json' }).pipe(
        map(response => {
            try {
                return JSON.parse(response);
            } catch (e) {
                console.error('Error al parsear JSON:', e);
                return { error: 'Error en el formato de la respuesta' };
            }
        })
    );
}

  // Obtener lista de clientes (solo para admin)
  getClientes(numeroPagina: number, tamanioPagina: number): Observable<any> {
    const queryParams = {
      numeroPagina: numeroPagina,
      tamanioPagina: tamanioPagina
    };

    return this.http.get<any>(`${this.apiUrl}/VerClientes`, { params: queryParams, headers: this.authService.addTokenToHeaders() });
  }

  // Habilitar/Deshabilitar cuenta de usuario (solo para admin)
  toggleUserAccountStatus(id: string, habilitar: boolean): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/HabilitarDeshabilitar/${id}`, { habilitar }, { headers });
  }

  // Eliminar cuenta de usuario
  deleteAccount(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/EliminarCuenta`, { headers });
  }

  
}