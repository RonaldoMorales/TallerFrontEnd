import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { ConfirmSaleDto } from '../../interfaces/ConfirmSaleDto';

@Component({
  selector: 'sale-forms-finalizar-compra',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forms-finalizar-compra.component.html',
  styleUrl: './forms-finalizar-compra.component.css'
})
export class FormsFinalizarCompraComponent implements OnInit {

  forms!: FormGroup;

  error: boolean = false;
  errorMessage: string[] = [];

  private saleService: SalesService = inject(SalesService)


  constructor(private FormBuilder: FormBuilder){}

  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.forms = this.FormBuilder.group({
      Pais: ['', [Validators.required]],
      Cuidad: ['', [Validators.required]],
      Comuna: ['', [Validators.required]],
      Calle: ['', [Validators.required]],

    })
  }



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

  get paisInvalido(){
    return this.forms.get('Pais')?.invalid && this.forms.get('Pais')?.touched;
  }



  get cuidadInvalido(){
    return this.forms.get('Cuidad')?.invalid && this.forms.get('Cuidad')?.touched;
  }
  get comunaInvalido(){
    return this.forms.get('Comuna')?.invalid && this.forms.get('Comuna')?.touched;
  }

  get calleInvalido(){
    return this.forms.get('Calle')?.invalid && this.forms.get('Calle')?.touched;
  }



}
