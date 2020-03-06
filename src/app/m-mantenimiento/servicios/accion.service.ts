import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constantes } from 'src/app/resources/constantes';
import { Accion } from 'src/app/entidades/accion';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class AccionService {

  constructor(readonly http: HttpClient, public prop: Constantes) { }

   //Accion
   findAccionList() {
    const url = this.prop.PATH + "/sitp/accion-service/accion-list";
    return this.http.get(url, httpOptions);
  }

  findAccionId() {
    const url = this.prop.PATH + "/sitp/accion-service/accion-by-id";
    return this.http.get(url, httpOptions);
  }

  onSaveAccion(rs: Accion) {
    const url = this.prop.PATH + "/sitp/accion-servicio/accion-create";
    return this.http.post(url, rs, httpOptions);
  }

  onUpdateAccion(rs: Accion) {
    const url = this.prop.PATH + "/sitp/accion-servicio/accion-update";
    return this.http.post(url, rs, httpOptions);
  }

}
