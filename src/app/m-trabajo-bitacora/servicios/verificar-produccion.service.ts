
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


    transCrearVerificarProduccion(verificacionProduccion:VerificacionProduccion){
      const url =  this.prop.PATH + "/sitp/VerificarProduccion/CrearVerificacionProduccion";
      return this.http.post(url, verificacionProduccion, httpOptions);
    }


    buscarporId(codPortafolio:number){
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
}
