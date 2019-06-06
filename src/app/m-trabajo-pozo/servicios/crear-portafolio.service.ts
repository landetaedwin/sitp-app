import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class CrearPortafolioService {
  constructor(readonly http: HttpClient, public prop: Constantes) {}

  findCamposList() {
    const url = this.prop.PATH + "/sitp/crearPortafolio/findCampoList";
    return this.http.get(url, httpOptions);
  }

findTipoPozoList() {
    const url = this.prop.PATH + "/sitp/crearPortafolio/findTipoPozoList";
    return this.http.get(url, httpOptions);
  }

  findPozoByCamCodigo(camCodigo:string) {
    const url = this.prop.PATH + "/sitp/crearPortafolio/findPozoByCamCodigo?camCodigo="+camCodigo;
    return this.http.get(url, httpOptions);
  }

findBloque(blqCodigo:string){
  const url = this.prop.PATH + "/sitp/crearPortafolio/findBloque?blqCodigo="+blqCodigo;
    return this.http.get(url, httpOptions);
}

}
