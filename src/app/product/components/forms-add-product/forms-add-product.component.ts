import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductsServiceService } from '../../services/products-service.service';
import { CreateProductDto } from '../../interfaces/CreateProductDto';
//** Componente para agregar un nuevo producto mediante un formulario. */
@Component({
  selector: 'forms-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forms-add-product.component.html',
  styleUrl: './forms-add-product.component.css'
})
export class FormsAddProductComponent implements OnInit {

  //** Propiedad para el formulario reactivo. */
  forms!: FormGroup;
   //** Propiedad para almacenar el archivo seleccionado. */
  selectedFile: File | null = null;
  //** Propiedad que indica si ocurrió un error en el proceso. */
  error: boolean = false;
  //** Propiedad que contiene los mensajes de error. */
  errorMessage: string[] = [];

  //** Inyección del servicio ProductsServiceService para su uso dentro del componente. */
  private productService: ProductsServiceService = inject(ProductsServiceService)


  //** Constructor del componente, inyecta el FormBuilder para crear formularios reactivos. */
  constructor(private FormBuilder: FormBuilder){}

  //** Método que se ejecuta al inicializar el componente, donde se crea el formulario. */
  ngOnInit() {
    this.createForm();
  }
   //** Método para crear el formulario reactivo. */
  createForm(){
    this.forms = this.FormBuilder.group({
      Nombre: ['', [Validators.required, Validators.minLength(3)]],
      Tipo: ['', [Validators.required]],
      Precio: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      Stock: ['', [Validators.required , Validators.pattern('^[1-9][0-9]*$')]],
      imageFile: ['', [Validators.required ]],
    })
  }

  //** Método que se ejecuta cuando se selecciona un archivo. */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Captura el archivo
    }
  }

  //** Método que se ejecuta al enviar el formulario para crear un producto. */
  async onSubmit(){
    console.log(this.forms.value)
    console.log(this.selectedFile)
    if(this.forms.invalid){
      console.log("AAAAAAAAAAAAAAAAA");
      return;

    }
    if (this.selectedFile){
      try{
        console.log("HOLA");
        const product: CreateProductDto ={
          nombre:     this.forms.value.Nombre,
          tipo:       this.forms.value.Tipo,
          precio:     this.forms.value.Precio,
          stock:      this.forms.value.Stock,
        }
        const response = await this.productService.CreateProduct(product, this.selectedFile)

        if(response){
          this.error = false;
          this.errorMessage = [];
          console.log(response);
        }
        else{
          this.error = true;
          this.errorMessage=  this.productService.errors;
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
    }
    console.log('Errores:', this.errorMessage);
    console.log('aaaa:', this.error);

  }

  //** Método para obtener el estado de validez del campo 'Nombre'. */
  get nombreInvalido(){
    return this.forms.get('Nombre')?.invalid && this.forms.get('Nombre')?.touched;
  }



  //** Método para obtener el estado de validez del campo 'Tipo'. */
  get tipoInvalido(){
    return this.forms.get('Tipo')?.invalid && this.forms.get('Tipo')?.touched;
  }
  //** Método para obtener el estado de validez del campo 'Precio'. */
  get precioInvalido(){
    return this.forms.get('Precio')?.invalid && this.forms.get('Precio')?.touched;
  }

  //** Método para obtener el estado de validez del campo 'Stock'. */
  get stockInvalido(){
    return this.forms.get('Stock')?.invalid && this.forms.get('Stock')?.touched;
  }

  //** Método para obtener el estado de validez del campo 'imageFile'. */
  get imageFileInvalido(){
    return this.forms.get('imageFile')?.invalid && this.forms.get('imageFile')?.touched;
  }

}
