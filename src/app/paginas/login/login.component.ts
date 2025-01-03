import { Component } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { NgIf } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../user/auth.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private cookieService: CookieService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.cookieService.set('token', response.token); // Guarda el token en una cookie
          localStorage.setItem('token', response.token); // Guarda el token en localStorage
          alert(`Bienvenido, ${response.nombre}`);
        },
        error: (err) => {
          console.error('Error en el login:', err);
          this.loginError = err.error || 'Error desconocido al iniciar sesión.';
        },
      });
    }
  }
}