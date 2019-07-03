import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxLoadingModule } from "ngx-loading";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { AnularPortafolioComponent } from "./componentes/anular-portafolio/anular-portafolio.component";
import { BuscarPortafolioComponent } from './componentes/buscar-portafolio/buscar-portafolio.component';
import { CrearPortafolioComponent } from "./componentes/crear-portafolio/crear-portafolio.component";
import { EditarPortafolioComponent } from "./componentes/editar-portafolio/editar-portafolio.component";



@NgModule({
  declarations: [
    CrearPortafolioComponent,
    EditarPortafolioComponent,
    AnularPortafolioComponent,
    BuscarPortafolioComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    FieldsetModule,
    BrowserAnimationsModule,
    DropdownModule,
    CalendarModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class MTrabajoPozoModule { }
