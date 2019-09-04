import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";
import { VerificacionNovedad } from 'src/app/entidades/verificacion-novedad';
import { Portafolio } from 'src/app/entidades/portafolio';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
    providedIn: "root"
})
export class VerificarNovedadService {
    
    portafolio: Portafolio;
    verificacionNovedad: VerificacionNovedad;

    constructor(readonly http: HttpClient, public prop: Constantes) { }

    transCrearVerificacionNovedad(verificacionNovedad:VerificacionNovedad){
        const url =  this.prop.PATH + "/sitp/VerificarNovedad/transCrearVerificacionNovedad";
        return this.http.post(url, verificacionNovedad, httpOptions);
      }
  
  
      buscarporId(codPortafolio:number){
        const url =  this.prop.PATH + "/sitp/VerificarNovedad/findNovedadById?codigoPortafolio="+ codPortafolio;
    //   const url =  this.prop.PATH + "/sitp/InformeOperadora/findOperadoraById";
        return this.http.get(url, httpOptions);
      }
  
     
        transUpdateVerificacionFechas(verificacionNovedad:VerificacionNovedad) {
          const url = this.prop.PATH + "/sitp/VerificarNovedad/transActualizarNovedad";
          return this.http.post(url, verificacionNovedad, httpOptions);
        }


}

