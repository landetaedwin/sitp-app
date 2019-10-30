import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Constantes } from "src/app/resources/constantes";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class BusquedaService {
  constructor(readonly http: HttpClient, public prop: Constantes) { }

  public portafolio: Portafolio;
  public link: string;

  //Metodos nuevos
  getCampoList() {
    const url = this.prop.PATH + this.prop.SYS + "/campo-service/campo-list";
    return this.http.get(url, httpOptions);
  }

  getPozoListByCamCodigo(camCodigo: string) {
    const url = this.prop.PATH + this.prop.SYS + "/pozo-service/pozo-list-by-campo-codigo?camCodigo=" + camCodigo;
    return this.http.get(url, httpOptions);
  }

  getBloqueByBloqueCodigo(blqCodigo: string) {
    const url = this.prop.PATH + this.prop.SYS + "/bloque-service/bloque-by-bloque-codigo?blqCodigo=" + blqCodigo;
    return this.http.get(url, httpOptions);
  }

  getOperadoraByCompaniaPetrolera(pozCompaniaPetrolera: string) {
    const url = this.prop.PATH + this.prop.SYS + "/cliente-externo-service/cliente-externo-by-compania-petrolera?pozCompaniaPetrolera=" + pozCompaniaPetrolera;
    return this.http.get(url, httpOptions);
  }

  getTipoPozoList() {
    const url = this.prop.PATH + this.prop.SYS + "/tipo-pozo-service/tipo-pozo-list";
    return this.http.get(url, httpOptions);
  }

  getConsorcioList() {
    const url = this.prop.PATH + this.prop.SYS + "/consorcio-service/consorcio-list";
    return this.http.get(url, httpOptions);
  }

  getTipoTrabajoList() {
    const url = this.prop.PATH + this.prop.SYS + "/tipo-trabajo-service/tipo-trabajo-list";
    return this.http.get(url, httpOptions);
  }

  getPortafolioList(param: BusquedaParametros) {
    const url = this.prop.PATH + this.prop.SYS + "/portafolio-service/portafolio-list";
    return this.http.post(url, param, httpOptions);
  }

  getBloqueList() {
    const url = this.prop.PATH + "/sitp/bloque-service/bloque-list";
    return this.http.get(url, httpOptions);
  }

  getRegionalList() {
    const url = this.prop.PATH + "/sitp/regional-service/regional-list";
    return this.http.get(url, httpOptions);
  }

  getCampoListByBlqCodigo(blqCodigo: string) {
    const url = this.prop.PATH + "/sitp/campo-service/campo-list-by-bloque-codigo?blqCodigo=" + blqCodigo;
    return this.http.get(url, httpOptions);
  }

  getPersonaPorCampoList(param: BusquedaParametros) {
    const url = this.prop.PATH + "/sitp/persona-campo-service/persona-campo-list";
    return this.http.post(url, param, httpOptions);
  }

  getPersonaPorCampoAsignadosList() {
    const url = this.prop.PATH + "/sitp/persona-campo-service/persona-campo-asignado-list";
    return this.http.get(url, httpOptions);
  }

  getAccionList() {
    const url = this.prop.PATH + "/sitp/accion-service/accion-list";
    return this.http.get(url, httpOptions);
  }
  getAccionById(codigoAccion: number) {
    const url = this.prop.PATH + "/sitp/accion-service/accion-by-id?codigoAccion=" + codigoAccion;
    return this.http.get(url, httpOptions);
  }

  getRegistroDiarioList(codigoPortafolio: number) {
    const url = this.prop.PATH + "/sitp/registro-diario-service/registro-diario-list?codigoPortafolio=" + codigoPortafolio;
    return this.http.get(url, httpOptions);
  }

  getCategoriaListByCodigoTipoTrabajo(codigoTipoTrabajo: number) {
    const url = this.prop.PATH + "/sitp/categoria-service/categoria-list-by-codigo-tipo-trabajo?codigoTipoTrabajo=" + codigoTipoTrabajo;
    return this.http.get(url, httpOptions);
  }

  getDocumentoOperadoraByCodigoPortafolioList(codigoPortafolio: number) {
    const url = this.prop.PATH + "/sitp/documento-operadora-service/documento-operadora-list-by-codigo-portafolio?codigoPortafolio=" + codigoPortafolio;
    return this.http.get(url, httpOptions);
  }

  getPagoListByCodigoDocumentoOperadora(codigoDocumentoOperadora: number) {
    const url = this.prop.PATH + "/sitp/pago-service/pago-list-by-codigo-documento-operadora?codigoDocumentoOperadora=" + codigoDocumentoOperadora;
    return this.http.get(url, httpOptions);
  }

  getAsuntoList() {
    const url = this.prop.PATH + "/sitp/asunto-service/asunto-list";
    return this.http.get(url, httpOptions);
  }

  getDocumentoMinisterioByCodigoPortafolioList(codigoPortafolio: number) {
    const url = this.prop.PATH + "/sitp/documento-ministerio-service/documento-ministerio-list-by-codigo-portafolio?codigoPortafolio=" + codigoPortafolio;
    return this.http.get(url, httpOptions);
  }

  getHistorialPozoList() {
    const url = this.prop.PATH + "/sitp/historial-pozo-service/historial-pozo-list";
    return this.http.get(url, httpOptions);
  }

  getTasaList(param: BusquedaParametros) {
    const url = this.prop.PATH + "/sitp/tasa-service/tasa-list";
    return this.http.post(url, param, httpOptions);
  }

  getPagoList(param: BusquedaParametros) {
    const url = this.prop.PATH + "/sitp/pago-service/pago-list";
    return this.http.post(url, param, httpOptions);
  }

}
