import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})


export class UsuariosComponent implements OnInit {
  public usuarios: any = [];
  public eliminarSelect: boolean = false;
  public editarSelect: boolean = false;
  public eliminado:boolean | null =null;
  public actualizado:boolean =false;
  public usuarioSeleccionado: any;
  public mesajeDatosActualizado:string="";
  public alertCSS:string | null =null;

 
  @ViewChild('closebutton') closebutton:any;
  @ViewChild('closebuttonActualizar') closebuttonActualizar:any;
  

  constructor(private _usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this._usuarioService.getUsuarios().subscribe((result) => {
      this.usuarios = result;
      console.log(result);
      this.eliminarSelect = true;
      this.editarSelect = true;
    });
  }

  eliminarUsu(usuario: any): void {
    this.usuarioSeleccionado = usuario;
  }

  editarUsu(usuarioEditar: any): void {
    debugger;
    this.alertCSS=null;
    this.eliminado=null;
    this.usuarioSeleccionado = usuarioEditar;
    console.log(this.usuarioSeleccionado);
  }

  eliminarMensaje(): void {
    this.mesajeDatosActualizado="";
    this.alertCSS=null;
    this.eliminado=null;
  }

  confirmEliminarUsu(usuario: any): void {
    this.closebutton.nativeElement.click();
    this.usuarioSeleccionado = usuario;
    //Si se selecciona el registro 10 para emular un error llamo a un servicio para que
    //devuelva un error
    if(this.usuarioSeleccionado.id==10){
      this._usuarioService.deleteUsuarioUrlErronea(this.usuarioSeleccionado.id).subscribe(
        (result) => {
          if(result!=null){
            this.eliminado=true;
            this.alertCSS='success';
            this.mesajeDatosActualizado="Usuario eliminado correctamente";
          }else{
            this.eliminado=false;
            this.alertCSS='warning';
            this.mesajeDatosActualizado="El usuario no pudo ser eliminado";
          }
        },
        (error) => {
          this.eliminado=false;
          this.alertCSS='danger';
          this.mesajeDatosActualizado="Se ha producido un error al eliminar el usuario: " + error.message;
        }
      );
    }else{
       //Si se seleeciona el registro 9 para emular un warning cambio el id del usuario a uno que
       // no existe
      if(this.usuarioSeleccionado.id==9){
        this.usuarioSeleccionado.id=5000;
      }
      this._usuarioService.deleteUsuario(this.usuarioSeleccionado.id).subscribe(
        (result) => {
          if(result!=null){
            this.eliminado=true;
            this.alertCSS='success';
            this.mesajeDatosActualizado="Usuario eliminado correctamente";
          }else{
            this.eliminado=false;
            this.alertCSS='warning';
            this.mesajeDatosActualizado="El usuario no pudo ser eliminado";
          }
        },
        (error) => {
          this.eliminado=false;
          this.alertCSS='danger';
          this.mesajeDatosActualizado="Se ha producido un error al eliminar el usuario: " + error;
        }
      );
    }
   
  }

  confirmActualizarUsu(usuario: any): void {
    this.usuarioSeleccionado = usuario;
    if(usuario.username.trim()==''){
      this.alertCSS='warning';
      this.mesajeDatosActualizado="El nombre de usuario no puede estar vacio";
      return;
    }
    this.closebuttonActualizar.nativeElement.click();
    this._usuarioService.updateUsuario(this.usuarioSeleccionado).subscribe(
      (result) => {
        debugger;
        if(result!=null){
          this.eliminado=true;
          this.alertCSS='success';
          this.mesajeDatosActualizado="Usuario actualizado correctamente";
        }else{
          this.eliminado=false;
          this.alertCSS='warning';
          this.mesajeDatosActualizado="El usuario no pudo ser actualizado";
        }
      },
      (error) => {
        this.eliminado=false;
        this.alertCSS='danger';
        this.mesajeDatosActualizado="Se ha producido un error al actualizar el usuario: " + error;
      }
    );
   
  }

  
 
}

