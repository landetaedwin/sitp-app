import { Component, OnInit } from '@angular/core';
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
import { InformeTrabajoOperadoraService } from '../../servicios/informe-trabajo-operadora.service';
import { Produccion } from 'src/app/entidades/produccion';
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
  datosAntes: Produccion[]=[];
  datosDespues:Produccion[]=[];
  registrosList:SelectItem[]=[];
  estadolist: SelectItem[]=[];
  justificadoList: SelectItem[]=[];
  public loading = false;
  usuario: Usuario;
  pAntes: number=0;
  pDespues: number;
  sumaPorcentaje:number;
  buttonDisabled: boolean = true;

  constructor( http:HttpClient,public VerificarNovedadService: VerificarNovedadService, public verificarFechasService: VerificarFechasService, public verificarProduccionService: VerificarProduccionService, private messageService: MessageService, public loginService: LoginService, public router: Router) { 
    
    this.portafolio = this.verificarProduccionService.portafolio;

    this.justificadoList= [
      { label: "Seleccione...", value: null, disabled: false },
      { label: "Si", value: 1, disabled: false },
      { label: "No", value: 2, disabled: false }
  
  ];

    this.estadolist= [
                      { label: "Seleccione...", value: null, disabled: false },
                      { label: "Registrado", value: 1, disabled: false },
                      { label: "Anulado", value: 2, disabled: false },
                      { label: "Cerrado", value: 3, disabled: false }
                     ];

    this.registrosList= [
                      { label: "Seleccione...", value: 0, disabled: false },
                      { label: "3", value: 3, disabled: false },
                      { label: "4", value: 4, disabled: false },
                      { label: "5", value: 5, disabled: false },
                      { label: "6", value: 6, disabled: false },
                      { label: "7", value: 7, disabled: false }
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
    this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
  }
  if (this.portafolio.tipoPozo.codigoTipoPozo==3) {
    this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
  }
  if (this.portafolio.tipoPozo.codigoTipoPozo==4) {
    this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
  }
  this.produccionList = [];

  this.obtenerTodo();


  }

  cargarDatos(){
    
    this.portafolio.fechaInicio = new Date(this.portafolio.fechaInicio);
    this.verificarProduccionService.Buscar3Antes(this.portafolio.fechaInicio, this.verificacionProduccion.numRegistros, this.portafolio.pozo.pozNombre).subscribe(
     
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
        this.produccion.ultimo_antes= data[i].bppd;
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
     
  }




  guardar(){
    this.verificacionProduccion.idUsu= this.usuario.idUsuario;
    this.verificarProduccionService.transCrearVerificarProduccion(this.verificacionProduccion).subscribe(data =>{
      if (data) {
     //   this.fechasList = data; 
    
     this.verificacionProduccion.fecha_actualizacion = this.today
   
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se creo el Informe de Verificación de Novedad' });
        this.obtenerTodo();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se pudo crear el informe de Verificación de Novedad' });
  
      }

      console.log(this.verificacionProduccion)
    });
}

  
  obtenerTodo() {
    this.verificarProduccionService.buscarporId(this.portafolio.codigoPortafolio).subscribe(
      (data: VerificacionProduccion[]) => {
        if (data) {
          this.produccionList = [];
          this.produccionList = data;
          this.verificacionProduccion.observacion = null;
        }
        this.loading = false;

      });
  }

  cargarDatosDespues(){

    this.portafolio.fechaFin = new Date(this.portafolio.fechaFin);

    this.verificarProduccionService.BuscarDespues(this.portafolio.fechaFin, this.verificacionProduccion.numRegistros, this.portafolio.pozo.pozNombre).subscribe(
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
      }  
      this.buttonDisabled = false;
      

}
        this.loading = false;
      });

    
  }

  editarProduccion(verificacionProduccion: VerificacionProduccion, produccion: Produccion) {
    console.log("click");
    this.verificarProduccionService.verificarProduccion = verificacionProduccion;
    this.verificarProduccionService.produccion = produccion;
    this.router.navigate(['/menu', { outlets: { sitp: ['editarVerificarProduccion'] } }]);
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
