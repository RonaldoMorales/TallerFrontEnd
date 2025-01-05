import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ClientService } from '../../Client/services/client.service';
import { Router } from '@angular/router';
import { RegisterDTO } from '../../Client/interfaces/RegisterDTO';
import { RouterModule } from '@angular/router';

/**
 * Componente para el registro de nuevos usuarios en la aplicación.
 * Este componente maneja la creación de un formulario de registro, la validación de los datos de entrada,
 * y la comunicación con el servicio ClientService para registrar el usuario en el backend.
 */
@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent implements OnInit {
  /**
   * Formulario reactivo para el registro de usuarios que incluye validaciones para cada campo.
   */
  registerForm: FormGroup;

  /**
   * Constructor del componente que inyecta las dependencias necesarias.
   * @param fb Instancia de FormBuilder para crear el formulario reactivo.
   * @param clientService Instancia de ClientService para manejar la lógica de registro.
   * @param router Instancia de Router para la navegación después del registro.
   */
  constructor(private fb: FormBuilder, private clientService: ClientService, private router: Router) {
    this.registerForm = this.fb.group({
      rut: ['', [Validators.required, Validators.pattern('^\\d{1,2}\\.\\d{3}\\.\\d{3}-[0-9Kk]$')]],
      nombre: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern('^[0-9a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\\s¡!¿?.,;:-]*$')]],
      fechaNacimento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      genero: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      contraseñaRepetida: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    }, { validator: this.checkPasswords });
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicializa el formulario de registro.
   */
  ngOnInit() {
    this.initRegisterForm();
  }

  /**
   * Inicializa el formulario de registro con las validaciones necesarias.
   */
  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      rut: ['', [Validators.required, Validators.pattern('^\\d{1,2}\\.\\d{3}\\.\\d{3}-[0-9Kk]$')]],
      nombre: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern('^[0-9a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\\s¡!¿?.,;:-]*$')]],
      fechaNacimento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      genero: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      contraseñaRepetida: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    }, { validator: this.checkPasswords });
  }

  /**
   * Validación personalizada para asegurar que las contraseñas coincidan.
   * @param group FormGroup que contiene los campos de contraseña.
   * @returns null si las contraseñas coinciden, o un objeto con la propiedad 'notSame' si no coinciden.
   */
  checkPasswords(group: FormGroup) {
    let pass = group.get('contraseña')?.value;
    let confirmPass = group.get('contraseñaRepetida')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  /**
   * Maneja el envío del formulario de registro.
   * Si el formulario es válido, envía los datos al servicio para registrar el usuario.
   */
  onSubmitRegister(): void {
    if (this.registerForm.valid) {
      const registerDto: RegisterDTO = this.registerForm.value;
      registerDto.fechaNacimento = new Date(registerDto.fechaNacimento).toISOString().split('T')[0];

      this.clientService.register(registerDto).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito:', response);
          alert('Registro exitoso');
          // Redirige al usuario a la página de login 
          this.router.navigate(['/login']);
        },
        error: (error) => {
          if (error.status === 200) {
            alert('Cuenta creada con éxito');
            this.router.navigate(['/login']);
          }
          console.error('Error al registrar usuario:', error);
          
        }
      });
    }
  }
}