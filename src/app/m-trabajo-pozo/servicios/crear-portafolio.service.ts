import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";
import { Portafolio } from 'src/app/entidades/portafolio';
import { PersonaPorCampo } from 'src/app/entidades/persona-por-campo';
import { RegistroDiario } from 'src/app/entidades/registro-diario';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class CrearPortafolioService {
  constructor(readonly http: HttpClient, public prop: Constantes) { }

  transCrearPersonaPorCampo(personaPorCampo: PersonaPorCampo) {
    const url = this.prop.PATH + "/sitp/crearPortafolio/transCrearPersonaPorCampo";
    return this.http.post(url, personaPorCampo, httpOptions);
  }

  transUpdatePersonaPorCampo(personaPorCampo: PersonaPorCampo) {
    const url = this.prop.PATH + "/sitp/crearPortafolio/transUpdatePersonaPorCampo";
    return this.http.post(url, personaPorCampo, httpOptions);
  }


}

