import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    component: ItemComponent,
  },
];

@NgModule({
  declarations: [ItemComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class ItemModule {}
