import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';
import { ContantesApp } from '../app.config';
@Injectable({
  providedIn: 'root'
})
export class CatetoriesService {
  private url="";
  constructor(public http: HttpClient) {
    this.url= ContantesApp.urlApi+"/products/categories"
   }

   getCategories():Observable<Categoria[]> {
     return this.http.get<Categoria[]>(this.url);
   }
}
