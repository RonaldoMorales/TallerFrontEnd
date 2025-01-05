import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../jwt/auth.service';
import { NgIf } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';

/**
 * Componente principal de la aplicación que gestiona la interfaz de usuario según el estado de autenticación.
 * Este componente muestra diferentes opciones basadas en si el usuario está autenticado y su rol.
 */
@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NgIf, EditarUsuarioComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit, OnDestroy {
  /**
   * Estado del usuario, puede ser 'no-autenticado', 'cliente' o 'admin'.
   */
  usuarioEstado: 'no-autenticado' | 'cliente' | 'admin' = 'no-autenticado';

  /**
   * Subject usado para manejar la desuscripción de observables al destruir el componente.
   */
  private destroy$ = new Subject<void>();

  /**
   * Controla la visibilidad del componente de edición de usuario.
   */
  mostrarEditarUsuario = false;

  /**
   * Controla la visibilidad de la lista de clientes.
   */
  mostrarClientes = false;

  /**
   * Constructor del componente que inyecta el servicio de autenticación.
   * @param authService Instancia de AuthService para manejar la autenticación y obtener el estado del usuario.
   */
  constructor(private authService: AuthService) {}

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Determina el estado inicial del usuario y establece una suscripción para actualizar el estado en caso de cambios de autenticación.
   */
  ngOnInit() {
    this.determinarEstadoUsuario();
    // Suscripción comentada para evitar múltiples suscripciones no necesarias
    // this.authService.authStatus$.pipe(takeUntil(this.destroy$)).subscribe(() => this.determinarEstadoUsuario());
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Se asegura de desuscribirse de cualquier observable para prevenir fugas de memoria.
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Maneja el cierre de sesión del usuario.
   */
  logout(): void {
    this.authService.logout();
  }

  /**
   * Abre el modal para editar el perfil del usuario.
   */
  editarPerfil(): void {
    this.mostrarEditarUsuario = true;
  }

  /**
   * Cierra el modal de edición de usuario.
   */
  cerrarEditarUsuario(): void {
    this.mostrarEditarUsuario = false;
  }

  /**
   * Abre el modal para cambiar la contraseña del usuario.
   */
  cambiarContrasenia(): void {
    this.mostrarEditarUsuario = true;
  }

  /**
   * Método para ver los productos, actualmente no implementado.
   */
  verProductos(): void {
    console.log('Funcionalidad de Ver Productos no implementada aún.');
    alert('Funcionalidad de Ver Productos no implementada aún.');
  }

  /**
   * Determina el estado del usuario basado en la autenticación y el rol del payload del JWT.
   */
  determinarEstadoUsuario() {
    if (this.authService.isAuthenticated()) {
      const payload = this.authService.getPayload();
      if (payload && payload.role) { 
        switch(payload.role) {
          case 'Admin':
            this.usuarioEstado = 'admin';
            break;
          case 'User':
            this.usuarioEstado = 'cliente';
            break;
          default:
            this.usuarioEstado = 'no-autenticado';
        }
      } else {
        this.usuarioEstado = 'no-autenticado';
      }
    } else {
      this.usuarioEstado = 'no-autenticado';
    }
  }
}