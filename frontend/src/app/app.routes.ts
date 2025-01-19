import { Routes } from '@angular/router';
import { ItemListComponent } from './main/components/item-list/item-list.component';
import { ItemFormComponent } from './main/components/item-form/item-form.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'list', component: ItemListComponent },
  { path: 'create', component: ItemFormComponent },
  { path: 'edit/:id', component: ItemFormComponent },
  // Adicione outras rotas conforme necessário
];
