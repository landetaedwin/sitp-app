import { Component, OnInit,  TemplateRef } from '@angular/core';
import { MessageService, SelectItem } from "primeng/api";
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { VerificacionNovedad } from 'src/app/entidades/verificacion-novedad';
import { Portafolio } from 'src/app/entidades/portafolio';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { ConclusionesRecomendaciones } from 'src/app/m-trabajo-bitacora/servicios/conclusiones-recomendaciones.service';
import { VerificarProduccionService } from 'src/app/m-trabajo-bitacora/servicios/verificar-produccion.service';
import { SeguimientoNovedadesService } from 'src/app/m-trabajo-bitacora/servicios/seguimiento-novedades';
import { VerificarNovedadService } from 'src/app/m-trabajo-bitacora/servicios/verificarNovedad.service';
import { Router, RouterLink } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastModule } from 'primeng/toast';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-verificacion-novedad',
  templateUrl: './verificacion-novedad.component.html',
  styleUrls: ['./verificacion-novedad.component.css']
})
export class VerificacionNovedadComponent implements OnInit {
  portafolio: Portafolio;
  estadolist: SelectItem[] = [];
  verificacioNovedad = new VerificacionNovedad();
  novedadList: VerificacionNovedad[] = [];
  usuario: Usuario;
  hoy= new Date();
  anularNovedad: VerificacionNovedad = new VerificacionNovedad;
  editarNovedad: VerificacionNovedad = new VerificacionNovedad;
  public loading = false;
  justificadoList: SelectItem[]=[];
  valoracionList: SelectItem[]=[];
  novedad: SelectItem[]=[];
  page_size: number = 50;
  page_number: number = 1;
  registroNovedadModalRef: BsModalRef;

  constructor(private seguimientoNovedadesService: SeguimientoNovedadesService, private conclusionesRecomendacionesService:ConclusionesRecomendaciones, private modalService: BsModalService,http: HttpClient, public verificarProduccionService: VerificarProduccionService,public verificarNovedadService: VerificarNovedadService, private messageService: MessageService, public loginService: LoginService, public router: Router) {
    this.portafolio = this.verificarNovedadService.portafolio;



    this.hoy = new Date();
    this.verificacioNovedad.estado=1;
    this.verificacioNovedad.justificado=2;
    this.verificacioNovedad.valoracion=1;
    this.verificacioNovedad.novedad=1;
    
    this.estadolist = [
      { label: "Registrado", value: 1, disabled: false },
      { label: "Anulado", value: 2, disabled: false }
    ];

    this.valoracionList = [
      { label: "Si", value: 1, disabled: false },
      { label: "No", value: 2, disabled: false }
    ];
    
    this.justificadoList= [

      { label: "Si", value: 1, disabled: false },
      { label: "No", value: 2, disabled: false }
  
  ];

  this.novedad= [
  
    { label: "Si", value: 1, disabled: false },
    { label: "No", value: 2, disabled: false }

];
  
  }



  ngOnInit() {
    this.verificacioNovedad.fecha_actualizacion = this.hoy;
    this.usuario = this.loginService.sessionValue;
    this.novedadList = [];

    
    if (!this.verificarNovedadService.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
    }
    
    
    // verificar si esta la sesion activa
    if (!this.usuario) {
      this.router.navigate(['/login'])
    }
    this.obtenerTodo();
    this.buscarpoId();
  }

  buscarpoId() {
    this.verificarNovedadService.buscarporId(this.verificacioNovedad.codPortafolio).subscribe(
      (data: VerificacionNovedad[]) => {
        if (data) {
          console.log(data.length);
          this.novedadList = data;
        }
        this.loading = false;

      });
  }


  obtenerTodo() {
    this.verificacioNovedad.codPortafolio = this.portafolio.codigoPortafolio;
    this.verificarNovedadService.buscarporId(this.portafolio.codigoPortafolio).subscribe(
      (data: VerificacionNovedad[]) => {
        if (data) {
          this.novedadList = [];
          this.novedadList = data;
          this.verificacioNovedad.estado=1
          console.log(this.verificacioNovedad.codVerfTrabajo)
        }
        this.loading = false;
     
        console.log( data.toString.length)
      });
  }

