import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxLoadingModule } from "ngx-loading";
import { BuscarPortafolioVerificacionComponent } from './componentes/buscar-portafolio-verificacion/buscar-portafolio-verificacion.component';
import { ReportesDiariosComponent } from './componentes/reportes-diarios/reportes-diarios.component';
import { VerificacionFechasComponent } from './componentes/verificacion-fechas/verificacion-fechas.component';
import { VerificacionProduccionComponent } from './componentes/verificacion-produccion/verificacion-produccion.component';
import { DocumentoOperadoraComponent } from './componentes/documento-operadora/documento-operadora.component';
import { BuscarPortafolioComponent } from './componentes/buscar-portafolio/buscar-portafolio.component';


@NgModule({
  declarations: [ BuscarPortafolioVerificacionComponent, ReportesDiariosComponent, VerificacionFechasComponent, VerificacionProduccionComponent, DocumentoOperadoraComponent, BuscarPortafolioComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class MTrabajoBitacoraModule { }
