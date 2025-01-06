import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { ConfirmSaleDto } from '../../interfaces/ConfirmSaleDto';

//**
// Componente para el formulario de finalizar compra en la venta. Permite ingresar
// los datos de dirección para confirmar la compra.
//**
@Component({
  selector: 'sale-forms-finalizar-compra',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forms-finalizar-compra.component.html',
  styleUrl: './forms-finalizar-compra.component.css'
})
export class FormsFinalizarCompraComponent implements OnInit {

   //** Formulario reactivo para manejar los datos de la compra. */
  forms!: FormGroup;

  //** Propiedad que indica si ocurrió un error en el proceso. */
  error: boolean = false;
  //** Propiedad que contiene los mensajes de error. */
  errorMessage: string[] = [];

  //** Servicio de ventas para manejar las acciones relacionadas con la compra. */
  private saleService: SalesService = inject(SalesService)


  constructor(private FormBuilder: FormBuilder){}

  //** Inicializa el formulario al cargar el componente. */
  ngOnInit() {
    this.createForm();
  }
  //** Método para crear el formulario reactivo con sus validaciones. */
  createForm(){
    this.forms = this.FormBuilder.group({
      Pais: ['', [Validators.required]],
      Cuidad: ['', [Validators.required]],
      Comuna: ['', [Validators.required]],
      Calle: ['', [Validators.required]],

    })
  }



  //** Método para manejar el envío del formulario. Realiza la confirmación de la venta. */
  async onSubmit(){
    console.log(this.forms.value)

    if(this.forms.invalid){
      console.log("AAAAAAAAAAAAAAAAA");
      return;

    }

      try{
        console.log("HOLA");
        const confirmSale: ConfirmSaleDto ={
          pais:      this.forms.value.Pais,
          cuidad:    this.forms.value.Cuidad,
          comuna:    this.forms.value.Comuna,
          calle:     this.forms.value.Calle,
        }
        const response = await this.saleService.ConfirmProductToSale(confirmSale)

        if(response){
          this.error = false;
          this.errorMessage = [];
          console.log(response);
        }
        else{
          this.error = true;
          this.errorMessage=  this.saleService.errors;
          console.log(this.errorMessage)
        }

      }catch(error:any){

        console.error('Error en onSumit', error);
        this.error = true;
        this.errorMessage.push(error.error)

      }finally{
        console.log('peticion finalizada');
        this.forms.reset();
        this
      }

    console.log('Errores:', this.errorMessage);
    console.log('aaaa:', this.error);

  }

   //** Verifica si el campo 'Pais' es inválido y ha sido tocado por el usuario. */
  get paisInvalido(){
    return this.forms.get('Pais')?.invalid && this.forms.get('Pais')?.touched;
  }


  //** Verifica si el campo 'Cuidad' es inválido y ha sido tocado por el usuario. */
  get cuidadInvalido(){
    return this.forms.get('Cuidad')?.invalid && this.forms.get('Cuidad')?.touched;
  }
  //** Verifica si el campo 'Comuna' es inválido y ha sido tocado por el usuario. */
  get comunaInvalido(){
    return this.forms.get('Comuna')?.invalid && this.forms.get('Comuna')?.touched;
  }

  //** Verifica si el campo 'Calle' es inválido y ha sido tocado por el usuario. */
  get calleInvalido(){
    return this.forms.get('Calle')?.invalid && this.forms.get('Calle')?.touched;
  }



}
