import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'item',
    loadChildren: () =>
      import('./main/pages/item/item.module').then((m) => m.ItemModule),
  },
  {
    path: '',
    redirectTo: '/item',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/item',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
