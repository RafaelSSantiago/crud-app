import { Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ItemListComponent },
  { path: 'create', component: ItemFormComponent },
  { path: 'edit/:id', component: ItemFormComponent },
  // Adicione outras rotas conforme necessário
];
