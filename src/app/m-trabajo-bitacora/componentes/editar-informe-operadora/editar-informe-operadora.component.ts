
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService, SelectItem } from 'primeng/api';

import { InformeTrabajoOperadoraService } from '../../servicios/informe-trabajo-operadora.service';
import { EditarInformeOperadoraService } from '../../servicios/editar-informeOperadora.service';

import { Bloque } from 'src/app/entidades/bloque';
import { Campo } from 'src/app/entidades/campo';
import { Consorcio } from 'src/app/entidades/consorcio';
import { Operadora } from 'src/app/entidades/operadora';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Pozo } from 'src/app/entidades/pozo';
import { TipoPozo } from 'src/app/entidades/tipo-pozo';
import { TipoTrabajo } from 'src/app/entidades/tipo-trabajo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { InformeOperadora } from 'src/app/entidades/informe-operadora';
  minDate: Date;
  maxDate: Date;
  confirmModalRef: BsModalRef;
  
@Component({
  selector: 'app-editar-informe-operadora',
  templateUrl: './editar-informe-operadora.component.html',
  styleUrls: ['./editar-informe-operadora.component.css']
})
export class EditarInformeOperadoraComponent implements OnInit {
  usuario: Usuario;
  today = new Date();
  informeOperadora: InformeOperadora = new InformeOperadora;
  codInformeOperadora: number;
  codPortafolio: number;
  numeroSgc: string;
  numeroOficio: string;
  anexoDocumento:string;
  anexo_Oficio: string;
  fechaOficio: Date;
  fechaArch: Date;
  resultado: number;
  costo_real: number;
  estado: number;
  fecha_actualizacion: Date;
  id_usuario: number;
  rig: string;

  minDate: Date;
  maxDate: Date;
  confirmModalRef: BsModalRef;
  
  constructor(public editarInforeOperadoraService: EditarInformeOperadoraService,  private messageService: MessageService, private modalService: BsModalService, public crearInformeOperadora: InformeTrabajoOperadoraService, public loginService: LoginService, public router: Router) { }

  ngOnInit() {

    this.usuario = this.loginService.sessionValue;
//debugger
    if (!this.usuario) {
      
      this.router.navigate(['/login']);
    }
    if (!this.crearInformeOperadora.informeOperadora) {
      this.router.navigate(['/menu', { outlets: { sitp: ['informeOperadora'] } }]);
    }
    
    this.maxDate = new Date();
    this.minDate = new Date(2010, 0, 1);
    
    this.informeOperadora= this.crearInformeOperadora.informeOperadora;
    this.informeOperadora.fechaArch = new Date(this.informeOperadora.fechaArch);
    this.informeOperadora.fechaOficio = new Date(this.informeOperadora.fechaOficio);
    this.informeOperadora.fecha_actualizacion = new Date(this.informeOperadora.fecha_actualizacion);
    


    console.log(this.informeOperadora);
    
   
  }

  guardarInformeTrabajo() {
   

    this.crearInformeOperadora.transUpdateInformeOperadora(this.informeOperadora).subscribe(data => {

      if (data) {
       // this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se actualizo el portafolio' });
        this.router.navigate(['/menu', { outlets: { sitp: ['informeOperadora'] } }]);
      } else {
        //this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se pudo actualizar el portafolio' });

      }
    });

  }
  

// metodo para llamar al componente
 

  }