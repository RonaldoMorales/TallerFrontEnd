import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5134/taller-backend/Auth'; // Reemplaza con tu URL base

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string; nombre: string; rut: string; correo: string }> {
    const body = { correo: email, contraseña: password };
    return this.http.post<{ token: string; nombre: string; rut: string; correo: string }>(
      `${this.apiUrl}/login`,
      body
    );
  }
}