import { Component } from '@angular/core';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  constructor(private readonly dialogService: DialogService) {}

  searchTerm: string = '';

  handleBusca(termo: string): void {
    this.searchTerm = termo;
  }

  openAddItemDialog(): void {
    this.dialogService.openAddItemDialog().subscribe((result) => {
      if (result) {
        // Atualizar a lista de itens, se necessário
      }
    });
  }
}
