import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';



@NgModule({
  declarations: [MainComponent, SidenavComponent],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
