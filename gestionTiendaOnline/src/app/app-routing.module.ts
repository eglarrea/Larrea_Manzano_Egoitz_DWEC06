import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'productos', component:ProductosComponent},
  {path:'usuarios', component:UsuariosComponent},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingProvides:any[]=[];
export const routing: ModuleWithProviders<Route>=RouterModule.forRoot(routes);
