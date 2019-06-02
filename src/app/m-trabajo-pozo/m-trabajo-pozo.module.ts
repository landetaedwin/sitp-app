import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearPortafolioComponent } from './componentes/crear-portafolio/crear-portafolio.component';
import { EditarPortafolioComponent } from './componentes/editar-portafolio/editar-portafolio.component';
import { AnularPortafolioComponent } from './componentes/anular-portafolio/anular-portafolio.component';

@NgModule({
  declarations: [CrearPortafolioComponent, EditarPortafolioComponent, AnularPortafolioComponent],
  imports: [
    CommonModule
  ]
})
export class MTrabajoPozoModule { }
