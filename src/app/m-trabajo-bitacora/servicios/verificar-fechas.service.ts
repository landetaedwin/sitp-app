
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";
import { InformeOperadora } from 'src/app/entidades/informe-operadora';
import { DocumentoOperadora } from 'src/app/entidades/documentoOperadora';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { VerificacionFechas } from 'src/app/entidades/verificacionFechas';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
    providedIn: "root"
})


export class VerificarFechasService {

      portafolio: Portafolio;
      verificarFechas: VerificacionFechas;
     
      
    constructor(readonly http: HttpClient, public prop: Constantes) { }


    transCrearVerificacionFechas(verificacionFechas:VerificacionFechas){
      const url =  this.prop.PATH + "/sitp/VerificarFechas/transCrearVerificacionFecha";
      return this.http.post(url, verificacionFechas, httpOptions);
    }


    buscarporId(codPortafolio:number){
      const url =  this.prop.PATH + "/sitp/VerificarFechas/findFechaById?codigoPortafolio="+ codPortafolio;
  //   const url =  this.prop.PATH + "/sitp/InformeOperadora/findOperadoraById";
      return this.http.get(url, httpOptions);
    }

   
      transUpdateVerificacionFechas(verificacionFechas:VerificacionFechas) {
        const url = this.prop.PATH + "/sitp/VerificarFechas/transActualizarFechas";
        return this.http.post(url, verificacionFechas, httpOptions);
      }
  

   


}
