import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CatetoriesService {
  private url="";
  constructor(public http: HttpClient) {
    this.url="https://fakestoreapi.com/products/categories"
   }

   getCategories():Observable<Categoria[]> {
     return this.http.get<Categoria[]>(this.url);
   }
}
