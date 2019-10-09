import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularWebStorageModule } from 'angular-web-storage';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MLoginModule } from './m-login/m-login.module';
import { MMantenimientoModule } from './m-mantenimiento/m-mantenimiento.module';
import { MMenuModule } from './m-menu/m-menu.module';
import { MTrabajoBitacoraModule } from './m-trabajo-bitacora/m-trabajo-bitacora.module';
import { MTrabajoPozoModule } from './m-trabajo-pozo/m-trabajo-pozo.module';
import { Constantes } from './resources/constantes';




@NgModule({
  declarations: [
    AppComponent,



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MLoginModule,
    MMenuModule,
    MTrabajoPozoModule,
    MTrabajoBitacoraModule,
    MMantenimientoModule,
    AppRoutingModule,
    AngularWebStorageModule,
    ToastModule




  ],
  providers: [Constantes, MessageService],
  bootstrap: [AppComponent],

})
export class AppModule { }
