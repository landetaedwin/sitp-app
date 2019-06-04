import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MLoginModule } from './m-login/m-login.module';
import { MMenuModule } from './m-menu/m-menu.module';
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
    AppRoutingModule,
    
    

  ],
  providers: [Constantes, MessageService],
  bootstrap: [AppComponent],

})
export class AppModule { }
