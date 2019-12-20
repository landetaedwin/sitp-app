import { Component, OnInit, TemplateRef } from '@angular/core';
import {Portafolio} from 'src/app/entidades/portafolio';
import { MessageService, SelectItem } from "primeng/api";
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { VerificacionProduccion } from 'src/app/entidades/verificacionProduccion';
import { VerificarProduccionService } from 'src/app/m-trabajo-bitacora/servicios/verificar-produccion.service';
import { VerificarFechasService } from 'src/app/m-trabajo-bitacora/servicios/verificar-fechas.service';
import { VerificarNovedadService } from 'src/app/m-trabajo-bitacora/servicios/verificarNovedad.service';
import { Router, RouterLink } from '@angular/router';
import { Produccion } from 'src/app/entidades/produccion';
import { Inyector } from 'src/app/entidades/inyector';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-verificacion-produccion',
  templateUrl: './verificacion-produccion.component.html',
  styleUrls: ['./verificacion-produccion.component.css']
})
export class VerificacionProduccionComponent implements OnInit {
  today = new Date();
  verificacionProduccion = new VerificacionProduccion();
  produccion = new Produccion();
  portafolio: Portafolio;
  produccionList: VerificacionProduccion[]=[];
  verificacionProduccionListar: VerificacionProduccion[]=[];
  datosAntes: Produccion[]=[];
  datosDespues:Produccion[]=[];
  registrosList:SelectItem[]=[];
  estadolist: SelectItem[]=[];
  justificadoList: SelectItem[]=[];
  public loading = false;
  usuario: Usuario;
  anularInforme= new VerificacionProduccion();
  registroInfomreModalRef: BsModalRef;
  buttonDisabled: number;
  sumaPorcentaje:number;

  buttonDespues: boolean = true;

  constructor( private modalService: BsModalService, http:HttpClient,public VerificarNovedadService: VerificarNovedadService, public verificarFechasService: VerificarFechasService, public verificarProduccionService: VerificarProduccionService, private messageService: MessageService, public loginService: LoginService, public router: Router) { 
    
    this.verificacionProduccion.estado=1
    this.verificacionProduccion.numRegistros=3
    this.verificacionProduccion.justificado=2
    this.verificacionProduccion.formDisabled=0
    this.portafolio = this.verificarProduccionService.portafolio;
    this.verificacionProduccion.porcentajeControlEstatico=10
    this.buttonDisabled=0;


    this.justificadoList= [
      { label: "Si", value: 1, disabled: false },
      { label: "No", value: 2, disabled: false }
  
  ];

    this.estadolist= [
                      { label: "Registrado", value: 1, disabled: false },
                      { label: "Cerrado", value: 2, disabled: false },
                      { label: "Anulado", value: 3, disabled: false }
                     ];

    this.registrosList= [
                      { label: "3", value: 3, disabled: false },
                      { label: "4", value: 4, disabled: false },
                      { label: "5", value: 5, disabled: false },
                      { label: "6", value: 6, disabled: false },
                      { label: "7", value: 7, disabled: false },
                      { label: "8", value: 8, disabled: false },
                      { label: "9", value: 9, disabled: false },
                      { label: "10", value: 10, disabled: false }
                     ];

  }

  
  ngOnInit() {
    this.usuario = this.loginService.sessionValue;
    this.verificacionProduccion.fecha_actualizacion = this.today
 
   
    if (!this.verificarProduccionService.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
    }

    if (!this.usuario) {
      this.router.navigate(['/login'])
    }
    this.verificacionProduccion.codPortafolio=this.portafolio.codigoPortafolio ;
    this.verificacionProduccion.tipopozo= this.portafolio.tipoPozo
      //VERIFICA QUE TIPO DE POZO ES

   if (this.portafolio.tipoPozo.codigoTipoPozo==2) {
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarInyector'] } }]);
  }
  if (this.portafolio.tipoPozo.codigoTipoPozo==3) {
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarReinyector'] } }]);
  }

  if(!this.portafolio.fechaFin || !this.portafolio.fechaInicio){
    this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
    this.messageService.add({ severity: 'warn', detail: 'No se ha establecido una fecha de inicio o fin de actividades' });
  }

  this.produccionList = [];

  this.verificacionProduccion.porcentajeControlEstatico=10;
  this.verificacionProduccion.formDisabled=0;
  this.listarDatos();
  }



  cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
  }


  
  cargarDatos(eProduccion: VerificacionProduccion){
    this.buttonDespues= false;
    this.verificarProduccionService.verificarProduccion  = this.cloneJSON(eProduccion);
    this.verificarProduccionService.verificarProduccion = eProduccion;
    this.portafolio.fechaInicio = new Date(this.portafolio.fechaInicio);
 

    this.verificarProduccionService.BuscarInfoAntes(this.portafolio.fechaInicio, this.verificacionProduccion.numRegistros,  this.portafolio.pozo.pozCodigo, this.verificarProduccionService.verificarProduccion .codVerificacion).subscribe(
      (data: Produccion[]) => {   
      if (data) {
        this.datosAntes= data
        this.produccion.promedio_antes =0;
       
          // ENVIO DE DATOS POR CONSOLA
        // console.log(this.portafolio.fechaInicio);
       // console.log(this.datosAntes);

    //SUMA LOS DATOS
     for (let i:number=0 ; i < data.length; i++) {
        this.produccion.promedio_antes += data[i].bppd;// 0,1,2
        //ON=BTIENE EL ULTIMO VALOR
        this.produccion.ultimo_antes= data[i].bppd
        ;
    }

    //CALCULA PROMEDIO
    try{
    this.produccion.promedio_antes= (this.produccion.promedio_antes/data.length)
    this.produccion.PromedioAntesMostrar= this.produccion.promedio_antes.toFixed(2)

    this.verificacionProduccion.valor_antes= this.produccion.promedio_antes
 
    }
    catch (e){
      this.produccion.promedio_antes= (0)
    }
    

    // console.log(  this.produccion.promedio_antes);
      }   
        this.loading = false;
      });
     this.cargarDatosDespues(eProduccion);
  }



  
    almacenamientoAutomatico(){
    console.log("deberia agregar nuevo dato")
      this.verificacionProduccion.idUsu= this.usuario.idUsuario;
    this.verificacionProduccion.descripcionValoracion= null
    this.verificacionProduccion.estado= 5
    //this.verificarProduccionService.BuscarInfoAntes= null
    this.verificacionProduccion.fecha_actualizacion= this.today
    this.verificacionProduccion.justificado= null
   // this.verificacionProduccion.numRegistros= null
    this.verificacionProduccion.observacion= null
    this.verificacionProduccion.porcentajeControl= null
    this.verificacionProduccion.porcentajeControlEstatico= null
    this.verificacionProduccion.valor_antes= null
    this.verificacionProduccion.valor_despues= null
    this.verificacionProduccion.valoracion= null
  
    this.verificarProduccionService.transCrearVerificarProduccion(this.verificacionProduccion).subscribe(data =>{
      if (data) {
     //   this.fechasList = data;   
        this.verificacionProduccion.fecha_actualizacion = this.today
        this.loading = false;
 
      } else {
        this.loading = false;
     
  
      }
      this.listarDatos(); 
      console.log(this.verificacionProduccion)
    });
}




  listarDatos(){
    this.verificarProduccionService.buscarporId(this.portafolio.codigoPortafolio).subscribe(
      (data: VerificacionProduccion[]) => { 
    
        if (data.length==0) {
          this.verificacionProduccion.formDisabled=0
          this.almacenamientoAutomatico()
          console.log(this.verificacionProduccion.formDisabled)
        }
 
        this.verificacionProduccionListar = [];
        this.verificacionProduccionListar = data;
        this.obtenerTodo();

      });
  }
  
  
