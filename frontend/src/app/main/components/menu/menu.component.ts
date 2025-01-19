import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menu = [
    {
      titulo: 'Home',
      icone: 'icon-nav-home',
      rota: '/home',
    },

  ];

  private isOpen = false;
  private widget: any;

  @Input() menuOpened!: boolean;

  @Output() toggleMenu = new EventEmitter();
  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {}


}
