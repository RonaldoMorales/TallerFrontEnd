import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5134/taller-backend/Auth'; 
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private authStatus = new BehaviorSubject<boolean>(false); // BehaviorSubject para almacenar el estado de autenticación
  authStatus$ = this.authStatus.asObservable();



  constructor(private httpClient: HttpClient,
     private cookieService: CookieService,
      private router: Router) {}

  // Método para realizar el login y obtener el JWT
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

  

  // Método para guardar el token en una cookie
  saveToken(token: string) {
    this.cookieService.set('token', token, 1, '/', '', false, 'Strict');
  }

  // Método para obtener el token de la cookie
  getToken(): string | null {
    return this.cookieService.get('token');
  }

  // Método para eliminar el token (logout)
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
  showLogoutNotification(): void {
    alert('Sesión cerrada correctamente.');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  isAdmin(): boolean {
    const payload = this.getPayload();
    return payload && payload.rol === 'admin';
    
  }


  // Método para obtener la información del payload del JWT
  getPayload(): any {
    const token = this.cookieService.get('token');
    if (token) {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    }
    return null;
  }

  // Método para agregar el token a los headers de las solicitudes protegidas
  private addTokenToHeaders(): HttpHeaders {
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