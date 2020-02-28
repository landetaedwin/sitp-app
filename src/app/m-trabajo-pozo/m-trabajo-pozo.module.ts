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
import { ToastModule } from 'primeng/toast';
import { NumerosDocDirective } from '../resources/directivas/numeros-doc.directive';
import { EstadoDocOperadoraPipe } from '../resources/pipes/estado-doc-operadora.pipe';
import { EstadoPortafolioPipe } from '../resources/pipes/estado-portafolio.pipe';
import { EstadoReporteDiarioPipe } from '../resources/pipes/estado-reporte-diario.pipe';
import { FilterSearchPipe } from '../resources/pipes/filter-search.pipe';
import { AsignacionCamposComponent } from './componentes/asignacion-campos/asignacion-campos.component';
import { BuscarPortafolioComponent } from './componentes/buscar-portafolio/buscar-portafolio.component';
import { CrearPortafolioComponent } from "./componentes/crear-portafolio/crear-portafolio.component";
import { DocumentoMinisterioComponent } from './componentes/documento-ministerio/documento-ministerio.component';
import { DocumentoOperadoraComponent } from './componentes/documento-operadora/documento-operadora.component';
import { EditarPortafolioComponent } from "./componentes/editar-portafolio/editar-portafolio.component";
import { HistorialPozoComponent } from './componentes/historial-pozo/historial-pozo.component';
import { RegistroTasasComponent } from './componentes/registro-tasas/registro-tasas.component';
import { RegistroTrabajoDiarioComponent } from './componentes/registro-trabajo-diario/registro-trabajo-diario.component';
import { VerificacionTasaComponent } from './componentes/verificacion-tasa/verificacion-tasa.component';
import { VerificarPagosComponent } from './componentes/verificar-pagos/verificar-pagos.component';
import { EstadoTasaPipe } from '../resources/pipes/estado-tasa';
import { RadioButtonModule } from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import { EstadoPago } from '../resources/pipes/estado-catalogos';


@NgModule({
  declarations: [
    CrearPortafolioComponent,
    EditarPortafolioComponent,
    BuscarPortafolioComponent,
    AsignacionCamposComponent,
    RegistroTrabajoDiarioComponent,
    DocumentoOperadoraComponent,
    DocumentoMinisterioComponent,
    FilterSearchPipe,
    NumerosDocDirective,
    EstadoTasaPipe,
    EstadoPago,
    HistorialPozoComponent,
    RegistroTasasComponent,
    VerificarPagosComponent,
    VerificacionTasaComponent,
    EstadoPortafolioPipe,
    EstadoReporteDiarioPipe,
    EstadoDocOperadoraPipe


  ],
  imports: [
    CommonModule,
    FormsModule,
    FieldsetModule,
    BrowserAnimationsModule,
    DropdownModule,
    CalendarModule,
    NgxPaginationModule,
    ToastModule,
    RadioButtonModule,
    CheckboxModule,

    ModalModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ]
})
export class MTrabajoPozoModule { }
