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
import { AccionComponent } from './componentes/accion/accion.component';
import { TipoPozoComponent } from './componentes/tipo-pozo/tipo-pozo.component';
import { TipoTrabajoComponent } from './componentes/tipo-trabajo/tipo-trabajo.component';


@NgModule({
  declarations: [ConsorciosComponent, EstadoCatalogo, AsuntoComponent, AccionComponent, TipoPozoComponent, TipoTrabajoComponent],
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
