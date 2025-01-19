import { Component, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '../material.imports';
import { ItemListComponent } from './components/item-list/item-list.component';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  imports: [...MATERIAL_IMPORTS, ItemListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  showFiller = false;

  toggleDrawer() {
    this.drawer.toggle();
  }
}
