import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxLoadingModule } from "ngx-loading";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { NgxPaginationModule } from 'ngx-pagination';
import { FieldsetModule } from "primeng/fieldset";
import { BuscarPortafolioBitacoraComponent } from './componentes/buscar-portafolio-bitacora/buscar-portafolio-bitacora.component';
import { ReportesDiariosComponent } from './componentes/reportes-diarios/reportes-diarios.component';
import { VerificacionFechasComponent } from './componentes/verificacion-fechas/verificacion-fechas.component';
import { VerificacionProduccionComponent } from './componentes/verificacion-produccion/verificacion-produccion.component';
import { DocumentoOperadoraComponent } from './componentes/documento-operadora/documento-operadora.component';
import { InformeTrabajosOperadoraComponent } from './componentes/informe-trabajos-operadora/informe-trabajos-operadora.component';
import { EditarInformeOperadoraComponent } from './componentes/editar-informe-operadora/editar-informe-operadora.component';
import { VerificacionNovedadComponent } from './componentes/verificacion-novedad/verificacion-novedad.component';
import { VerificacionTasaComponent } from './componentes/verificacion-tasa/verificacion-tasa.component';
import { VerificacionInyectorComponent } from './componentes/verificacion-inyector/verificacion-inyector.component';
import { VerificacionReinyectorComponent } from './componentes/verificacion-reinyector/verificacion-reinyector.component';
import { VerificacionTrabajoComponent } from './componentes/verificacion-trabajo/verificacion-trabajo.component';
import { JustificadoBitacoraPipe } from '../resources/pipes/justificadoBitacora';
import { ValoracionBitacoraPipe } from '../resources/pipes/valoracionBitacora';
import { ValoracionProduccionPipe } from '../resources/pipes/valoracion-produccion';
import { EstadoBitacoraPipe} from '../resources/pipes/estado-bitacora';
import { EstadoInforme} from '../resources/pipes/EstadoInforme';
import { EditarVerificacionProduccionComponent } from './componentes/editar-verificacion-produccion/editar-verificacion-produccion.component';
import { EditarVerificacionFechasComponent } from './componentes/editar-verificacion-fechas/editar-verificacion-fechas.component';
import { EditarVerificacionInyectorComponent } from './componentes/editar-verificacion-inyector/editar-verificacion-inyector.component';
import { EditarVerificacionReinyectorComponent } from './componentes/editar-verificacion-reinyector/editar-verificacion-reinyector.component';
import { ToastModule } from 'primeng/toast';
import { ConclusionesRecomendacionesComponent } from './componentes/conclusiones-recomendaciones/conclusiones-recomendaciones.component';
import { SeguimientoNovedadComponent } from './componentes/seguimiento-novedad/seguimiento-novedad.component';
import { EditarSeguimientoNovedadComponent } from './componentes/editar-seguimiento-novedad/editar-seguimiento-novedad.component';

@NgModule({
  declarations: [ReportesDiariosComponent, VerificacionFechasComponent, VerificacionProduccionComponent, DocumentoOperadoraComponent,
     InformeTrabajosOperadoraComponent,
     BuscarPortafolioBitacoraComponent,
     EditarInformeOperadoraComponent,
     VerificacionNovedadComponent,
     EstadoInforme,
     VerificacionTasaComponent,
     VerificacionInyectorComponent,
     VerificacionReinyectorComponent,
     VerificacionTrabajoComponent,
     EstadoBitacoraPipe,
     JustificadoBitacoraPipe,
     ValoracionBitacoraPipe,
     EditarVerificacionProduccionComponent, 
     ValoracionProduccionPipe, 
     EditarVerificacionFechasComponent, 
     EditarVerificacionInyectorComponent, 
     EditarVerificacionReinyectorComponent,
     ConclusionesRecomendacionesComponent,
     SeguimientoNovedadComponent,
     EditarSeguimientoNovedadComponent
     
    ],
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
    NgxPaginationModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class MTrabajoBitacoraModule { }
