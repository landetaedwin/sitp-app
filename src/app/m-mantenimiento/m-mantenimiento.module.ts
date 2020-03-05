import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { ConsorciosComponent } from './componentes/consorcios/consorcios.component';
import { EstadoCatalogo } from '../resources/pipes/estado-catalogos';
import { AsuntoComponent } from './componentes/asunto/asunto.component';


@NgModule({
  declarations: [ConsorciosComponent, EstadoCatalogo, AsuntoComponent],
  imports: [
    CommonModule,
    FormsModule,
    FieldsetModule,
    BrowserAnimationsModule,
    DropdownModule,
    CalendarModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ]
})
export class MMantenimientoModule { }
