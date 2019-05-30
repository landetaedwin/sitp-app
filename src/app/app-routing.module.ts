import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './principal/login/login.component';
import { MenuComponent } from './principal/menu/menu.component';
import { CrearPortafolioComponent } from './grupo1/crear-portafolio/crear-portafolio.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'crearPortafolio', component: CrearPortafolioComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
