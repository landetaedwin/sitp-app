import { Component, OnInit, TemplateRef } from '@angular/core';
import {Portafolio} from 'src/app/entidades/portafolio';
import { MessageService, SelectItem } from "primeng/api";
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, RouterLink } from '@angular/router';
;

import { ConclusionRecomendacion } from 'src/app/entidades/conclusionRecomendacion';
import { VerificacionFechas } from 'src/app/entidades/verificacionFechas';
import { VerificacionNovedad } from 'src/app/entidades/verificacion-novedad';
import {VerificacionProduccion} from 'src/app/entidades/verificacionProduccion';
import {InformeOperadora} from 'src/app/entidades/informe-operadora';


import { ConclusionesRecomendaciones } from '../../servicios/conclusiones-recomendaciones.service'
import { InformeTrabajoOperadoraService } from '../../servicios/informe-trabajo-operadora.service'
import { VerificarFechasService } from '../../servicios/verificar-fechas.service'
import { VerificarProduccionService } from '../../servicios/verificar-produccion.service'
import { VerificarNovedadService } from '../../servicios/verificarNovedad.service'


import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-conclusiones-recomendaciones',
  templateUrl: './conclusiones-recomendaciones.component.html',
  styleUrls: ['./conclusiones-recomendaciones.component.css']
})
export class ConclusionesRecomendacionesComponent implements OnInit {

  portafolio: Portafolio;
  estadolist: SelectItem[];

  public loading = false;
  today= new Date();
  conclusionRecomendacion = new ConclusionRecomendacion();
  editarRecomendacion = new ConclusionRecomendacion();
  usuario: Usuario;


  verificarNovedad: VerificacionNovedad;
  informeOperdadora: InformeOperadora;
  verificacionProduccion: VerificacionProduccion
  verificacionFechas: VerificacionFechas
  editarNovedad: VerificacionNovedad = new VerificacionNovedad;
  conclusionList: ConclusionRecomendacion[]=[];
  verificacionFechasList: VerificacionFechas[]=[];
  ProductorList: VerificacionProduccion[]=[];
  InformeList: InformeOperadora[]=[];
  NovedadList: VerificacionNovedad[]=[];
  registroNovedadModalRef: BsModalRef;

  anularConclusion: ConclusionRecomendacion = new ConclusionRecomendacion();


  constructor(private modalService: BsModalService,public VerificarNovedadService: VerificarNovedadService, public VerificarProduccionService: VerificarProduccionService,  public informeTrabajoOperadoraService: InformeTrabajoOperadoraService, public verificarFechasService: VerificarFechasService, public conclusionRecomendacionService:ConclusionesRecomendaciones, http:HttpClient, private messageService: MessageService, public loginService: LoginService, public router: Router) {
    this.portafolio = this.conclusionRecomendacionService.portafolio;
    this.conclusionRecomendacion.estado=1;

    this.estadolist= [
                      { label: "Registrado", value: 1, disabled: false },
                      { label: "Anulado", value: 2, disabled: false },
                     
  ];

   }

  ngOnInit() {

    

    

    if (!this.conclusionRecomendacionService.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
    }

  console.log(this.portafolio.codigoPortafolio)   

    this.usuario = this.loginService.sessionValue;


    if(!this.usuario){
      this.router.navigate(['/login'])
    }

    this.conclusionRecomendacion.id_usuario= this.usuario.idUsuario;
    this.conclusionRecomendacion.codPortafolio= this.portafolio.codigoPortafolio
    this.conclusionRecomendacion.fecha_actualizacion= this.today;
    this.conclusionRecomendacion.codPortafolio= this.portafolio.codigoPortafolio;   
    
   // this.buscarpoId();
    this.obtenerTodoConclusionRecomendacion();
    this.obtenerTodoFechas();
    this.obtenerTodoInyector();
    this.obtenerTodoProductor();
    this.obtenerTodoReinyector();
    this.obtenerTodoNovedad()
    }

 
  guardarConclusionRecomendacion(){


    this.conclusionRecomendacionService.transCrearConclusionRecomendacion(this.conclusionRecomendacion).subscribe(data =>{
      if (data) {
     
        this.conclusionRecomendacion.fecha_actualizacion=this.today
        this.conclusionRecomendacion.estado= 1;   
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se Creó el Informe de Conclusiones y Recomendaciones' });
        this.obtenerTodoConclusionRecomendacion();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se pudo crear el informe de Verificación de Fechas' });
  
      }
    });
    }


