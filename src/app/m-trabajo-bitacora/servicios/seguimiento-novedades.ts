
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";
import { SeguimientoNovedad } from 'src/app/entidades/seguimiento-novedad';
import { VerificacionNovedad } from 'src/app/entidades/verificacion-novedad';
import { Portafolio } from 'src/app/entidades/portafolio';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
    providedIn: "root"
})


export class SeguimientoNovedadesService {

      portafolio: Portafolio;
      verificacioNovedad: VerificacionNovedad;


    constructor(readonly http: HttpClient, public prop: Constantes) { }

    transCrearSeguimientoNovedades(seguimientoNovedad: SeguimientoNovedad) {
      const url = this.prop.PATH + "/sitp/SeguimientoNovedades/crearSeguimiento";
      return this.http.post(url, seguimientoNovedad, httpOptions);
  }

  transUpdateSeguimientoNovedades(seguimientoNovedad: SeguimientoNovedad) {
    const url = this.prop.PATH + "/sitp/SeguimientoNovedades/actualizarDatos";
    return this.http.post(url, seguimientoNovedad, httpOptions);
}

  ObtenerDatos(codigoNovedad: number) {
    const url = this.prop.PATH + "/sitp/SeguimientoNovedades/listarDatos?codNovedad=" + codigoNovedad;
    return this.http.get(url, httpOptions);
  }





}
