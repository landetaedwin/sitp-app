
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";
import { Portafolio } from 'src/app/entidades/portafolio';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { VerificacionProduccion } from 'src/app/entidades/verificacionProduccion';
import { Produccion } from 'src/app/entidades/produccion';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
    providedIn: "root"
})


export class VerificarProduccionService {

      portafolio: Portafolio;
      verificarProduccion: VerificacionProduccion;
      produccion: Produccion;

    constructor(readonly http: HttpClient, public prop: Constantes) { }




    // componentes verificacion inyector
    transCrearVerificarInyector(verificacionProduccion:VerificacionProduccion){
      const url =  this.prop.PATH + "/sitp/VerificarProduccion/CrearVerificacionInyector";
      return this.http.post(url, verificacionProduccion, httpOptions);
    }


    buscarporIdInyector(codPortafolio:number){
      const url =  this.prop.PATH + "/sitp/VerificarInyector/listarDatos?codigoPortafolio="+ codPortafolio;
  //   const url =  this.prop.PATH + "/sitp/InformeOperadora/findOperadoraById";
      return this.http.get(url, httpOptions);
    }

    obtenerporIdInyector(codPortafolio:number){
      const url =  this.prop.PATH + "/sitp/VerificarInyector/obtenerDatos?codigoPortafolio="+ codPortafolio;
      //   const url =  this.prop.PATH + "/sitp/InformeOperadora/findOperadoraById";
          return this.http.get(url, httpOptions)
    }

   
      transUpdateVerificacionInyector(verificacionProduccion:VerificacionProduccion) {
        const url = this.prop.PATH + "/sitp/VerificarInyector/ActualizarInyector";
        return this.http.post(url, verificacionProduccion, httpOptions);
      }

    BuscarInfoInyectorAntes(fechaInicio :Date, registros:number, pozo:String, codVerfProduccion:number){
      const url =  this.prop.PATH + "/sitp/VerificarInyector/listarDatosAntes?fechaAntes="+ fechaInicio +"&Registros="+ registros+"&Pozo="+ pozo+"&verfProd="+codVerfProduccion ;
      console.log(url)
      return this.http.get(url, httpOptions);
    }

    BuscarInfoInyectorDespues(fechaDespues :Date, registros:number, pozo:String, codVerfProduccion:number){
      const url =  this.prop.PATH + "/sitp/VerificarInyector/listarDatosDespues?fechaDespues="+ fechaDespues +"&Registros="+ registros+"&Pozo="+ pozo+"&verfProd="+codVerfProduccion ;
      console.log(url)
      return this.http.get(url, httpOptions);
    }





    // componentes verificacion reinyector


    transCrearVerificarReinyector(verificacionProduccion:VerificacionProduccion){
      const url =  this.prop.PATH + "/sitp/VerificarProduccion/CrearVerificacionReinyector";
      return this.http.post(url, verificacionProduccion, httpOptions);
    }


    buscarporIdReinyector(codPortafolio:number){
      const url =  this.prop.PATH + "/sitp/VerificarProduccion/obtenerDatosReinyector?codigoPortafolio="+ codPortafolio;
  //   const url =  this.prop.PATH + "/sitp/InformeOperadora/findOperadoraById";
      return this.http.get(url, httpOptions);
    }

   
      transUpdateVerificacionReinyector(verificacionProduccion:VerificacionProduccion) {
        console.log(verificacionProduccion);
        const url = this.prop.PATH + "/sitp/VerificarProduccion/ActualizarReinyector";
        return this.http.post(url, verificacionProduccion, httpOptions);
      }


    // ccomponentes verificacion produccion
    transCrearVerificarProduccion(verificacionProduccion:VerificacionProduccion){
      const url =  this.prop.PATH + "/sitp/VerificarProduccion/CrearVerificacionProduccion";
      return this.http.post(url, verificacionProduccion, httpOptions);
    }


    // obtiene datos cuando el estado es 1
    buscarporId(codPortafolio:number){
      const url =  this.prop.PATH + "/sitp/VerificarProduccion/listarDatos?codigoPortafolio="+ codPortafolio;
  //   const url =  this.prop.PATH + "/sitp/InformeOperadora/findOperadoraById";
      return this.http.get(url, httpOptions);
    }

    // obtiene datos cuando en cualquier estado
    obtenerporId(codPortafolio:number){
      const url =  this.prop.PATH + "/sitp/VerificarProduccion/obtenerDatos?codigoPortafolio="+ codPortafolio;
  //   const url =  this.prop.PATH + "/sitp/InformeOperadora/findOperadoraById";
      return this.http.get(url, httpOptions);
    }

      transUpdateVerificacionProduccion(verificacionProduccion:VerificacionProduccion) {
        const url = this.prop.PATH + "/sitp/VerificarProduccion/ActualizarProduccion";
        return this.http.post(url, verificacionProduccion, httpOptions);
      }


    Buscar3Antes(fechaInicio :Date, registros:number, pozo:String){
      const url =  this.prop.PATH + "/sitp/VerificarProduccion/buscarAntes?ProduccionAntes="+ fechaInicio +"&Registros="+ registros+"&Pozo="+ pozo ;
      return this.http.get(url, httpOptions);
    }

    BuscarDespues(fechaFin :Date, registros:number, pozo:String){
      const url =  this.prop.PATH + "/sitp/VerificarProduccion/buscarDespues?ProduccionDespues="+ fechaFin +"&Registros="+ registros+"&Pozo="+ pozo ;
      return this.http.get(url, httpOptions);
    }

    BuscarInfoAntes(fechaInicio :Date, registros:number, pozo:String, codVerfProduccion:number){
      const url =  this.prop.PATH + "/sitp/VerificarProduccion/listarDatosAntes?fechaAntes="+ fechaInicio +"&Registros="+ registros+"&Pozo="+ pozo+"&verfProd="+codVerfProduccion ;
      console.log(url)
      return this.http.get(url, httpOptions);
    }

    BuscarInfoDespues(fechaDespues :Date, registros:number, pozo:String, codVerfProduccion:number){
      const url =  this.prop.PATH + "/sitp/VerificarProduccion/listarDatosDespues?fechaDespues="+ fechaDespues +"&Registros="+ registros+"&Pozo="+ pozo+"&verfProd="+codVerfProduccion ;
      console.log(url)
      return this.http.get(url, httpOptions);
    }


    

}