debloquearActualizacion(){
  this.verificacionProduccion.formDisabled=0
  this.verificacionProduccion.fecha_actualizacion = new Date();

  this.verificarProduccionService.verificarProduccion=this.verificacionProduccion
  this.verificarProduccionService.obtenerporIdInyector(this.portafolio.codigoPortafolio).subscribe(
    (data: VerificacionProduccion[]) => {
      this.loading = false;

      if (data.length !== 0) {
        this.verificacionProduccion.PorcentajeMostrar= data[0].porcentajeControl.toFixed(2)
        this.verificacionProduccion.codVerificacion = data[0].codVerificacion
        this.verificacionProduccion.fecha_actualizacion =this.today
        this.verificacionProduccion.valoracion = data[0].valoracion
        this.verificacionProduccion.observacion= data[0].observacion

        if (this.verificacionProduccion.Porcentaje_inc_dis>=0){
   
          if (this.verificacionProduccion.Porcentaje_inc_dis> 9){
            this.verificacionProduccion.valoracion=0
            this.verificacionProduccion.descripcionValoracion="Exitoso";
         }
      
          if (this.verificacionProduccion.Porcentaje_inc_dis<10){
          this.verificacionProduccion.valoracion=1
          this.verificacionProduccion.descripcionValoracion="Medianamente Exitoso";
        }
       
      
          } else{
            this.verificacionProduccion.valoracion=2
            this.verificacionProduccion.descripcionValoracion="No Exitoso";
            this.verificacionProduccion.formDisabled=0
          
          } 
        }
      });
}

  obtenerTodo() {
    this.verificarProduccionService.obtenerporId(this.portafolio.codigoPortafolio).subscribe(
      (data: VerificacionProduccion[]) => {
        if (data) {
          this.produccionList = [];
          this.produccionList = data;
          this.verificacionProduccion.observacion = null;
       //   this.verificarProduccionService.verificarProduccion=data[1].codVerificacion;
        }
        this.loading = false;

        if (data.length!==0) {

          this.messageService.add({ severity: 'warn', detail: 'Ya existe un informe asignado en este pozo' });
          this.buttonDisabled=1;
          this.verificacionProduccion.formDisabled = 1;
          this.verificacionProduccion.codVerificacion= data[0].codVerificacion
          this.verificacionProduccion.fecha_actualizacion= data[0].fecha_actualizacion
          this.verificacionProduccion.justificado= data[0].justificado
          this.verificacionProduccion.numRegistros= data[0].numRegistros
          this.verificacionProduccion.valor_antes= data[0].valor_antes
          this.verificacionProduccion.valor_despues= data[0].valor_despues
          this.verificacionProduccion.valoracion= data[0].valoracion
          this.portafolio.fechaFin = new Date(this.portafolio.fechaFin);

       
          
        
          this.verificarProduccionService.BuscarInfoDespues( this.portafolio.fechaFin, this.verificacionProduccion.numRegistros, this.portafolio.pozo.pozCodigo, this.verificacionProduccion.codVerificacion).subscribe(
            (dataP: Produccion[]) => {   
        
            if (dataP) {
              console.log(dataP);
              this.datosDespues= dataP
              this.produccion.promedio_despues =0;
             
              // ENVIO DE DATOS POR CONSOLA
            // console.log(this.portafolio.fechaInicio);
           // console.log(this.datosAntes);
      
        //SUMA LOS DATOS
         for (let i:number=0 ; i < dataP.length; i++) {
            this.produccion.promedio_despues += dataP[i].bppd;// 0,1,2
            //ON=BTIENE EL ULTIMO VALOR
            this.produccion.ultimo_despues= dataP[i].bppd;
        }
      
        //CALCULA PROMEDIO
        try{
          this.produccion.promedio_despues= (this.produccion.promedio_despues/dataP.length)
          this.produccion.PromedioDespuesMostrar= this.produccion.promedio_despues.toFixed(2)
          }
          catch (e){
            this.produccion.promedio_antes= (0)
          }
                     
      
      }
              this.loading = false;
            });

            this.verificarProduccionService.BuscarInfoAntes(this.portafolio.fechaInicio, this.verificacionProduccion.numRegistros,  this.portafolio.pozo.pozCodigo, this.verificacionProduccion.codVerificacion ).subscribe(
              (dataAntes: Produccion[]) => {   
              if (dataAntes) {
                this.datosAntes= dataAntes
                this.produccion.promedio_antes =0;
            //SUMA LOS DATOS
             for (let i:number=0 ; i < dataAntes.length; i++) {
                this.produccion.promedio_antes += dataAntes[i].bppd;// 0,1,2
                //ON=BTIENE EL ULTIMO VALOR
                this.produccion.ultimo_antes= dataAntes[i].bppd;
            }
        
            //CALCULA PROMEDIO
            try{
            this.produccion.promedio_antes= (this.produccion.promedio_antes/dataAntes.length)
            this.produccion.PromedioAntesMostrar= this.produccion.promedio_antes.toFixed(2)
            console.log(dataAntes.length)
            console.log(this.produccion.promedio_antes);
            this.verificacionProduccion.valor_antes= this.produccion.promedio_antes
         
            }
            catch (e){
              this.produccion.promedio_antes= (0)
            }
            
        
            // console.log(  this.produccion.promedio_antes);
              }   
                this.loading = false;
              });

          }
         // this.verificacionProduccion.formDisabled = 1;          
        });
  }



  cargarDatosDespues(eProduccion){

    this.portafolio.fechaFin = new Date(this.portafolio.fechaFin);
    this.verificacionProduccion.formDisabled = 0;
    this.verificarProduccionService.verificarProduccion  = this.cloneJSON(eProduccion);
    this.verificarProduccionService.verificarProduccion = eProduccion;
   
    console.log(this.verificacionProduccion)
    this.verificarProduccionService.BuscarInfoDespues(this.portafolio.fechaFin, this.verificacionProduccion.numRegistros, this.portafolio.pozo.pozCodigo, this.verificarProduccionService.verificarProduccion.codVerificacion).subscribe(
      (data: Produccion[]) => {   
  
      if (data) {
        this.datosDespues= data
        this.produccion.promedio_despues =0;
       
        // ENVIO DE DATOS POR CONSOLA
      // console.log(this.portafolio.fechaInicio);
     // console.log(this.datosAntes);

  //SUMA LOS DATOS
   for (let i:number=0 ; i < data.length; i++) {
      this.produccion.promedio_despues += data[i].bppd;// 0,1,2
      //ON=BTIENE EL ULTIMO VALOR
      this.produccion.ultimo_despues= data[i].bppd;
  }

 

  //CALCULA PROMEDIO
  try{
    this.produccion.promedio_despues= (this.produccion.promedio_despues/data.length)
    this.produccion.PromedioDespuesMostrar= this.produccion.promedio_despues.toFixed(2)
    }
    catch (e){
      this.produccion.promedio_antes= (0)
    }
  


  //OBTENER PORCENTAJE DE INCREMENTO / DISMINUCION
  this.sumaPorcentaje=  ( this.produccion.promedio_despues- this.produccion.promedio_antes)
  console.log(this.sumaPorcentaje);
  this.verificacionProduccion.Porcentaje_inc_dis= ((this.sumaPorcentaje/this.produccion.promedio_antes)*100)
  this.verificacionProduccion.PorcentajeMostrar=this.verificacionProduccion.Porcentaje_inc_dis.toFixed(2);
  this.verificacionProduccion.porcentajeControl=this.verificacionProduccion.Porcentaje_inc_dis;
  this.verificacionProduccion.valor_despues= this.produccion.promedio_despues

  //OBTENER VALORACION
 
    if (this.verificacionProduccion.Porcentaje_inc_dis>=0){
     
      if (this.verificacionProduccion.Porcentaje_inc_dis> 9){
        this.verificacionProduccion.valoracion=0
        this.verificacionProduccion.descripcionValoracion="Exitoso";
     }

      if (this.verificacionProduccion.Porcentaje_inc_dis<10){
      this.verificacionProduccion.valoracion=1
      this.verificacionProduccion.descripcionValoracion="Medianamente Exitoso";
    }
   

      } else{
        this.verificacionProduccion.valoracion=2
        this.verificacionProduccion.descripcionValoracion="No Exitoso";
        this.verificacionProduccion.formDisabled=0
      }  
      
      

}
        this.loading = false;
      });

    
  }

  editarProduccion(eProduccion) {
   // this.verificarProduccionService.verificarProduccion  = this.cloneJSON(eProduccion);
  ///this.verificarProduccionService.verificarProduccion = eProduccion;
    console.log(this.verificarProduccionService.verificarProduccion );
  this.verificacionProduccion.formDisabled=1
  this.verificacionProduccion.estado=1;
  this.verificacionProduccion.idUsu= this.usuario.idUsuario;
  this.verificacionProduccion.codVerificacion= this.verificarProduccionService.verificarProduccion .codVerificacion
  this.verificacionProduccion.fecha_actualizacion = this.today
    console.log(this.verificacionProduccion);
    this.verificarProduccionService.transUpdateVerificacionProduccion(this.verificacionProduccion).subscribe(data =>{
      if (data) {
    
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se actualizó el Informe de Verificación de Novedad' });
        this.obtenerTodo();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se pudo actualizar el informe de Verificación de Novedad' });
  
      }

      console.log(this.verificacionProduccion.codVerificacion)
    });
  }

