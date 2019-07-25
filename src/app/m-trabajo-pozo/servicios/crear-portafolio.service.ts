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

  findCamposList() {
    const url = this.prop.PATH + "/sitp/crearPortafolio/findCampoList";
    return this.http.get(url, httpOptions);
  }

  findTipoPozoList() {
    const url = this.prop.PATH + "/sitp/crearPortafolio/findTipoPozoList";
    return this.http.get(url, httpOptions);
  }

  findPozoByCamCodigo(camCodigo: string) {
    const url = this.prop.PATH + "/sitp/crearPortafolio/findPozoByCamCodigo?camCodigo=" + camCodigo;
    return this.http.get(url, httpOptions);
  }

  findBloque(blqCodigo: string) {
    const url = this.prop.PATH + "/sitp/crearPortafolio/findBloque?blqCodigo=" + blqCodigo;
    return this.http.get(url, httpOptions);
  }

  findOperadoraByCompaniaPetrolera(pozCompaniaPetrolera: string) {
    const url = this.prop.PATH + "/sitp/crearPortafolio/findOperadoraByCompaniaPetrolera?pozCompaniaPetrolera=" + pozCompaniaPetrolera;
    return this.http.get(url, httpOptions);
  }

  findConsorcioList() {
    const url = this.prop.PATH + "/sitp/crearPortafolio/findConsorcioList";
    return this.http.get(url, httpOptions);
  }

  findTrabajoList() {
    const url = this.prop.PATH + "/sitp/crearPortafolio/findTrabajoList";
    return this.http.get(url, httpOptions);
  }

  transCrearPortafolio(portafolio: Portafolio) {
    const url = this.prop.PATH + "/sitp/crearPortafolio/transCrearPortafolio";
    return this.http.post(url, portafolio, httpOptions);
  }

  transCrearPersonaPorCampo(personaPorCampo: PersonaPorCampo) {

    const url = this.prop.PATH + "/sitp/crearPortafolio/transCrearPersonaPorCampo";
    return this.http.post(url, personaPorCampo, httpOptions);
  }

  transUpdatePersonaPorCampo(personaPorCampo: PersonaPorCampo) {

    const url = this.prop.PATH + "/sitp/crearPortafolio/transUpdatePersonaPorCampo";
    return this.http.post(url, personaPorCampo, httpOptions);
  }

  transUpdatePortafolio(portafolio: Portafolio) {
    const url = this.prop.PATH + "/sitp/crearPortafolio/transActualizarPortafolio";
    return this.http.post(url, portafolio, httpOptions);
  }

  transCrearRegistroDiario(rs: RegistroDiario) {
    const url = this.prop.PATH + "/sitp/crearPortafolio/transCrearRegistroDiario";
    return this.http.post(url, rs, httpOptions);
  }

  findAccionList() {
    const url = this.prop.PATH + "/sitp/buscarPortafolio/findAccionList";
    return this.http.get(url, httpOptions);
  }
}
