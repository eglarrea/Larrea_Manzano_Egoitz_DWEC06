import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    public url: string;
    constructor(public _http: HttpClient) {
        this.url = "https://fakestoreapi.com/users";
    }

    /**
     * Método para obtener todos los usuarios.
     * @returns {Observable<any>} 
     */
    getUsuarios(): Observable<Usuario[]> {
        console.log("Realiza llamada obtener usuarios :" + this.url);
        return this._http.get<Usuario[]>(this.url);
    }

    /**
     * Método para eliminar un usuario.
     * @param {string} id - El ID del usuario a eliminar.
     * @returns {Observable<any>} 
     */
    deleteUsuario(id: string): Observable<any> {
        const urlId = this.url + '/' + id;
        console.log("Realiza llamada eliminar usuario :" + urlId);
        return this._http.delete(urlId);
    }

    /**
     * Método para eliminar un usuario a través de una URL errónea.
     * @param {string} id - El ID del usuario a eliminar.
     * @returns {Observable<any>} 
     */
    deleteUsuarioUrlErronea(id: string): Observable<any> {
        const urlId = 'https://fakestoreapi.com/usersfdsa' + '/' + id;
        console.log("Realiza llamada eliminar usuario con url erronea :" + urlId);
        return this._http.delete(urlId);
    }

    /**
     * Método para actualizar el usuario.
     * @param {any} usuario  
     * @returns {Observable<any>}
     */
    updateUsuario(usuario: any): Observable<any> {
        const urlId = this.url + '/' + usuario.id;
        console.log("Realiza llamada actualizar usuario :" + urlId);
        return this._http.put(urlId, usuario);
    }

}