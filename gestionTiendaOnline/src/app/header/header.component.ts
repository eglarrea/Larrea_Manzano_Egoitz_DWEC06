import { Component } from '@angular/core';
import { ContantesApp } from '../app.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public nombreTineda: string = ContantesApp.nombreTienda;

}