  guardar(){
    this.verificacioNovedad.idUsu= this.usuario.idUsuario;
    this.verificarNovedadService.transCrearVerificacionNovedad(this.verificacioNovedad).subscribe(data =>{
      if (data) {
        this.verificacioNovedad.verfNovedad= this.portafolio.codigoPortafolio +"_"+ this.verificarNovedadService.transCrearVerificacionNovedad.length
        console.log(this.verificacioNovedad.verfNovedad)
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se creo el Informe de Verificación de Novedad' });
        this.obtenerTodo();
      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se pudo crear el informe de Verificación de Novedad' });
  
      }
    });
}

volver(portafolio: Portafolio) {
  console.log("click");
  this.verificarProduccionService.portafolio = portafolio;
  this.router.navigate(['/menu', { outlets: { sitp: ['verificarProduccion'] } }]);
}

siguiente(portafolio: Portafolio) {
  console.log("click");
  this.conclusionesRecomendacionesService.portafolio = portafolio;
  this.router.navigate(['/menu', { outlets: { sitp: ['conclusiones'] } }]);
}

seguimientoNovedad(verificacionNovedad: VerificacionNovedad) {
  console.log("click");
  this.verificacioNovedad.codVerfTrabajo= this.anularNovedad.codVerfTrabajo
  this.seguimientoNovedadesService.verificacioNovedad= verificacionNovedad
  this.seguimientoNovedadesService.portafolio=this.portafolio
  console.log(this.seguimientoNovedadesService.verificacioNovedad);
  this.router.navigate(['/menu', { outlets: { sitp: ['seguimientoNovedad'] } }]);
}

openModalNovedadAnular(template: TemplateRef<any>,eNovedad:VerificacionNovedad) {
  this.anularNovedad = this.cloneJSON(eNovedad);
  this.registroNovedadModalRef = this.modalService.show(template, { class: 'modal-sm', backdrop: 'static', keyboard: false });
  this.obtenerTodo();
}

closeModalNovedadAnular() {
  this.registroNovedadModalRef.hide();
}

cloneJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}



  editNovedad() {
    this.loading = true;
    this.editarNovedad.codVerfTrabajo = this.verificacioNovedad.codVerfTrabajo;
    this.editarNovedad.estado = this.verificacioNovedad.estado;
    this.editarNovedad.valoracion = this.verificacioNovedad.valoracion;
    this.editarNovedad.justificado = this.verificacioNovedad.justificado;
    this.editarNovedad.observacion = this.verificacioNovedad.observacion;
    this.editarNovedad.idUsu = this.usuario.idUsuario;
    this.editarNovedad.fecha_actualizacion = new Date();  
    this.editarNovedad.verfNovedad= this.verificacioNovedad.verfNovedad

    this.verificarNovedadService.transUpdateVerificacionNovedad(this.editarNovedad).subscribe(data=> {

      if (data == "La tasa ha sido actualizada correctamente") {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: '' + data });
       // this.closeModalNovedadAnular();
        this.obtenerTodo();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: '' + data });
      }
    });


  }

  AnularNovedad() {
    this.verificacioNovedad.codPortafolio= this.anularNovedad.codPortafolio
    this.verificacioNovedad.codVerfTrabajo= this.anularNovedad.codVerfTrabajo
    this.verificacioNovedad.fecha_actualizacion= new Date(this.anularNovedad.fecha_actualizacion)
    this.verificacioNovedad.idUsu =this.anularNovedad.idUsu;
    this.verificacioNovedad.justificado= this.anularNovedad.justificado
    this.verificacioNovedad.novedad= this.anularNovedad.novedad
    this.verificacioNovedad.observacion= this.anularNovedad.observacion
    this.verificacioNovedad.valoracion= this.anularNovedad.valoracion
    this.verificacioNovedad.verfNovedad= this.anularNovedad.verfNovedad
    this.loading = true;
    this.verificacioNovedad.estado = 2;

    console.log(this.verificacioNovedad)
    this.verificarNovedadService.transUpdateVerificacionNovedad(this.verificacioNovedad)
    .subscribe(data => {
      if (data ) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Novedad Anulada' });
        this.closeModalNovedadAnular();
        this.obtenerTodo();
      } else {
        this.loading = false;
        this.messageService.add({ severity: 'Error', detail: 'No se ha podido anular'});
     //   this.closeModalNovedadAnular();
      }
    });


  }




}




