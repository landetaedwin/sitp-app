import { Component, OnInit } from '@angular/core';
import {Portafolio} from 'src/app/entidades/portafolio';
import { MessageService, SelectItem } from "primeng/api";
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { VerificacionFechas } from 'src/app/entidades/verificacionFechas';
import { InformeOperadora } from 'src/app/entidades/informe-operadora';
import { DocumentoOperadora } from 'src/app/entidades/documentoOperadora';

import { VerificarFechasService } from 'src/app/m-trabajo-bitacora/servicios/verificar-fechas.service';
import { Router, RouterLink } from '@angular/router';
import { BusquedaService } from 'src/app/m-trabajo-pozo/servicios/buscar-portafolio.service';
import { InformeTrabajoOperadoraService } from '../../servicios/informe-trabajo-operadora.service';
import { VerificarProduccionService } from '../../servicios/verificar-produccion.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-verificacion-fechas',
  templateUrl: './verificacion-fechas.component.html',
  styleUrls: ['./verificacion-fechas.component.css']
})
export class VerificacionFechasComponent implements OnInit {
  portafolio: Portafolio;
  estadolist: SelectItem[];
  justificadoList: SelectItem[]=[];
  novedadList: SelectItem[]=[];
  fechaArch: Date;
  x: number=0
  
  constructor(public verificarProduccionService:VerificarProduccionService,public busquedaService:BusquedaService, public informeTrabajoOperadoraService: InformeTrabajoOperadoraService, http:HttpClient, public verificacionFechaService: VerificarFechasService, private messageService: MessageService, public loginService: LoginService, public router: Router) {
  
    this.portafolio = this.verificacionFechaService.portafolio;
  
    this.verificarFechas.visualizar_valoraciom="No Cumple"
    this.verificarFechas.estado=1;

    this.estadolist= [
                      { label: "Registrado", value: 1, disabled: false },
                      { label: "Anulado", value: 2, disabled: false },
                     
  ];

  this.justificadoList= [
    { label: "Seleccione...", value: null, disabled: false },
    { label: "Si", value: 1, disabled: false },
    { label: "No", value: 2, disabled: false }

];
   

this.novedadList= [
  { label: "Seleccione...", value: null, disabled: false },
  { label: "Si", value: 1, disabled: false },
  { label: "No", value: 2, disabled: false }

];


  }


  public loading = false;
  today= new Date();
  verificarFechas = new VerificacionFechas();
  usuario: Usuario;
  fechasList: VerificacionFechas[]=[];
 dtaList: InformeOperadora[]=[];
 docOperadoraList: DocumentoOperadora[]=[];
  sumafecha : Date;

  ngOnInit() {


    this.verificarFechas.fecha_actualizacion = this.today
     this.loading = true;  
     
  

     if (!this.verificacionFechaService.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
    }

    if(!this.portafolio.fechaFin || !this.portafolio.fechaInicio){
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
      this.messageService.add({ severity: 'warn', detail: 'No se ha establecido una fecha de inicio o fin de actividades' });
    }
 
    this.obtenerFechaArch();
    this.obtenerTodo();
 

    this.verificarFechas.codPortafolio= this.portafolio.codigoPortafolio;
 
    this.verificarFechas.fecha_inicio_trabajo = this.portafolio.fechaInicio;
    this.verificarFechas.fecha_fin_trabajo= this.portafolio.fechaFin;
    this.sumafecha =new Date(this.verificarFechas.fecha_fin_trabajo);
    	
    let dieciseisDias = 1000 * 60 * 60 * 24 * 30;
    let resta = this.sumafecha.getTime() + dieciseisDias;
    //this.verificarFechas.fechaPresentacion = new Date (this.sumafecha.setTime(this.sumafecha.getTime()+30))
    this.verificarFechas.fechaPresentacion = new Date (resta)
    this.verificarFechas.fecha_inicio_trabajo= new Date(this.portafolio.fechaInicio);
    this.today=new Date(this.today);
    //this.infomeOperadora.fechaArch= new Date(this.infomeOperadora.fechaArch);

   

    this.usuario = this.loginService.sessionValue;
    this.fechasList= [];

    if(!this.usuario){
      this.router.navigate(['/login'])
    }
    
    this.buscarpoId();


      
  }

