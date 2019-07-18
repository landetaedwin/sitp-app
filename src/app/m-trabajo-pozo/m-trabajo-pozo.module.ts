import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxLoadingModule } from "ngx-loading";
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FilterSearchPipe } from '../resources/pipes/filter-search.pipe';
import { AnularPortafolioComponent } from "./componentes/anular-portafolio/anular-portafolio.component";
import { AsignacionCamposComponent } from './componentes/asignacion-campos/asignacion-campos.component';
import { BuscarPortafolioComponent } from './componentes/buscar-portafolio/buscar-portafolio.component';
import { CrearPortafolioComponent } from "./componentes/crear-portafolio/crear-portafolio.component";
import { EditarPortafolioComponent } from "./componentes/editar-portafolio/editar-portafolio.component";




@NgModule({
  declarations: [
    CrearPortafolioComponent,
    EditarPortafolioComponent,
    AnularPortafolioComponent,
    BuscarPortafolioComponent,
    AsignacionCamposComponent,
    FilterSearchPipe

  ],
  imports: [
    CommonModule,
    FormsModule,
    FieldsetModule,
    BrowserAnimationsModule,
    DropdownModule,
    CalendarModule,
 
    NgxPaginationModule,
 

    ModalModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ]
})
export class MTrabajoPozoModule { }
