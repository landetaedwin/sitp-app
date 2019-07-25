import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxLoadingModule } from "ngx-loading";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { BuscarPortafolioBitacoraComponent } from './componentes/buscar-portafolio-bitacora/buscar-portafolio-bitacora.component';
import { ReportesDiariosComponent } from './componentes/reportes-diarios/reportes-diarios.component';
import { VerificacionFechasComponent } from './componentes/verificacion-fechas/verificacion-fechas.component';
import { VerificacionProduccionComponent } from './componentes/verificacion-produccion/verificacion-produccion.component';
import { DocumentoOperadoraComponent } from './componentes/documento-operadora/documento-operadora.component';
import { InformeTrabajosOperadoraComponent } from './componentes/informe-trabajos-operadora/informe-trabajos-operadora.component';


@NgModule({
  declarations: [ReportesDiariosComponent, VerificacionFechasComponent, VerificacionProduccionComponent, DocumentoOperadoraComponent,
     InformeTrabajosOperadoraComponent,
     BuscarPortafolioBitacoraComponent],
  imports: [
    CalendarModule,
    DropdownModule,
    FieldsetModule,
    CommonModule,
    FormsModule,
    FieldsetModule,
    BrowserAnimationsModule,
    DropdownModule,
    CalendarModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class MTrabajoBitacoraModule { }
