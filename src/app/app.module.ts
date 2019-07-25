import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularWebStorageModule } from 'angular-web-storage';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MLoginModule } from './m-login/m-login.module';
import { MMenuModule } from './m-menu/m-menu.module';
import { MTrabajoBitacoraModule } from './m-trabajo-bitacora/m-trabajo-bitacora.module';
import { MTrabajoPozoModule } from './m-trabajo-pozo/m-trabajo-pozo.module';
import { Constantes } from './resources/constantes';
<<<<<<< HEAD
import { AngularWebStorageModule } from 'angular-web-storage';
import {MTrabajoBitacoraModule} from './m-trabajo-bitacora/m-trabajo-bitacora.module';
=======
>>>>>>> 7a4b66934cc49478ed0e9f3c6207d758037de73d




@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MLoginModule,
    MMenuModule,
    MTrabajoPozoModule,
    MTrabajoBitacoraModule,
    AppRoutingModule,
    AngularWebStorageModule,
    ToastModule




  ],
  providers: [Constantes, MessageService],
  bootstrap: [AppComponent],

})
export class AppModule { }
