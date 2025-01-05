import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../jwt/auth.service';
import { RegisterDTO } from '../interfaces/RegisterDTO';
import { EditProfileDTO } from '../interfaces/EditProfileDTO';
import { CambiarContraseniaDto } from '../interfaces/CambiarContraseniaDTO';

/**
 * Servicio que gestiona las operaciones relacionadas con los clientes/usuarios en la aplicación.
 * Provee métodos para registrar usuarios, editar perfiles, cambiar contraseñas, listar clientes,
 * habilitar/deshabilitar cuentas y eliminar cuentas.
 */
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  /**
   * URL base del API backend para realizar las solicitudes HTTP.
   */
  private apiUrl = 'http://localhost:5134/taller-backend/auth'; 

  /**
   * Constructor del servicio ClientService.
   * @param http Instancia de HttpClient para realizar solicitudes HTTP.
   * @param authService Instancia de AuthService para manejar la autenticación y obtener tokens.
   */
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Método privado que prepara los encabezados comunes para las solicitudes HTTP,
   * incluyendo el token de autorización si está disponible.
   * @returns HttpHeaders - Los encabezados configurados para las solicitudes.
   */
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

  /**
   * Actualiza el perfil del usuario con los datos proporcionados.
   * @param editProfileDto Objeto que contiene los datos para editar el perfil del usuario.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  editProfile(editProfileDto: EditProfileDTO): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/EditarPerfil`, editProfileDto, { headers });
  }

  /**
   * Registra un nuevo usuario en el sistema.
   * @param registerDto Objeto que contiene los datos necesarios para el registro de un nuevo usuario.
   * @returns Observable<any> - Observable que emite la respuesta del servidor.
   */
  register(registerDto: RegisterDTO): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/register`, registerDto, { headers });
  }

  /**
   * Permite cambiar la contraseña del usuario autenticado.
   * @param cambiarContraseniaDto Objeto que contiene los datos necesarios para cambiar la contraseña.
   * @returns Observable<any> - Observable que emite un objeto con la respuesta parseada o un error si no se puede parsear.
   */
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

  /**
   * Obtiene una lista paginada de clientes, solo accesible para usuarios con el rol de administrador.
   * @param numeroPagina Número de la página de resultados que se desea obtener.
   * @param tamanioPagina Número de elementos por página.
   * @returns Observable<any> - Observable que emite la lista de clientes y los metadatos de paginación.
   */
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