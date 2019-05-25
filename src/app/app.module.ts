import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Constantes } from './resources/constantes';
import { MenuComponent } from './menu/menu.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule
  ],
  providers: [Constantes],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
