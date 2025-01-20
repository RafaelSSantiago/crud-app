import { Component } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss'],
})
export class BuscaComponent {
  buscarItem: string = '';

  constructor(private searchService: SearchService) {}

  onSearch(): void {
    this.searchService.setSearchTerm(this.buscarItem);
  }
}
