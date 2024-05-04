import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public url: string;
  constructor(public _http: HttpClient) {
    this.url = "https://fakestoreapi.com/products";
  }

  /**
   * Método para obtener todos los productos
   *
   * @returns {Observable<any>}
   */
  getProductos(): Observable<any> {
    console.log("Realiza llamada obtener producto :"+this.url);
    return this._http.get(this.url);
  }

  /**
   * Método para actualizar un producto existente
   *
   * @param {any} producto 
   * @returns {Observable<any>}
   */
  updateProducto(producto: any): Observable<any> {
    const urlId = this.url + '/' + producto.id;
    console.log("Realiza llamada update producto :"+urlId);
    return this._http.put(urlId, producto);
  }

  /**
   * Método para añadir un nuevo producto
   *
   * @param {any} producto 
   * @returns {Observable<any>}
   */
  addProducto(producto: any): Observable<any> {
    console.log("Realiza llamada añadir producto :"+producto);
    return this._http.post(this.url, producto);
  }
}
