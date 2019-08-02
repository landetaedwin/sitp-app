import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './m-login/login/login.component';
import { TipoPozoComponent } from './m-mantenimiento/componentes/tipo-pozo/tipo-pozo.component';
import { MenuComponent } from './m-menu/menu/menu.component';
import { BuscarPortafolioBitacoraComponent } from './m-trabajo-bitacora/componentes/buscar-portafolio-bitacora/buscar-portafolio-bitacora.component';
import { InformeTrabajosOperadoraComponent } from './m-trabajo-bitacora/componentes/informe-trabajos-operadora/informe-trabajos-operadora.component';
import { ReportesDiariosComponent } from './m-trabajo-bitacora/componentes/reportes-diarios/reportes-diarios.component';
import { VerificacionFechasComponent } from './m-trabajo-bitacora/componentes/verificacion-fechas/verificacion-fechas.component';
import { VerificacionProduccionComponent } from './m-trabajo-bitacora/componentes/verificacion-produccion/verificacion-produccion.component';
import { AnularPortafolioComponent } from './m-trabajo-pozo/componentes/anular-portafolio/anular-portafolio.component';
import { AsignacionCamposComponent } from './m-trabajo-pozo/componentes/asignacion-campos/asignacion-campos.component';
import { BuscarPortafolioComponent } from './m-trabajo-pozo/componentes/buscar-portafolio/buscar-portafolio.component';
import { CrearPortafolioComponent } from './m-trabajo-pozo/componentes/crear-portafolio/crear-portafolio.component';
import { DocumentoMinisterioComponent } from './m-trabajo-pozo/componentes/documento-ministerio/documento-ministerio.component';
import { DocumentoOperadoraComponent } from './m-trabajo-pozo/componentes/documento-operadora/documento-operadora.component';
import { EditarPortafolioComponent } from './m-trabajo-pozo/componentes/editar-portafolio/editar-portafolio.component';
import { RegistroTrabajoDiarioComponent } from './m-trabajo-pozo/componentes/registro-trabajo-diario/registro-trabajo-diario.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },


  {
    path: 'menu', component: MenuComponent, children: [
      { path: 'buscarPortafolio', component: BuscarPortafolioComponent, outlet: 'sitp' },
      { path: 'crearPortafolio', component: CrearPortafolioComponent, outlet: 'sitp' },
      { path: 'editarPortafolio', component: EditarPortafolioComponent, outlet: 'sitp' },
      { path: 'anularPortafolio', component: AnularPortafolioComponent, outlet: 'sitp' },
      { path: 'registroDiario', component: RegistroTrabajoDiarioComponent, outlet: 'sitp' },
      { path: 'asignacionCampos', component: AsignacionCamposComponent, outlet: 'sitp' },
      { path: 'buscarPortafolioBitacora', component: BuscarPortafolioBitacoraComponent, outlet: 'sitp' },
      { path: 'informeOperadora', component: InformeTrabajosOperadoraComponent, outlet: 'sitp' },
      { path: 'reportesDiarios', component: ReportesDiariosComponent, outlet: 'sitp' },
      { path: 'verificacionFechas', component: VerificacionFechasComponent, outlet: 'sitp' },
      { path: 'verificacionProduccion', component: VerificacionProduccionComponent, outlet: 'sitp' },
      { path: 'mantenimiento-tipo-pozo', component: TipoPozoComponent, outlet: 'sitp' },
      { path: 'reporte-documentos-operadora', component: DocumentoOperadoraComponent, outlet: 'sitp' },
      { path: 'reporte-documentos-ministerio', component: DocumentoMinisterioComponent, outlet: 'sitp' },

    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
