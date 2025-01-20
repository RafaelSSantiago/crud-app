import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnDestroy,
  Input,
  SimpleChanges,
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
  @Input() searchTerm: string = '';

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
    this.buscarItens(1, 20);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.aplicarFiltro(this.searchTerm);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private buscarItens(page: number, limit: number): void {
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

  aplicarFiltro(searchTerm: string): void {
    // Busca local
    const itensFiltrados = this.itens.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (itensFiltrados.length > 0) {
      this.dataSource.data = itensFiltrados;
    } else {
      // Busca no backend por ID
      this.itemService.buscarItemPorId(searchTerm).subscribe(
        (item: Item) => {
          if (item) {
            this.dataSource.data = [item];
          } else {
            console.warn('Nenhum item encontrado.');
            this.dataSource.data = [];
          }
        },
        (error: any) => {
          console.error('Erro ao buscar item por ID:', error);
          this.dataSource.data = [];
        }
      );
    }
  }

  todosSelecionados(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  alternarTodasLinhas(): void {
    if (this.todosSelecionados()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  rotuloCheckbox(row?: Item): string {
    if (!row) {
      return `${
        this.todosSelecionados() ? 'deselecionar' : 'selecionar'
      } todos`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselecionar' : 'selecionar'
    } linha ${row._id}`;
  }
}
