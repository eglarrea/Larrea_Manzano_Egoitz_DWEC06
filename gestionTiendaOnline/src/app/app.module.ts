import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { FooterComponent } from './footer/footer.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing,appRoutingProvides } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
     HomeComponent,
    FooterComponent,
    ProductosComponent,

    UsuariosComponent,
  ],
  imports: [ BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    AppRoutingModule,
    HttpClientModule,
 
    routing],

    providers: [appRoutingProvides],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    bootstrap: [AppComponent]
 
})
export class AppModule { }