    actualizarConclusionRecomendacion(){

      this.loading = true;
      this.editarRecomendacion.codConclusion = this.conclusionRecomendacion.codConclusion;
      this.editarRecomendacion.estado = this.conclusionRecomendacion.estado;
      this.editarRecomendacion.conclusion = this.conclusionRecomendacion.conclusion;
      this.editarRecomendacion.recomendacion = this.conclusionRecomendacion.recomendacion;
      this.editarRecomendacion.fecha_actualizacion =  new Date();
      this.editarRecomendacion.id_usuario = this.usuario.idUsuario

      this.conclusionRecomendacionService.transUpdateVerificacionNovedad(this.editarRecomendacion).subscribe(data =>{
        if (data) {
          this.conclusionRecomendacion.estado= 1;   
          this.loading = false;
          this.messageService.add({ severity: 'success', detail: 'Se Creó el Informe de Conclusiones y Recomendaciones' });
          this.obtenerTodoConclusionRecomendacion();
  
        } else {
          this.loading = false;
          this.messageService.add({ severity: 'info', detail: 'No se pudo crear el informe de Verificación de Fechas' });
    
        }
      });
      }




    obtenerTodoConclusionRecomendacion(){
      console.log("dsfdsf");
      console.log();
      this.conclusionRecomendacionService.buscarporId(this.portafolio.codigoPortafolio).subscribe(
        (data: ConclusionRecomendacion[]) => {   
        if (data) {
          this.conclusionList = data;
        }   
          this.loading = false;
  
        });
      }


      obtenerTodoFechas(){
 
        this.verificarFechasService.buscarporId(this.portafolio.codigoPortafolio).subscribe(
          (data: VerificacionFechas[]) => {   
          if (data) {
            this.verificacionFechasList = data;
          }   
            this.loading = false;
    
          });
        }

        
      obtenerTodoProductor(){
 
        this.verificarFechasService.buscarporId(this.portafolio.codigoPortafolio).subscribe(
          (data: VerificacionProduccion[]) => {   
          if (data) {
            this.ProductorList = data;
          }   
            this.loading = false;
    
          });
        }


        
      obtenerTodoInyector(){
 
        this.VerificarProduccionService.buscarporId(this.portafolio.codigoPortafolio).subscribe(
          (data: VerificacionProduccion[]) => {   
          if (data) {
            this.ProductorList = data;
          }   
            this.loading = false;
    
          });
        }

        obtenerTodoReinyector(){
 
          this.VerificarProduccionService.buscarporId(this.portafolio.codigoPortafolio).subscribe(
            (data: VerificacionProduccion[]) => {   
              if (data) {
                this.ProductorList = data;
              }   
                this.loading = false;
        
              });
        }



        obtenerTodoNovedad(){
          console.log(this.portafolio.codigoPortafolio)
          this.VerificarNovedadService.buscarporId(this.portafolio.codigoPortafolio).subscribe(
            (data: VerificacionNovedad[]) => {   
            if (data) {
              this.NovedadList = data;
            }   
              this.loading = false;
      
            });
        }

        
openModalConclusionAnular(template: TemplateRef<any>,eConclusion:ConclusionRecomendacion) {
  this.anularConclusion = this.cloneJSON(eConclusion);
  this.registroNovedadModalRef = this.modalService.show(template, { class: 'modal-sm', backdrop: 'static', keyboard: false });
  this.obtenerTodoConclusionRecomendacion();
}

closeModalNovedadAnular() {
  this.registroNovedadModalRef.hide();
}

cloneJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}
        

      volver(portafolio: Portafolio) {
        console.log("click");
      this.VerificarNovedadService.portafolio=portafolio;
      this.router.navigate(['/menu', { outlets: { sitp: ['verificarNovedad'] } }]);
      }

      
      siguiente(portafolio: Portafolio) {
        console.log("click");
        this.conclusionRecomendacionService.portafolio = portafolio;
        this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
      }

      AnularConclusion() {
        this.conclusionRecomendacion.codPortafolio= this.anularConclusion.codPortafolio
        this.conclusionRecomendacion.codConclusion= this.anularConclusion.codConclusion
        this.conclusionRecomendacion.fecha_actualizacion= new Date(this.anularConclusion.fecha_actualizacion)
        this.conclusionRecomendacion.recomendacion =this.anularConclusion.recomendacion;
        this.conclusionRecomendacion.id_usuario= this.usuario.idUsuario
       // this.conclusionRecomendacion.fecha_actualizacion= new Date();
        this.conclusionRecomendacion.estado = 2;
        this.loading = true;
        console.log(this.conclusionRecomendacion)
        this.conclusionRecomendacionService.transUpdateVerificacionNovedad(this.conclusionRecomendacion)
        .subscribe(data => {
          if (data ) {
            this.loading = false;
            this.messageService.add({ severity: 'success', detail: 'Novedad Anulada' });
            this.closeModalNovedadAnular();
            this.obtenerTodoConclusionRecomendacion();
            this.conclusionRecomendacion.estado = 1;
            console.log(this.anularConclusion)
          } else {
            this.loading = false;
            this.messageService.add({ severity: 'Error', detail: 'No se ha podido anular'});
         //   this.closeModalNovedadAnular();
          }
        });
      }





}
