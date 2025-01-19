import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { ItemService } from 'src/app/shared/services/item-service.service';
import { Item } from 'src/app/shared/models/item';
import { FindAllItemsResponse } from 'src/app/shared/models/find-all-items-response.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit, AfterViewInit, OnDestroy {
  itens: Item[] = [];
  dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>(
    this.itens
  );
  displayedColumns: string[] = ['select', 'id', 'title', 'description'];
  selection: SelectionModel<Item> = new SelectionModel<Item>(true, []);

  private subscriptions: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly itemService: ItemService) {}

  ngOnInit(): void {
    this.fetchItems(1, 20);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private fetchItems(page: number, limit: number): void {
    const itemsSubscription = this.itemService
      .buscarTodosOsItens(page, limit)
      .subscribe(
        (res: FindAllItemsResponse) => {
          this.itens = res.data;
          this.dataSource.data = this.itens;
          console.log('Itens recebidos:', this.itens);
        },
        (error: any) => {
          console.error('Erro ao buscar itens:', error);
        }
      );
    this.subscriptions.add(itemsSubscription);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row._id
    }`;
  }
}
