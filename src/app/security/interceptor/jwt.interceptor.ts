import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../jwt/auth.service'; // Ajusta la ruta según tu estructura
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Añadir el JWT al header de la solicitud si existe y está válido
    const token = this.authService.getToken();
    if (token && !request.url.includes('logout')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401 || error.status === 403) {
          // Manejar errores de autenticación o autorización
          this.authService.logout();
          // Redirigir a la página de error 404 en lugar de login
          this.router.navigate(['/error404']);
        }
        return throwError(error);
      })
    );
  }
}