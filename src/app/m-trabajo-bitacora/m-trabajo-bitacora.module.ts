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
import { VerificacionFechasComponent } from './componentes/verificacion-fechas/verificacion-fechas.component';
import { VerificacionProduccionComponent } from './componentes/verificacion-produccion/verificacion-produccion.component';
import { InformeTrabajosOperadoraComponent } from './componentes/informe-trabajos-operadora/informe-trabajos-operadora.component';
import { EditarInformeOperadoraComponent } from './componentes/editar-informe-operadora/editar-informe-operadora.component';
import { VerificacionNovedadComponent } from './componentes/verificacion-novedad/verificacion-novedad.component';
import { VerificacionInyectorComponent } from './componentes/verificacion-inyector/verificacion-inyector.component';
import { VerificacionReinyectorComponent } from './componentes/verificacion-reinyector/verificacion-reinyector.component';
import { JustificadoBitacoraPipe, TipoNovedadPipe } from '../resources/pipes/justificadoBitacora';
import { ValoracionBitacoraPipe } from '../resources/pipes/valoracionBitacora';
import { ValoracionProduccionPipe, ValoracionNovedadesPipe } from '../resources/pipes/valoracion-produccion';
import { EstadoBitacoraPipe} from '../resources/pipes/estado-bitacora';
import { TipoPozoPipe} from '../resources/pipes/tipo-pozo.pipe';
import { EstadoPortafolioPipe} from '../resources/pipes/estado-portafolioBitacora.pipe';
import { EstadoInforme} from '../resources/pipes/EstadoInforme';
import { EditarVerificacionProduccionComponent } from './componentes/editar-verificacion-produccion/editar-verificacion-produccion.component';
import { EditarVerificacionFechasComponent } from './componentes/editar-verificacion-fechas/editar-verificacion-fechas.component';
import { EditarVerificacionInyectorComponent } from './componentes/editar-verificacion-inyector/editar-verificacion-inyector.component';
import { EditarVerificacionReinyectorComponent } from './componentes/editar-verificacion-reinyector/editar-verificacion-reinyector.component';
import { ToastModule } from 'primeng/toast';
import { ConclusionesRecomendacionesComponent } from './componentes/conclusiones-recomendaciones/conclusiones-recomendaciones.component';
import { SeguimientoNovedadComponent } from './componentes/seguimiento-novedad/seguimiento-novedad.component';


@NgModule({
  declarations: [VerificacionFechasComponent, VerificacionProduccionComponent,
     InformeTrabajosOperadoraComponent,
     BuscarPortafolioBitacoraComponent,

     EstadoPortafolioPipe,TipoPozoPipe,
     EditarInformeOperadoraComponent,
     VerificacionNovedadComponent,
     EstadoInforme,
     VerificacionInyectorComponent,
     VerificacionReinyectorComponent,
   
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

    InformeTrabajosOperadoraComponent,
    BuscarPortafolioBitacoraComponent,
    EditarInformeOperadoraComponent,
    VerificacionNovedadComponent,
    VerificacionInyectorComponent,
    VerificacionReinyectorComponent,
  
    EstadoBitacoraPipe,
    TipoNovedadPipe,
    ValoracionNovedadesPipe,
    JustificadoBitacoraPipe,
    ValoracionBitacoraPipe,
    EditarVerificacionProduccionComponent,
    ValoracionProduccionPipe, EditarVerificacionFechasComponent, EditarVerificacionInyectorComponent, EditarVerificacionReinyectorComponent

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
