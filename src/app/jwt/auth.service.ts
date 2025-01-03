import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5134/taller-backend/Auth'; // Reemplaza con tu URL base

  constructor(private http: HttpClient, private cookieService: CookieService ) {}

  // Método para realizar el login y obtener el JWT
  login(email: string, password: string): Observable<{ token: string; nombre: string; rut: string; correo: string }> {
    const body = { correo: email, contraseña: password };
    return this.http.post<{ token: string; nombre: string; rut: string; correo: string }>(
      `${this.apiUrl}/login`,
      body
    ).pipe(
      map((response) => {
        this.saveToken(response.token); // Guarda el token después de recibirlo
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
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== '';
  }
}