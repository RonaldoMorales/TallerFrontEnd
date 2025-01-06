import { Component } from '@angular/core';
import { FormsAddProductComponent } from '../../components/forms-add-product/forms-add-product.component';

//** Componente que representa la vista para agregar un producto. */
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsAddProductComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

}
