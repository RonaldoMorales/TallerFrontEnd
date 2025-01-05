import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../jwt/auth.service';
import { NgIf } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NgIf, EditarUsuarioComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
  usuarioEstado: 'no-autenticado' | 'cliente' | 'admin' = 'no-autenticado';
  private destroy$ = new Subject<void>();
  mostrarEditarUsuario = false;
  constructor(private authService: AuthService) {}
  mostrarClientes = false;

  ngOnInit() {

    this.determinarEstadoUsuario();
    /*this.authService.authStatus$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.determinarEstadoUsuario());
    this.determinarEstadoUsuario(); */
  }

  
  logout(): void {
    this.authService.logout();
  }

   editarPerfil(): void {
    this.mostrarEditarUsuario = true;
  }

  // Método para cerrar el componente de edición de usuario
  cerrarEditarUsuario(): void {
    this.mostrarEditarUsuario = false;
  }

  cambiarContrasenia(): void {
    this.mostrarEditarUsuario = true;
    // Aquí podrías setear el modo de edición a 'contrasenia' si tu componente lo soporta
  }

  verProductos(): void {
    console.log('Funcionalidad de Ver Productos no implementada aún.');
    alert('Funcionalidad de Ver Productos no implementada aún.');
  }

  determinarEstadoUsuario() {
    if (this.authService.isAuthenticated()) {
      const payload = this.authService.getPayload();
      if (payload && payload.role) { // Asegúrate de que 'role' es el nombre correcto en tu payload
        switch(payload.role) {
          case 'Admin':
            this.usuarioEstado = 'admin';
            break;
          case 'User':
            this.usuarioEstado = 'cliente';
            break;
          default:
            this.usuarioEstado = 'no-autenticado'; // Manejar roles no reconocidos
        }
      } else {
        this.usuarioEstado = 'no-autenticado';
      }
    } else {
      this.usuarioEstado = 'no-autenticado';
    }
  }

  
}