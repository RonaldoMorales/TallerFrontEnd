import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../jwt/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

/**
 * Componente de inicio de sesión que maneja la autenticación del usuario.
 * Proporciona un formulario reactivo para ingresar el correo electrónico y la contraseña,
 * y gestiona la lógica de autenticación a través del AuthService.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  /**
   * Formulario reactivo para el inicio de sesión que incluye validaciones para el email y la contraseña.
   */
  loginForm: FormGroup;

  /**
   * Variable para almacenar el mensaje de error en caso de fallo en el login.
   */
  loginError: string | null = null;

  /**
   * Constructor del componente LoginComponent.
   * @param fb Instancia de FormBuilder para crear el formulario reactivo.
   * @param authService Instancia de AuthService para manejar la autenticación.
   * @param router Instancia de Router para la navegación dentro de la aplicación.
   */
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Método que se ejecuta al enviar el formulario de inicio de sesión.
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          // Maneja la respuesta exitosa del login
          console.log('Login exitoso:', response);
          alert(`Bienvenido, ${response.nombre}`); // Muestra un mensaje de bienvenida con el nombre del usuario

          // Navega a la ruta principal después de un login exitoso
          this.router.navigate(['/principal']);
        },
        error: (err) => {
          // Maneja los errores de login
          console.error('Error en el login:', err);
          this.loginError = err.error || 'Error desconocido al iniciar sesión.';
        },
      });
    }
  }
}