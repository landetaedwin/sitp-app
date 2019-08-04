import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxLoadingModule } from "ngx-loading";
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FilterSearchPipe } from '../resources/pipes/filter-search.pipe';
import { AsignacionCamposComponent } from './componentes/asignacion-campos/asignacion-campos.component';
import { BuscarPortafolioComponent } from './componentes/buscar-portafolio/buscar-portafolio.component';
import { CrearPortafolioComponent } from "./componentes/crear-portafolio/crear-portafolio.component";
import { DocumentoMinisterioComponent } from './componentes/documento-ministerio/documento-ministerio.component';
import { DocumentoOperadoraComponent } from './componentes/documento-operadora/documento-operadora.component';
import { EditarPortafolioComponent } from "./componentes/editar-portafolio/editar-portafolio.component";
import { RegistroTrabajoDiarioComponent } from './componentes/registro-trabajo-diario/registro-trabajo-diario.component';




@NgModule({
  declarations: [
    CrearPortafolioComponent,
    EditarPortafolioComponent,
    BuscarPortafolioComponent,
    AsignacionCamposComponent,
    FilterSearchPipe,
    RegistroTrabajoDiarioComponent,
    DocumentoOperadoraComponent,
    DocumentoMinisterioComponent

  ],
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
export class MTrabajoPozoModule { }
