import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MATERIAL_IMPORTS } from './material.imports';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatListModule,
    ...MATERIAL_IMPORTS,
    // Importe outros módulos do Angular Material conforme necessário
  ],
})
export class AppComponent {
  title = 'CRUD App';
  showFiller = false;
}
