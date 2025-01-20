import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss'],
})
export class BuscaComponent {
  buscarItem: string = '';

  @Output()
  busca: EventEmitter<string> = new EventEmitter<string>();

  onSearch(): void {
    this.busca.emit(this.buscarItem);
  }
}
