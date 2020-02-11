import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";
import { ConclusionRecomendacion } from 'src/app/entidades/conclusionRecomendacion';
import { Portafolio } from 'src/app/entidades/portafolio';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
    providedIn: "root"
})
export class ConclusionesRecomendaciones {
    
    portafolio: Portafolio;
    conclusionRecomendacion: ConclusionRecomendacion;

    constructor(readonly http: HttpClient, public prop: Constantes) { }

    transCrearConclusionRecomendacion(conclusionRecomendacion: ConclusionRecomendacion){
        const url =  this.prop.PATH + "/sitp/Conclusiones/transCrearConclusion";
        return this.http.post(url, conclusionRecomendacion, httpOptions);
      }
  
  
      buscarporId(codPortafolio:number){
        const url =  this.prop.PATH + "/sitp/Conclusiones/findConclById?codigoPortafolio="+ codPortafolio;
        return this.http.get(url, httpOptions);
      }
  
     
        transUpdateVerificacionNovedad(conclusionRecomendacion: ConclusionRecomendacion) {
          const url = this.prop.PATH + "/sitp/Conclusiones/transActualizar";
          return this.http.post(url, conclusionRecomendacion, httpOptions);
        }


}

