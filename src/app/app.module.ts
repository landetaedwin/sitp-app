import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearPortafolioComponent } from './grupo1/crear-portafolio/crear-portafolio.component';
import { LoginComponent } from './principal/login/login.component';
import { MenuComponent } from './principal/menu/menu.component';
import { Constantes } from './resources/constantes';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    CrearPortafolioComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    PanelMenuModule,
    MenuModule,
    DropdownModule,
    CalendarModule,
    FieldsetModule


  ],
  providers: [Constantes],
  bootstrap: [AppComponent],

})
export class AppModule { }
