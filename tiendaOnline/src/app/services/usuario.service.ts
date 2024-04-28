import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })

export class UsuarioService {

    public url: string;
    constructor(public _http: HttpClient) {
        this.url = "https://fakestoreapi.com/users";
    }

    /**
     * Método para obtener todos los usuarios.
     * @returns {Observable<any>} 
     */
    getUsuarios(): Observable<any> {
        return this._http.get(this.url);
    }

    /**
     * Método para eliminar un usuario.
     * @param {string} id - El ID del usuario a eliminar.
     * @returns {Observable<any>} 
     */
    deleteUsuario(id: string): Observable<any> {
        return this._http.delete(this.url + '/' + id);
    }

    /**
     * Método para eliminar un usuario a través de una URL errónea.
     * @param {string} id - El ID del usuario a eliminar.
     * @returns {Observable<any>} 
     */
    deleteUsuarioUrlErronea(id: string): Observable<any> {
        return this._http.delete('https://fakestoreapi.com/usersfdsa' + '/' + id);
    }

    /**
     * Método para actualizar el usuario.
     * @param {any} usuario  
     * @returns {Observable<any>}
     */
    updateUsuario(usuario: any): Observable<any> {
        const urlId = this.url + '/' + usuario.id;
        return this._http.put(urlId, usuario);
    }

}