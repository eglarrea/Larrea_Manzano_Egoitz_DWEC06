import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule,Route } from "@angular/router";
import { AppComponent } from "./app.component";
import { ProductosComponent } from "./productos/productos.component";
import { RegistroComponent } from "./registro/registro.component";
import { LoginComponent } from "./login/login.component";


const appRoutes: Routes = [
    {path:'', component:AppComponent},
    {path:'productos', component:ProductosComponent},
    {path:'login', component:RegistroComponent},
    {path:'registro', component:LoginComponent},
    {path:'**', component:AppComponent}
  
  ];

export const appRoutingProvides:any[]=[];
export const routing: ModuleWithProviders<Route>=RouterModule.forRoot(appRoutes);