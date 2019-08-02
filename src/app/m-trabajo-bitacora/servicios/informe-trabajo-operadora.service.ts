
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";
import { InformeOperadora } from 'src/app/entidades/informe-operadora';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

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

    subirArchivo(archivo: File, id): Observable<InformeOperadora>{
      console.log("PARTE 0");
      let formData = new FormData();
      formData.append("archivo", archivo);
      formData.append("id", id);
      return this.http.post('/sitp/InformeOperadora/subidaArchivo/', formData).pipe(
        map((response:any)=> response.informeOperadora as InformeOperadora)
      );
      }
      
      transUpdateInformeOperadora(informeOperadora: InformeOperadora) {
        const url = this.prop.PATH + "/sitp/InformeOperadora/transActualizarInforeOperadora";
        return this.http.post(url, informeOperadora, httpOptions);
      }
  

   


}
