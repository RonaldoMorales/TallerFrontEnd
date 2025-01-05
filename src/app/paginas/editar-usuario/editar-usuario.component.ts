import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../Client/services/client.service';
import { EditProfileDTO } from '../../Client/interfaces/EditProfileDTO';
import { CambiarContraseniaDto } from '../../Client/interfaces/CambiarContraseniaDTO';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {
  editMode: 'perfil' | 'contrasenia' = 'perfil';
   // Inicializa las propiedades en el constructor
   editProfileForm: FormGroup;
   changePasswordForm: FormGroup;

   @Output() cerrar = new EventEmitter<void>();

  // Método para cerrar el componente
  onClose(): void {
    this.cerrar.emit();
  }

 
   constructor(private fb: FormBuilder, private clientService: ClientService) {
     this.editProfileForm = this.fb.group({
       nombre: ['', Validators.required],
       fechaNacimento: ['', Validators.required],
       genero: ['', Validators.required]
     });
     this.changePasswordForm = this.fb.group({
       contraseñaActual: ['', Validators.required],
       nuevaContrasenia: ['', [Validators.required, Validators.minLength(6)]],
       confirmarNuevaContrasenia: ['', Validators.required]
     }, { validator: this.checkPasswords });
   }

  ngOnInit(): void {
    this.initEditProfileForm();
    this.initChangePasswordForm();
  }

  initEditProfileForm(): void {
    this.editProfileForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaNacimento: ['', Validators.required],
      genero: ['', Validators.required]
    });
  }

  initChangePasswordForm(): void {
    this.changePasswordForm = this.fb.group({
      contraseñaActual: ['', Validators.required],
      nuevaContrasenia: ['', [Validators.required, Validators.minLength(6)]],
      confirmarNuevaContrasenia: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('nuevaContrasenia')?.value;
    let confirmPass = group.get('confirmarNuevaContrasenia')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  setEditMode(mode: 'perfil' | 'contrasenia'): void {
    this.editMode = mode;
  }

  onSubmitEditProfile(): void {
    if (this.editProfileForm.valid) {
      const rawDateStr = this.editProfileForm.get('fechaNacimento')?.value as string;
      const formattedDate = rawDateStr;

        const editProfileDto: EditProfileDTO = {
        nombre: this.editProfileForm.get('nombre')?.value,
        fechaNacimiento: formattedDate,
        genero: this.editProfileForm.get('genero')?.value.charAt(0).toUpperCase() + this.editProfileForm.get('genero')?.value.slice(1)
      };

      
  
      this.clientService.editProfile(editProfileDto).subscribe({
        next: (response) => {
          if (response.message) { 
            alert('Perfil actualizado exitosamente');
          } else {
            console.log('Perfil actualizado, pero la respuesta no era la esperada:', response);
            alert('Perfil actualizado exitosamente');
          }
        },
        error: (error) => {
          if (error.status === 200) {
            alert('Perfil actualizado exitosamente');
          }
          console.error('Error al actualizar el perfil:', error);
          
        }
      });
    }
  }

  onSubmitChangePassword(): void {
    if (this.changePasswordForm.valid) {
      const password = this.changePasswordForm.get('nuevaContrasenia')?.value;
      const confirmPassword = this.changePasswordForm.get('confirmarNuevaContrasenia')?.value;
      if (password !== confirmPassword) {
        console.error('Las contraseñas no coinciden');
        return;
      }
  
      const cambiarContraseniaDto: CambiarContraseniaDto = {
        ContraseniaActual: this.changePasswordForm.get('contraseñaActual')?.value,
        NuevaContrasenia: password,
        ConfirmarNuevaContrasenia: confirmPassword
      };
  
      this.clientService.cambiarContrasenia(cambiarContraseniaDto).subscribe({
        next: (response) => {
          // Aquí asumo que 'response' es un objeto o cadena simple que indica éxito
          if (response && (response.message || response === 'Contrasenia actualizada correctamente.')) { 
            alert('Contraseña actualizada exitosamente');
          } else {
            console.log('Contraseña cambiada, pero la respuesta no era la esperada:', response);
            alert('Contraseña actualizada exitosamente');
          }
        },
        error: (error) => {
          console.error('Error al cambiar la contraseña:', error);
        }
      });
    } else {
      // Manejo de errores de validación del formulario
      console.error('El formulario no es válido');
    }
  }
}


