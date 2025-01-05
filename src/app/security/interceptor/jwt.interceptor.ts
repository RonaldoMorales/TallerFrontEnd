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

/**
 * Interceptor de HTTP que añade el token JWT a las solicitudes salientes si el usuario está autenticado,
 * y maneja errores de autenticación (401) y autorización (403) redirigiendo al usuario a una página de error.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   * Constructor del JwtInterceptor.
   * @param authService Servicio de autenticación que proporciona métodos para manejar el token y el logout.
   * @param router Servicio Router de Angular para manejar la redirección en caso de errores de autenticación/autorización.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Intercepta todas las solicitudes HTTP salientes para añadir el token JWT si está disponible.
   * También maneja errores específicos de autenticación y autorización.
   * @param request La solicitud HTTP original.
   * @param next El siguiente manejador de la cadena de interceptores.
   * @returns Observable<HttpEvent<any>> - Una secuencia de eventos HTTP que puede incluir la respuesta del servidor o un error.
   */
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