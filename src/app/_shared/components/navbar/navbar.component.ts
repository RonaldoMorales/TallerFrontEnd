import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
/**
 * Componente que representa una barra de navegación compartida
 * en la aplicación. Usando Angular, se declara como componente
 * autónomo (standalone) y se importa el módulo RouterModule
 * para facilitar la navegación entre diferentes rutas.
 */
@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