AnularInforme() {
  this.verificacionProduccion.codPortafolio= this.anularInforme.codPortafolio
  this.verificacionProduccion.estado=0;
  this.verificacionProduccion.idUsu= this.anularInforme.idUsu
  this.verificacionProduccion.justificado= this.anularInforme.justificado
  this.verificacionProduccion.numRegistros= this.anularInforme.numRegistros
  this.verificacionProduccion.observacion= this.anularInforme.observacion
  this.verificacionProduccion.porcentajeControl= this.anularInforme.porcentajeControl
  this.verificacionProduccion.valor_antes= this.anularInforme.valor_antes
  this.verificacionProduccion.valor_despues= this.anularInforme.valor_despues
  this.verificacionProduccion.valoracion= this.anularInforme.valoracion
  this.verificacionProduccion.fecha_actualizacion= this.today
  this.verificacionProduccion.codVerificacion= this.anularInforme.codVerificacion
  console.log(this.verificacionProduccion)

  this.verificarProduccionService.transUpdateVerificacionInyector(this.verificacionProduccion)
  .subscribe(data => {
   if (data ) {
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Verificación Anulada' });
      //this.verificacionProduccion=null;
     this.closeModalInformeAnular();
     this.obtenerTodo();
      //this.listarDatos();
    } else {
      this.loading = false;
      this.messageService.add({ severity: 'Error', detail: 'No se ha podido anular'});
   //   this.closeModalNovedadAnular();
    }
  });
}

openModalInformeAnular(template: TemplateRef<any>,eInforme:VerificacionProduccion) {
  this.anularInforme = this.cloneJSON(eInforme);
  this.registroInfomreModalRef = this.modalService.show(template, { class: 'modal-sm', backdrop: 'static', keyboard: false });
}

closeModalInformeAnular() {
  this.registroInfomreModalRef.hide();
}


  volver(portafolio: Portafolio) {
    console.log("click");
    this.verificarFechasService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificacionFechas'] } }]);
  }

  
  siguiente(portafolio: Portafolio) {
    console.log("click");
    this.VerificarNovedadService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarNovedad'] } }]);
  }

}
