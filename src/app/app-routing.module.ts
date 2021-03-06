import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './m-login/login/login.component';
import { MenuComponent } from './m-menu/menu/menu.component';
import { BuscarPortafolioBitacoraComponent } from './m-trabajo-bitacora/componentes/buscar-portafolio-bitacora/buscar-portafolio-bitacora.component';
import { EditarInformeOperadoraComponent } from './m-trabajo-bitacora/componentes/editar-informe-operadora/editar-informe-operadora.component';
import { EditarVerificacionFechasComponent } from './m-trabajo-bitacora/componentes/editar-verificacion-fechas/editar-verificacion-fechas.component';
import { EditarVerificacionInyectorComponent } from './m-trabajo-bitacora/componentes/editar-verificacion-inyector/editar-verificacion-inyector.component';
import { EditarVerificacionProduccionComponent } from './m-trabajo-bitacora/componentes/editar-verificacion-produccion/editar-verificacion-produccion.component';
import { EditarVerificacionReinyectorComponent } from './m-trabajo-bitacora/componentes/editar-verificacion-reinyector/editar-verificacion-reinyector.component';
import { InformeTrabajosOperadoraComponent } from './m-trabajo-bitacora/componentes/informe-trabajos-operadora/informe-trabajos-operadora.component';;
import { VerificacionFechasComponent } from './m-trabajo-bitacora/componentes/verificacion-fechas/verificacion-fechas.component';
import { VerificacionInyectorComponent } from './m-trabajo-bitacora/componentes/verificacion-inyector/verificacion-inyector.component';
import { VerificacionNovedadComponent } from './m-trabajo-bitacora/componentes/verificacion-novedad/verificacion-novedad.component';
import { VerificacionProduccionComponent } from './m-trabajo-bitacora/componentes/verificacion-produccion/verificacion-produccion.component';
import { VerificacionReinyectorComponent } from './m-trabajo-bitacora/componentes/verificacion-reinyector/verificacion-reinyector.component';
import { AsignacionCamposComponent } from './m-trabajo-pozo/componentes/asignacion-campos/asignacion-campos.component';
import { BuscarPortafolioComponent } from './m-trabajo-pozo/componentes/buscar-portafolio/buscar-portafolio.component';
import { CrearPortafolioComponent } from './m-trabajo-pozo/componentes/crear-portafolio/crear-portafolio.component';
import { DocumentoMinisterioComponent } from './m-trabajo-pozo/componentes/documento-ministerio/documento-ministerio.component';
import { DocumentoOperadoraComponent } from './m-trabajo-pozo/componentes/documento-operadora/documento-operadora.component';
import { EditarPortafolioComponent } from './m-trabajo-pozo/componentes/editar-portafolio/editar-portafolio.component';
import { HistorialPozoComponent } from './m-trabajo-pozo/componentes/historial-pozo/historial-pozo.component';
import { RegistroTasasComponent } from './m-trabajo-pozo/componentes/registro-tasas/registro-tasas.component';
import { RegistroTrabajoDiarioComponent } from './m-trabajo-pozo/componentes/registro-trabajo-diario/registro-trabajo-diario.component';
import { VerificacionTasaComponent } from './m-trabajo-pozo/componentes/verificacion-tasa/verificacion-tasa.component';
import { VerificarPagosComponent } from './m-trabajo-pozo/componentes/verificar-pagos/verificar-pagos.component';
import { ConclusionesRecomendacionesComponent } from './m-trabajo-bitacora/componentes/conclusiones-recomendaciones/conclusiones-recomendaciones.component';
import { SeguimientoNovedadComponent } from './m-trabajo-bitacora/componentes/seguimiento-novedad/seguimiento-novedad.component';
import { ConsorciosComponent } from './m-mantenimiento/componentes/consorcios/consorcios.component';






const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },


  {
    path: 'menu', component: MenuComponent, children: [
      { path: 'buscarPortafolio', component: BuscarPortafolioComponent, outlet: 'sitp' },
      { path: 'crearPortafolio', component: CrearPortafolioComponent, outlet: 'sitp' },
      { path: 'editarPortafolio', component: EditarPortafolioComponent, outlet: 'sitp' },
      { path: 'registroDiario', component: RegistroTrabajoDiarioComponent, outlet: 'sitp' },
      { path: 'asignacionCampos', component: AsignacionCamposComponent, outlet: 'sitp' },
      { path: 'buscarPortafolioBitacora', component: BuscarPortafolioBitacoraComponent, outlet: 'sitp' },
      { path: 'informeOperadora', component: InformeTrabajosOperadoraComponent, outlet: 'sitp' },
      { path: 'verificacionFechas', component: VerificacionFechasComponent, outlet: 'sitp' },
      { path: 'editarFechas', component: EditarVerificacionFechasComponent, outlet: 'sitp' },
      { path: 'verificarProduccion', component: VerificacionProduccionComponent, outlet: 'sitp' },
      { path: 'verificarNovedad', component: VerificacionNovedadComponent, outlet: 'sitp' },
      { path: 'reporte-documentos-operadora', component: DocumentoOperadoraComponent, outlet: 'sitp' },
      { path: 'reporte-documentos-ministerio', component: DocumentoMinisterioComponent, outlet: 'sitp' },
      { path: 'editarInformeOperadora', component: EditarInformeOperadoraComponent, outlet: 'sitp' },
      { path: 'editarVerificarProduccion', component: EditarVerificacionProduccionComponent, outlet: 'sitp' },
      { path: 'verificarInyector', component: VerificacionInyectorComponent, outlet: 'sitp' },
      { path: 'EditarVerificacionInyectorComponent', component: EditarVerificacionInyectorComponent, outlet: 'sitp' },
      { path: 'verificarReinyector', component: VerificacionReinyectorComponent, outlet: 'sitp' },
      { path: 'EditarVerificacionReinyectorComponent', component: EditarVerificacionReinyectorComponent, outlet: 'sitp' },
      { path: 'conclusiones', component: ConclusionesRecomendacionesComponent, outlet: 'sitp' },
      { path: 'verificarTasa', component: VerificacionTasaComponent, outlet: 'sitp' },
      { path: 'historialPozo', component: HistorialPozoComponent, outlet: 'sitp' },
      { path: 'registroTasas', component: RegistroTasasComponent, outlet: 'sitp' },
      { path: 'verificarPagos', component: VerificarPagosComponent, outlet: 'sitp' },

      { path: 'seguimientoNovedad', component: SeguimientoNovedadComponent, outlet: 'sitp' },

      { path: 'consorcios', component: ConsorciosComponent, outlet: 'sitp' },

    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }