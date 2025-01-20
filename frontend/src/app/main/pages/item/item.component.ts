import { Component } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  searchTerm: string = '';

  handleBusca(termo: string): void {
    this.searchTerm = termo;
  }
}
