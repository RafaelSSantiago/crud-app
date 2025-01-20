import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { MaterialDesignModule } from 'src/app/shared/material-design/material-design.module';
import { BuscaComponent } from './components/busca/busca.component';
import { SharedModule } from 'src/app/shared/shared.module';

const ROUTES: Routes = [
  {
    path: '',
    component: ItemComponent,
  },
];

@NgModule({
  declarations: [ItemComponent, ItemListComponent, BuscaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MaterialDesignModule,
    SharedModule,
  ],
})
export class ItemModule {}
