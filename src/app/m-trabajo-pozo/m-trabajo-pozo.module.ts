import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { CrearPortafolioComponent } from './crear-portafolio/crear-portafolio.component';
import { EditarPortafolioComponent } from './editar-portafolio/editar-portafolio.component';
import { AnularPortafolioComponent } from './anular-portafolio/anular-portafolio.component';
import {CalendarModule} from 'primeng/calendar';
import { NgxLoadingModule } from 'ngx-loading';



@NgModule({
  declarations: [CrearPortafolioComponent, EditarPortafolioComponent, AnularPortafolioComponent],
  imports: [
    CommonModule,
    FieldsetModule,
    BrowserAnimationsModule,
    DropdownModule,
    CalendarModule,
    NgxLoadingModule.forRoot({}),

  ]
})
export class MTrabajoPozoModule { }
