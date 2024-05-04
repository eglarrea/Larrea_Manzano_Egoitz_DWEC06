import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rating } from '../models/Rating';
import { Producto } from '../models/Producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})

export class ProductosComponent implements OnInit {
  public productos: any =[];
  public productoSeleccionado: any ;
  public productoSelect: boolean = false;
  public editarProducto: boolean=false

  public actualizado:boolean|null =null;
  public mesajeDatosActualizado:string="";
  public alertCSS:string | null =null;
  public urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]';
  productForm: FormGroup;

  @ViewChild('closebuttonActualizar') closebuttonActualizar:any;
  
  @ViewChild('closebuttonAlta') closebuttonAlta:any;


  constructor(private productosService: ProductosService,private formBuilder: FormBuilder){
    this.productForm = this.formBuilder.group({
      title: [null, Validators.required],
      price: "",
      description: "",
      category: "",
      image: [null, [Validators.pattern(this.urlPattern)]],

      rating: this.formBuilder.group({
        rate: [3.9],
        count: [120]
      })
    });
  }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(
      result=>{
        this.productos=result;
        this.productoSelect = true;
      }
    )
    
    }

    verDetalleProducto(elemento:any){
      console.log(elemento);
      this.alertCSS=null;
      this.actualizado=null;
      this.editarProducto=true;
      this.productoSeleccionado=elemento;
    }
  
    altaProducto(){
      this.alertCSS=null;
      this.actualizado=null;
      this.mesajeDatosActualizado="";
      this.productForm.reset();
    }
  
    guardarProducto():void{
      debugger;
      console.log("llega a guardar");
      if (this.productForm.valid) {
        let reating=new Rating(this.productForm.get('rating.rate')?.value, this.productForm.get('rating.count')?.value);
        let productoSeleccionado = new Producto(this.productForm.get('title')?.value,
        this.productForm.get('price')?.value,
        this.productForm.get('description')?.value,
        this.productForm.get('category')?.value,
        this.productForm.get('image')?.value,
        reating
        );
        this.productosService.addProducto(productoSeleccionado).subscribe(
          result=>{
            console.log(result);
            this.actualizado=true;
            this.alertCSS='success';
            this.mesajeDatosActualizado="El producto se ha creado correctamente";
          },
          (error) => {
            this.actualizado=false;
            this.alertCSS='danger';
            this.mesajeDatosActualizado="Se ha producido un error al crear el producto: " + error.message;
          });
  
        this.closebuttonAlta.nativeElement.click();
      } else {
         this.actualizado=null;
          this.alertCSS='danger';
          this.mesajeDatosActualizado="Hay datos erroneos o obligatorios sin informar"
      }
     }
  
    verEditarProducto(elemento:any){
      console.log(elemento);
      this.alertCSS=null;
      this.actualizado=null;
      this.editarProducto=false;
      this.productoSeleccionado=elemento;
    }
  
    eliminarMensaje(): void {
      this.mesajeDatosActualizado="";
      this.alertCSS=null;
      this.actualizado=null;
    }
  
    confirmActualizarProducto(producto: any): void {
      this.productoSeleccionado = producto;
      if(this.productoSeleccionado.title.trim()==''){
        this.alertCSS='warning';
        this.mesajeDatosActualizado="El nombre del producto no puede estar vacio";
        return;
      }
      this.closebuttonActualizar.nativeElement.click();
      this.productosService.updateProducto (this.productoSeleccionado).subscribe(
        (result) => {
          debugger;
          if(result!=null){
            this.actualizado=true;
            this.alertCSS='success';
            this.mesajeDatosActualizado="El producto se ha actualizado correctamente";
          }else{
            this.actualizado=false;
            this.alertCSS='warning';
            this.mesajeDatosActualizado="El producto no pudo ser actualizado";
          }
        },
        (error) => {
          this.actualizado=false;
          this.alertCSS='danger';
          this.mesajeDatosActualizado="Se ha producido un error al actualizar el producto: " + error.message;
        }
      );
     
    }
}
