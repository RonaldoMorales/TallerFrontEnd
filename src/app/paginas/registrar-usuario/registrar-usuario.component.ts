import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { NgIf } from '@angular/common';
import { ClientService } from '../../Client/services/client.service';
import { Router } from '@angular/router';
import { RegisterDTO } from '../../Client/interfaces/RegisterDTO';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent implements OnInit {
  registerForm: FormGroup;

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


  ngOnInit() {
    this.initRegisterForm();
  }

  // Método para inicializar el formulario de registro
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

  // Validación personalizada para comparar contraseñas
  checkPasswords(group: FormGroup) {
    let pass = group.get('contraseña')?.value;
    let confirmPass = group.get('contraseñaRepetida')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  // Método para manejar el envío del formulario
  onSubmitRegister(): void {
    if (this.registerForm.valid) {
      const registerDto: RegisterDTO = this.registerForm.value;
      // Asegúrate de que la fecha de nacimiento se envíe en el formato correcto si es necesario
      registerDto.fechaNacimento = new Date(registerDto.fechaNacimento).toISOString().split('T')[0];

      this.clientService.register(registerDto).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito:', response);
          alert('Registro exitoso');
          // Redirige al usuario a la página de login o home
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