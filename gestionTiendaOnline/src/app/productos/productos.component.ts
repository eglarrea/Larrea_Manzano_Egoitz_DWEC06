import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rating } from '../models/Rating';
import { Producto } from '../models/Producto';
import { CatetoriesService } from '../services/catetories.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})

export class ProductosComponent implements OnInit {
  public productos: any = [];
  public categorias: any = [];
  public productoSeleccionado: any;
  public productoSelect: boolean = false;
  public editarProducto: boolean = false
  public eliminarSelect: boolean = false;
 // public eliminado:boolean | null =null;
  public actualizado: boolean | null = null;
  public mesajeDatosActualizado: string = "";
  public alertCSS: string | null = null;
  public urlPattern = 'https?://.+\\.(jpg|png|gif|jpeg)$';

  productForm: FormGroup;

  @ViewChild('closebuttonActualizar') closebuttonActualizar: any;

  /**
   * A reference to the 'closebuttonAlta' element in the template.
   * This is used to programmatically control the 'closebuttonAlta' element.
   */
  @ViewChild('closebuttonAlta') closebuttonAlta: any;

  @ViewChild('closeEliminarbutton') closeEliminarbutton: any;
  


  constructor(private productosService: ProductosService,private categoriaService: CatetoriesService  ,private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      title: [null, Validators.required],
      price: "",
      description: "",
      category: "",
      image: ['', [Validators.pattern(this.urlPattern)]],

      rating: this.formBuilder.group({
        rate: [3.9],
        count: [120]
      })
    });
  }

  /**
   * This function is called when the component is initialized.
   * It subscribes to the 'getProductos' service from 'productosService'.
   * When the service call is successful, it sets the 'productos' variable with the result and sets 'productoSelect' to true.
   */
  ngOnInit(): void {
    this.productosService.getProductos().subscribe((result) => {
      console.log(result)
      this.productos = result;
      this.productoSelect = true;
      this.eliminarSelect=true;
    },error=>{
      debugger
      this.actualizado = false;
      this.alertCSS = 'danger';
      this.mesajeDatosActualizado ='Se ha producido al obtener los productos: '+ error.message;
    });
    
    this.categoriaService.getCategories().subscribe((result)=>{
      console.log(result);
      this.categorias=result
    },error=>{
      debugger
      this.actualizado = false;
      this.alertCSS = 'danger';
      this.mesajeDatosActualizado =
        'Se ha producido al obtener las categorías: ' +
        error.message;});
  }

  /**
   * This function is used to view the details of a selected product.
   * It first sets the 'alertCSS' and 'actualizado' variables to null.
   * Then, it sets the 'editarProducto' variable to true.
   * Finally, it sets the 'productoSeleccionado' variable to the selected product.
   * @param {any} elemento - The selected product.
   */
  verDetalleProducto(elemento: any) {
    console.log(elemento);
    this.alertCSS = null;
    this.actualizado = null;
    this.editarProducto = true;
    this.productoSeleccionado = elemento;
  }

  /**
   * This function is used to reset the product form and the related variables.
   * It first sets the 'alertCSS' and 'actualizado' variables to null.
   * Then, it sets the 'mesajeDatosActualizado' variable to an empty string.
   * Finally, it resets the product form to its initial state.
   */
  altaProducto() {
    this.alertCSS = null;
    this.actualizado = null;
    this.mesajeDatosActualizado = '';
    this.productForm.reset();
  }

  /**
   * This function is used to save a new product.
   * It first checks if the product form is valid.
   * If the form is valid, it creates a new product object with the form values and calls the addProducto service to save the product.
   * Depending on the result of the service call, it sets the appropriate message and alertCSS.
   * If the service call is successful, it sets a success message and alertCSS.
   * If the service call fails, it sets an error message and alertCSS.
   * After the service call, it triggers a click event on the 'closebuttonAlta' element to close the product form.
   * If the form is not valid, it sets an error message and alertCSS.
   */
  guardarProducto(): void {
    console.log('llega a guardar');
    if (this.productForm.valid) {
      let reating = new Rating(
        this.productForm.get('rating.rate')?.value,
        this.productForm.get('rating.count')?.value
      );
      let productoSeleccionado = new Producto(
        this.productForm.get('title')?.value,
        this.productForm.get('price')?.value,
        this.productForm.get('description')?.value,
        this.productForm.get('category')?.value,
        this.productForm.get('image')?.value,
        reating
      );
      this.productosService.addProducto(productoSeleccionado).subscribe(
        (result) => {
          this.productos.push(result);
          console.log(result);
          this.actualizado = true;
          this.alertCSS = 'success';
          this.mesajeDatosActualizado =
            'El producto se ha creado correctamente';
        },
        (error) => {
          this.actualizado = false;
          this.alertCSS = 'danger';
          this.mesajeDatosActualizado =
            'Se ha producido un error al crear el producto: ' + error.message;
        }
      );

      this.closebuttonAlta.nativeElement.click();
    } else {
      this.actualizado = null;
      this.alertCSS = 'danger';
      this.mesajeDatosActualizado =
        'Hay datos erroneos o obligatorios sin informar';
    }
  }


  confirmEliminarProducto(usuario: any): void {
    this.closeEliminarbutton.nativeElement.click();
    this.productoSeleccionado = usuario;
    this.productosService.deleteProducto(this.productoSeleccionado.id).subscribe(
      (result)=>{
        if (result != null) {
            
          this.eliminar(this.productoSeleccionado.id) 
          this.actualizado = true;
          this.alertCSS = 'success';
          this.mesajeDatosActualizado = 'El producto se eliminado correctamente';
        } else {
          this.actualizado = false;
          this.alertCSS = 'warning';
          this.mesajeDatosActualizado = 'El producto no pudo ser eliminado';
        }
      },
      (error) => {
        this.actualizado = false;
        this.alertCSS = 'danger';
        this.mesajeDatosActualizado =
          'Se ha producido un error al eliminar el producto: ' + error;
      }
      
    )
    window.scrollTo(0, 0);
  }

  eliminarProducto(producto: any): void {
    this.productoSeleccionado = producto;
  }


  eliminar( elemento:number){
    let resultado = []
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i].id !== elemento) {
        resultado.push(this.productos[i]);
      }
    }
    this.productos=resultado;
  }
  /**
   * This function is used to prepare the product for editing.
   * It first clears any previous alerts and status flags.
   * It then sets the 'editarProducto' flag to false, indicating that the product is not currently being edited.
   * Finally, it sets the 'productoSeleccionado' to the product passed as an argument, which is the product to be edited.
   *
   * @param {any} elemento - The product to be prepared for editing.
   */
  verEditarProducto(elemento: any) {
    console.log(elemento);
    this.alertCSS = null;
    this.actualizado = null;
    this.editarProducto = false;
    this.productoSeleccionado = elemento;
  }

  /**
   * This function is used to clear the message and CSS alert after a product update operation.
   * It sets the message, alertCSS, and actualizado properties to their initial state.
   * This is typically called after the user has acknowledged the result of an update operation.
   */
  eliminarMensaje(): void {
    this.mesajeDatosActualizado = '';
    this.alertCSS = null;
    this.actualizado = null;
  }

  /**
   * This function is used to confirm and execute the update of a product.
   * It first checks if the product title is not empty. If it is, it sets a warning message and returns.
   * If the title is not empty, it proceeds to call the updateProducto service.
   * Depending on the result of the service call, it sets the appropriate message and alertCSS.
   * If the service call fails, it sets an error message and alertCSS.
   *
   * @param {any} producto - The product to be updated.
   */
  confirmActualizarProducto(producto: any): void {
    this.productoSeleccionado = producto;
    if (this.productoSeleccionado.title.trim() == '') {
      this.alertCSS = 'warning';
      this.mesajeDatosActualizado =
        'El nombre del producto no puede estar vacio';
      return;
    }
    this.closebuttonActualizar.nativeElement.click();
    this.productosService.updateProducto(this.productoSeleccionado).subscribe(
      (result) => {
        if (result != null) {
          this.actualizado = true;
          this.alertCSS = 'success';
          this.mesajeDatosActualizado =
            'El producto se ha actualizado correctamente';
        } else {
          this.actualizado = false;
          this.alertCSS = 'warning';
          this.mesajeDatosActualizado = 'El producto no pudo ser actualizado';
        }
      },
      (error) => {
        this.actualizado = false;
        this.alertCSS = 'danger';
        this.mesajeDatosActualizado =
          'Se ha producido un error al actualizar el producto: ' +
          error.message;
      }
    );
    window.scrollTo(0, 0);
  }
}
