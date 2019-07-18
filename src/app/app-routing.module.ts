import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './m-login/login/login.component';
import { MenuComponent } from './m-menu/menu/menu.component';
import { CrearPortafolioComponent } from './m-trabajo-pozo/componentes/crear-portafolio/crear-portafolio.component';
import { EditarPortafolioComponent } from './m-trabajo-pozo/componentes/editar-portafolio/editar-portafolio.component';
import { AnularPortafolioComponent } from './m-trabajo-pozo/componentes/anular-portafolio/anular-portafolio.component';
import { BuscarPortafolioComponent } from './m-trabajo-pozo/componentes/buscar-portafolio/buscar-portafolio.component';
import { BuscarPortafolioVerificacionComponent } from './m-trabajo-bitacora/componentes/buscar-portafolio-verificacion/buscar-portafolio-verificacion.component';
import { ReportesDiariosComponent } from './m-trabajo-bitacora/componentes/reportes-diarios/reportes-diarios.component';
import { VerificacionFechasComponent } from './m-trabajo-bitacora/componentes/verificacion-fechas/verificacion-fechas.component';
import { VerificacionProduccionComponent } from './m-trabajo-bitacora/componentes/verificacion-produccion/verificacion-produccion.component';
import { AsignacionCamposComponent } from './m-trabajo-pozo/componentes/asignacion-campos/asignacion-campos.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'menu', component: MenuComponent, children: [
      { path: 'buscarPortafolio', component: BuscarPortafolioComponent, outlet: 'sitp' },
      { path: 'crearPortafolio', component: CrearPortafolioComponent, outlet: 'sitp' },
      { path: 'editarPortafolio', component: EditarPortafolioComponent, outlet: 'sitp' },
      { path: 'anularPortafolio', component: AnularPortafolioComponent, outlet: 'sitp' },
      { path: 'asignacionCampos', component: AsignacionCamposComponent, outlet: 'sitp' },



      { path: 'buscarPortafolioVerificacion', component: BuscarPortafolioVerificacionComponent, outlet: 'sitp' },
      { path: 'reportesDiarios', component: ReportesDiariosComponent, outlet: 'sitp' },
      { path: 'verificacionFechas', component: VerificacionFechasComponent, outlet: 'sitp' },
      { path: 'verificacionProduccion', component: VerificacionProduccionComponent, outlet: 'sitp' },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
