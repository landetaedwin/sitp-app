import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './m-login/login/login.component';
import { MenuComponent } from './m-menu/menu/menu.component';
import { CrearPortafolioComponent } from './m-trabajo-pozo/componentes/crear-portafolio/crear-portafolio.component';
import { EditarPortafolioComponent } from './m-trabajo-pozo/componentes/editar-portafolio/editar-portafolio.component';
import { AnularPortafolioComponent } from './m-trabajo-pozo/componentes/anular-portafolio/anular-portafolio.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'crearPortafolio', component: CrearPortafolioComponent},
  {
    path: 'menu', component: MenuComponent, children: [
      { path: 'crearPortafolio', component: CrearPortafolioComponent, outlet: 'sitp' },
      { path: 'editarPortafolio', component: EditarPortafolioComponent, outlet: 'sitp' },
      { path: 'anularPortafolio', component: AnularPortafolioComponent, outlet: 'sitp' },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
