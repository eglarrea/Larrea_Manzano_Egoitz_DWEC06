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

  /**
   * This method is used to initialize the component.
   *
   * It calls the 'getUsuarios' method from the '_usuarioService' service, which returns an Observable.
   * The Observable is then subscribed to, and the result is assigned to the 'usuarios' variable.
   * The result is also logged to the console.
   * Finally, the 'eliminarSelect' and 'editarSelect' flags are set to true.
   */
  ngOnInit(): void {
    this._usuarioService.getUsuarios().subscribe((result) => {
    this.usuarios = result;
    console.log(result);
    this.eliminarSelect = true;
    this.editarSelect = true;
    });
  }

  /**
   * This method is used to set the selected user.
   *
   * @param {any} usuario - The user to be selected.
   *
   * The function sets the 'usuarioSeleccionado' to the user passed as a parameter.
   */
  eliminarUsu(usuario: any): void {
    this.usuarioSeleccionado = usuario;
  }

  /**
   * This method is used to edit a user.
   *
   * @param {any} usuarioEditar - The user to be edited.
   *
   * The function first resets the 'alertCSS' and 'eliminado' flags to null.
   * Then it sets the 'usuarioSeleccionado' to the user passed as a parameter.
   * Finally, it logs the 'usuarioSeleccionado' to the console.
   */
  editarUsu(usuarioEditar: any): void {
    this.alertCSS = null;
    this.eliminado = null;
    this.usuarioSeleccionado = usuarioEditar;
    console.log(this.usuarioSeleccionado);
  }

  /**
   * Este metodo elimina el mesaje despues de una operacion.
   */
  eliminarMensaje(): void {
    this.mesajeDatosActualizado = '';
    this.alertCSS = null;
    this.eliminado = null;
  }

 /* eliminarObjetoConId(arr: { id: number }[], id: number) {
    return arr.filter((obj: { id: number }) => obj.id !== id);
}*/

 eliminar( elemento:number){
  let resultado = []
  for (let i = 0; i < this.usuarios.length; i++) {
    if (this.usuarios[i].id !== elemento) {
      resultado.push(this.usuarios[i]);
    }
  }
  this.usuarios=resultado;
}


  /**
   * Metodo para eliminar usuario.
   *
   * @param {any} usuario - The user to be deleted.
   *
   * The function first clicks the close button on the native element and then sets the selected user to the user passed as a parameter.
   * If the id of the selected user is 10, it calls a service to return an error.
   * If the result is not null, it sets the 'eliminado' flag to true, the 'alertCSS' to 'success', and the 'mesajeDatosActualizado' to "Usuario eliminado correctamente".
   * If the result is null, it sets the 'eliminado' flag to false, the 'alertCSS' to 'warning', and the 'mesajeDatosActualizado' to "El usuario no pudo ser eliminado".
   * If there is an error, it sets the 'eliminado' flag to false, the 'alertCSS' to 'danger', and the 'mesajeDatosActualizado' to "Se ha producido un error al eliminar el usuario: " + error.message.
   *
   * If the id of the selected user is not 10, it checks if it is 9. If it is, it sets the id of the user to 5000.
   * Then it calls a service to delete the user.
   * If the result is not null, it sets the 'eliminado' flag to true, the 'alertCSS' to 'success', and the 'mesajeDatosActualizado' to "Usuario eliminado correctamente".
   * If the result is null, it sets the 'eliminado' flag to false, the 'alertCSS' to 'warning', and the 'mesajeDatosActualizado' to "El usuario no pudo ser eliminado".
   * If there is an error, it sets the 'eliminado' flag to false, the 'alertCSS' to 'danger', and the 'mesajeDatosActualizado' to "Se ha producido un error al eliminar el usuario: " + error.
   */
  confirmEliminarUsu(usuario: any): void {
    this.closebutton.nativeElement.click();
    this.usuarioSeleccionado = usuario;
    //Si se selecciona el registro 10 para emular un error llamo a un servicio para que
    //devuelva un error
    if (this.usuarioSeleccionado.id == 10) {
      this._usuarioService
        .deleteUsuarioUrlErronea(this.usuarioSeleccionado.id)
        .subscribe(
          (result) => {
            if (result != null) {
              this.eliminado = true;
              this.alertCSS = 'success';
              this.mesajeDatosActualizado = 'Usuario eliminado correctamente';
            } else {
              this.eliminado = false;
              this.alertCSS = 'warning';
              this.mesajeDatosActualizado = 'El usuario no pudo ser eliminado';
            }
          },
          (error) => {
            this.eliminado = false;
            this.alertCSS = 'danger';
            this.mesajeDatosActualizado =
              'Se ha producido un error al eliminar el usuario: ' +
              error.message;
          }
        );
    } else {
      //Si se seleeciona el registro 9 para emular un warning cambio el id del usuario a uno que
      // no existe
      if (this.usuarioSeleccionado.id == 9) {
        this.usuarioSeleccionado.id = 5000;
      }
      this._usuarioService.deleteUsuario(this.usuarioSeleccionado.id).subscribe(
        (result) => {
          if (result != null) {
            
            this.eliminar(this.usuarioSeleccionado.id) 
            this.eliminado = true;
            this.alertCSS = 'success';
            this.mesajeDatosActualizado = 'Usuario eliminado correctamente';
          } else {
            this.eliminado = false;
            this.alertCSS = 'warning';
            this.mesajeDatosActualizado = 'El usuario no pudo ser eliminado';
          }
        },
        (error) => {
          this.eliminado = false;
          this.alertCSS = 'danger';
          this.mesajeDatosActualizado =
            'Se ha producido un error al eliminar el usuario: ' + error;
        }
      );
    }
  }

  /**
   * This function is used to confirm and process the update of a user.
   * It first checks if the username is not empty. If it is, it sets a warning message and returns.
   * If the username is valid, it proceeds to call the updateUsuario service.
   * After the service call, it checks the result. If the result is not null, it sets a success message indicating the user was updated correctly.
   * If the result is null, it sets a warning message indicating the user could not be updated.
   * In case of any error during the service call, it sets an error message with the details of the error.
   *
   * @param {any} usuario - The user object to be updated.
   */
  confirmActualizarUsu(usuario: any): void {
    this.usuarioSeleccionado = usuario;
    if (usuario.username.trim() == '') {
      this.alertCSS = 'warning';
      this.mesajeDatosActualizado = 'El nombre de usuario no puede estar vacio';
      return;
    }
    this.closebuttonActualizar.nativeElement.click();
    this._usuarioService.updateUsuario(this.usuarioSeleccionado).subscribe(
      (result) => {
        if (result != null) {
          this.eliminado = true;
          this.alertCSS = 'success';
          this.mesajeDatosActualizado = 'Usuario actualizado correctamente';
        } else {
          this.eliminado = false;
          this.alertCSS = 'warning';
          this.mesajeDatosActualizado = 'El usuario no pudo ser actualizado';
        }
      },
      (error) => {
        this.eliminado = false;
        this.alertCSS = 'danger';
        this.mesajeDatosActualizado =
          'Se ha producido un error al actualizar el usuario: ' + error;
      }
    );
  }

  
 
}

