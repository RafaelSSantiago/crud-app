import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MATERIAL_IMPORTS } from '../../../material.imports';

@Component({
  selector: 'app-item-list',
  imports: [MatListModule, ...MATERIAL_IMPORTS],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  list = [
    { name: 'Home', href: '/home', isActive: true },
    { name: 'About', href: '/about', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
    { name: 'Contact', href: '/contact', isActive: false },
  ];
}
