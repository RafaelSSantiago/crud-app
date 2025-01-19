import { Component } from '@angular/core';
import { IconService } from './core/icon-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private iconsService: IconService) {
    this.iconsService.createIcons();
  }
  title = 'meu-projeto';

}
