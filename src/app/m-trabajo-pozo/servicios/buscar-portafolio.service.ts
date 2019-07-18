import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class BuscarPortafolioService {
  constructor(readonly http: HttpClient, public prop: Constantes) { }

  findPozoByPozCodigo(pozCodigo: string) {
    const url = this.prop.PATH + "/sitp/buscarPortafolio/findPozoByPozCodigo?pozCodigo=" + pozCodigo;
    return this.http.get(url, httpOptions);
  }

  findOperadorabYCexCodigo(cexCodigo: number) {
    const url = this.prop.PATH + "/sitp/buscarPortafolio/findOperadorabYCexCodigo?cexCodigo=" + cexCodigo;
    return this.http.get(url, httpOptions);
  }

  findBloqueList() {
    const url = this.prop.PATH + "/sitp/buscarPortafolio/findBloqueList";
    return this.http.get(url, httpOptions);
  }

  findPortafolioList(param: BusquedaParametros) {
    const url = this.prop.PATH + "/sitp/buscarPortafolio/findPortafolioList";
    return this.http.post(url, param, httpOptions);
  }

  findCampoListByBlqCodigo(blqCodigo: string) {
    const url = this.prop.PATH + "/sitp/buscarPortafolio/findCampoListByBlqCodigo?blqCodigo=" + blqCodigo;
    return this.http.get(url, httpOptions);
  }

  findPersonaPorCampo(param: BusquedaParametros) {
    const url = this.prop.PATH + "/sitp/buscarPortafolio/findPersonaPorCampoList";
    return this.http.post(url, param, httpOptions);
  }

  findCamposListNoAsignados() {
    const url = this.prop.PATH + "/sitp/buscarPortafolio/findCamposListNoAsignados";
    return this.http.get(url, httpOptions);
  }

}