  buscarpoId(){
    this.verificacionFechaService.buscarporId(this.verificarFechas.codPortafolio).subscribe(
      (data: VerificacionFechas[]) => {   
      if (data) {
        this.fechasList = data;
        
        this.verificarFechas.justificado=null;
      
        if (data.length!==0) {
          this.messageService.add({ severity: 'warn', detail: 'Ya existe un informe asignado en este pozo' });
          this.verificarFechas.formDisabled = 1;
        }
        
      }
        this.loading = false;

      });
  }

  
  guardarVerificarFechas(){
    this.verificarFechas.id_usuario= this.usuario.idUsuario;
    this.verificacionFechaService.transCrearVerificacionFechas(this.verificarFechas).subscribe(data =>{
      if (data) {
     //   this.fechasList = data; 
     if(this.verificarFechas.estado===1){
      this.verificarFechas.visualizar_estado="Registrado"
      console.log('x is equal to y');
    }
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se Creó el Informe de Verificación de Fechas' });
        this.verificarFechas.formDisabled = 1;
        this.obtenerTodo();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se pudo crear el informe de Verificación de Fechas' });
  
      }
    });
    }

    
    editarVerificacionFechas(verificacionFechas:VerificacionFechas){
      this.verificacionFechaService.verificarFechas = verificacionFechas;
      this.router.navigate(['/menu', { outlets: { sitp: ['editarFechas'] } }]);
      console.log(VerificacionFechas);
    }

    obtenerTodo(){
      this.verificacionFechaService.buscarporId(this.portafolio.codigoPortafolio).subscribe(
        (data: VerificacionFechas[]) => {   
        if (data) {
          this.fechasList = data;
          this.verificarFechas.justificado=null;
        
        }   
          this.loading = false;
  
        });
      }

      volver(portafolio: Portafolio) {
        console.log("click");
      //this.busquedaService.portafolio = portafolio;
      //  this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
      this.informeTrabajoOperadoraService.portafolio=portafolio;
      this.router.navigate(['/menu', { outlets: { sitp: ['informeOperadora'] } }]);
      }

      
      siguiente(portafolio: Portafolio) {
        console.log("click");
        this.verificarProduccionService.portafolio = portafolio;
        this.router.navigate(['/menu', { outlets: { sitp: ['verificarProduccion'] } }]);
      }
      
      obtenerFechaArch(){
        this.informeTrabajoOperadoraService.ObtenerDatos(this.portafolio.codigoPortafolio).subscribe(
           
          (data: InformeOperadora[]) => {
            console.log(data);
            if(data.length>0){                   
                this.dtaList=data
               this.verificarFechas.fechaArch=new Date(this.dtaList[0].fechaArch);  
               console.log(this.dtaList[0].fechaArch);
              }
              else{
                this.messageService.add({ severity: 'warn', detail: 'Aun no se ha asignado una fecha de notificacion de solicitud de aprobacion' });
                this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
              }
               this.busquedaService.getDocumentoOperadoraByCodigoPortafolioList(this.portafolio.codigoPortafolio).subscribe(
                (data2: DocumentoOperadora[]) => {
                  if(data2.length>0){
                    console.log(data2); 
                  this.docOperadoraList=data2
                this.verificarFechas.fechaNotificacion=new Date(this.docOperadoraList[0].fechaOficio)
                console.log(this.dtaList[0].fechaOficio);
                this.obtenerValor();
                  }else{
                  this.messageService.add({ severity: 'warn', detail: 'Aun no se ha asignado una fecha de entrega de informe de resultados' });
                  this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
                }
              }
              );
              } 
              );
       
      }

      obtenerFechaRegistro(){

        this.busquedaService.getDocumentoOperadoraByCodigoPortafolioList(this.portafolio.codigoPortafolio).subscribe(
          (data: DocumentoOperadora[]) => {
          this.verificarFechas.fechaNotificacion=new Date(this.docOperadoraList[0].fechaOficio)
        } 
        );
      
     
      }


      obtenerValor(){

    if (this.verificarFechas.fechaPresentacion>=this.verificarFechas.fechaArch && this.verificarFechas.fechaNotificacion<=this.verificarFechas.fecha_inicio_trabajo){
    //  console.log(this.verificarFechas.fechaPresentacion.getTime()-this.today.getTime());
      //console.log(this.portafolio.fechaRegistro.getTime()-this.verificarFechas.fecha_inicio_trabajo.getTime());
       
      this.verificarFechas.valoracion=0;
    }


    if (this.verificarFechas.fechaNotificacion>this.verificarFechas.fecha_inicio_trabajo){
      this.verificarFechas.valoracion=1;
     // console.log(this.portafolio.fechaRegistro.getTime()-this.verificarFechas.fecha_inicio_trabajo.getTime());
    }


    if ( this.verificarFechas.fechaPresentacion>this.fechaArch){
      this.verificarFechas.valoracion=2;
      //console.log(this.verificarFechas.fechaPresentacion.getTime()-this.today.getTime());
    }

    if (this.verificarFechas.fechaNotificacion>this.verificarFechas.fecha_inicio_trabajo && this.verificarFechas.fechaPresentacion<this.verificarFechas.fechaArch){
      this.verificarFechas.valoracion=3;
     // console.log(this.today.getTime()-this.verificarFechas.fechaPresentacion.getTime());
      //console.log(this.verificarFechas.fecha_inicio_trabajo.getTime()-this.portafolio.fechaRegistro.getTime());
    }
      }
}
