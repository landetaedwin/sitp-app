
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";
import { InformeOperadora } from 'src/app/entidades/informe-operadora';
import { Portafolio } from 'src/app/entidades/portafolio';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
    providedIn: "root"
})


export class InformeTrabajoOperadoraService {

      portafolio: Portafolio;
      informeOperadora: InformeOperadora;

    constructor(readonly http: HttpClient, public prop: Constantes) { }


    transCrearTrabajoOperdora(informeOperadora:InformeOperadora){
      const url =  this.prop.PATH + "/sitp/InformeOperadora/transCrearInformeOperadora";
      return this.http.post(url, informeOperadora, httpOptions);
    }


    buscarporId(codPortafolio:number){
      const url =  this.prop.PATH + "/sitp/InformeOperadora/findOperadoraById?codigoPortafolio="+ codPortafolio;
  //   const url =  this.prop.PATH + "/sitp/InformeOperadora/findOperadoraById";
      return this.http.get(url, httpOptions);
    }


    findDocument(cod_informe_operadora: number) {
    //  const url = this.prop.PATH + "/sitp/InformeOperadora/findOperadoraById?codInformeOperadora=" + 3;
     const url = this.prop.PATH + "/sitp/InformeOperadora/findInformeOperadora";
      return this.http.get(url, httpOptions);
    }

    obtenerDatos(portafolio: Portafolio) {
    //  const url = this.prop.PATH + "/sitp/InformeOperadora/findOperadoraById?codInformeOperadora=" + 3;
     const url = this.prop.PATH + "/sitp/InformeOperadora/findInformeOperadora";
      return this.http.get(url, httpOptions);
    }




}
