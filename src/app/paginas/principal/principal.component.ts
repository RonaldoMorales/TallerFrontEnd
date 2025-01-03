import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../jwt/auth.service';
import { NgIf } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
  usuarioEstado: 'no-autenticado' | 'cliente' | 'admin' = 'no-autenticado';
  private destroy$ = new Subject<void>();
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authStatus$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.determinarEstadoUsuario());
    this.determinarEstadoUsuario(); 
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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