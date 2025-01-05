import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../jwt/auth.service'; 

/**
 * Guard de autenticación que verifica si el usuario está autenticado antes de permitir el acceso a una ruta.
 * Implementa la interfaz CanActivate para ser usado en la configuración de rutas de Angular.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Constructor del AuthGuard.
   * @param authService Servicio de autenticación que proporciona el método para verificar el estado de autenticación del usuario.
   * @param router Servicio Router de Angular para manejar la redirección en caso de que el usuario no esté autenticado.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método que determina si el usuario puede activar (acceder) la ruta solicitada.
   * @param next Snapshot de la ruta activa que se está intentando acceder.
   * @param state Estado actual de la ruta del router.
   * @returns boolean - Devuelve true si el usuario está autenticado, false en caso contrario, redirigiendo al usuario a la página de error 404.
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // Redirige a la página de error 404 si el usuario no está autenticado
      this.router.navigate(['/404']);
      return false;
    }
  }
}