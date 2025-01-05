import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

/**
 * Servicio de autenticación que maneja la autenticación de usuarios en la aplicación.
 * Provee métodos para iniciar sesión, cerrar sesión, verificar el estado de autenticación,
 * y gestionar tokens JWT a través de cookies.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * URL base del API backend para las operaciones de autenticación.
   */
  private apiUrl = 'http://localhost:5134/taller-backend/Auth'; 

  /**
   * Encabezados comunes para las solicitudes HTTP, configurados con el tipo de contenido JSON.
   */
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  /**
   * BehaviorSubject que mantiene el estado de inicio de sesión del usuario.
   */
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  
  /**
   * Observable que emite el estado de inicio de sesión del usuario.
   */
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  /**
   * BehaviorSubject que mantiene el estado de autenticación general.
   */
  private authStatus = new BehaviorSubject<boolean>(false);
  
  /**
   * Observable que emite el estado de autenticación general.
   */
  authStatus$ = this.authStatus.asObservable();

  /**
   * Constructor del servicio AuthService.
   * @param httpClient Instancia de HttpClient para realizar solicitudes HTTP.
   * @param cookieService Instancia de CookieService para manejar cookies.
   * @param router Instancia de Router para la navegación dentro de la aplicación.
   */
  constructor(private httpClient: HttpClient,
              private cookieService: CookieService,
              private router: Router) {}

  /**
   * Realiza el inicio de sesión del usuario y obtiene el JWT.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @returns Observable<{ token: string; nombre: string; rut: string; correo: string }> - Observable que emite los datos del usuario y el token JWT.
   */
  login(email: string, password: string): Observable<{ token: string; nombre: string; rut: string; correo: string }> {
    const body = { correo: email, contraseña: password };
    return this.httpClient.post<{ token: string; nombre: string; rut: string; correo: string }>(
      `${this.apiUrl}/login`,
      body,
      { headers: this.headers }
    ).pipe(
      map((response) => {
        this.saveToken(response.token); // Guarda el token después de recibirlo
        this.authStatus.next(true);
        this.isLoggedInSubject.next(true);
        return response; // Devuelve la respuesta completa
      })
    );
  }

  /**
   * Guarda el token JWT en una cookie.
   * @param token Token JWT a guardar.
   */
  saveToken(token: string) {
    this.cookieService.set('token', token, 1, '/', '', false, 'Strict');
  }

  /**
   * Obtiene el token JWT de la cookie.
   * @returns string | null - El token JWT si existe, null en caso contrario.
   */
  getToken(): string | null {
    return this.cookieService.get('token');
  }

  /**
   * Realiza el cierre de sesión del usuario, eliminando el token y redirigiendo a la página de inicio de sesión.
   */
  logout() {
    this.cookieService.delete('token', '/');
    this.httpClient.post('http://localhost:5134/taller-backend/auth/logout', {}).subscribe(() => {
      // Manejar la respuesta exitosa
      this.router.navigate(['/login']);
      this.showLogoutNotification();
      this.isLoggedInSubject.next(false);
      
    }, (error: any) => {
      // Manejar errores, si es necesario
      console.error('Error al cerrar sesión:', error);
    });
  }

  /**
   * Muestra una notificación indicando que la sesión se ha cerrado correctamente.
   */
  showLogoutNotification(): void {
    alert('Sesión cerrada correctamente.');
  }

  /**
   * Verifica si el usuario está autenticado basado en el valor del BehaviorSubject isLoggedInSubject.
   * @returns boolean - True si el usuario está autenticado, false en caso contrario.
   */
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  /**
   * Verifica si el usuario tiene el rol de administrador.
   * @returns boolean - True si el usuario es administrador, false en caso contrario.
   */
  isAdmin(): boolean {
    const payload = this.getPayload();
    return payload && payload.rol === 'admin';
  }

  /**
   * Obtiene la información del payload del JWT almacenado en la cookie.
   * @returns any - El payload del JWT decodificado o null si no hay token.
   */
  getPayload(): any {
    const token = this.cookieService.get('token');
    if (token) {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    }
    return null;
  }

  /**
   * Agrega el token JWT a los encabezados de las solicitudes protegidas.
   * @returns HttpHeaders - Los encabezados con el token JWT añadido si existe.
   */
  addTokenToHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return this.headers.set('Authorization', `Bearer ${token}`);
    }
    return this.headers;
  }

  // Ejemplo de uso para una solicitud que requiere autenticación
  protectedRequest(endpoint: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${endpoint}`, {
      headers: this.addTokenToHeaders()
    });
  }
}