import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { MenuComponent } from './menu/menu.component';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    PanelMenuModule,
    SidebarModule,
    DropdownModule
  ]
})
export class MMenuModule { }
