import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './_shared/components/navbar/navbar.component';

//**
// Componente principal de la aplicación que sirve como contenedor para la interfaz de usuario.
// Es responsable de la inicialización de la librería Flowbite y la configuración del navbar.
//**
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet,NavbarComponent],
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //** Título de la aplicación. */
  title = 'web-app';

  //**
  // En este caso, se utiliza para inicializar la librería Flowbite para mejorar la interacción de la UI.
  //**
  ngOnInit(): void {
    initFlowbite();
  }
}
