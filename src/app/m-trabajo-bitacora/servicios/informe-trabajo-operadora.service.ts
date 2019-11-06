
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";
import { InformeOperadora } from 'src/app/entidades/informe-operadora';
import { Portafolio } from 'src/app/entidades/portafolio';
import { VerificacionFechas } from 'src/app/entidades/verificacionFechas';
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

    transCrearInformeOperadora(informeOperadora: InformeOperadora) {
      const url = this.prop.PATH + "/sitp/InformeOperadora/crearInformeOperadora";
      return this.http.post(url, informeOperadora, httpOptions);
  }

  ObtenerDatos(codigoPortafolio: number) {
    const url = this.prop.PATH + "/sitp/InformeOperadora/listarDatos?codigoPortafolio=" + codigoPortafolio;
    return this.http.get(url, httpOptions);
  }





}
