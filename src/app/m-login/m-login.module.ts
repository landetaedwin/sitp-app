import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { MessagesModule } from 'primeng/messages';
import { LoginComponent } from './login/login.component';
import { SoloNumerosDirective } from '../resources/directivas/solo-numeros.directive';

@NgModule({
  declarations: [LoginComponent,SoloNumerosDirective],
  imports: [
    CommonModule,
    FormsModule,
    MessagesModule,
    NgxLoadingModule.forRoot({}),
    

  ]
})
export class MLoginModule { }
