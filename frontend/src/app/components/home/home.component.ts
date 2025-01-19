import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { ItemListComponent } from '../item-list/item-list.component';

@Component({
  selector: 'app-home',
  imports: [...MATERIAL_IMPORTS, ItemListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  showFiller = false;
}
