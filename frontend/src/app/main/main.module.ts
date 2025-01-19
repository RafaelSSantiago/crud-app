import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [MainComponent, SidenavComponent, MenuComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialDesignModule,
    FlexLayoutModule
  ],
})
export class MainModule {}
