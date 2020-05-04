import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constantes } from 'src/app/resources/constantes';
import { Categoria } from 'src/app/entidades/categoria';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  
  constructor(readonly http: HttpClient, public prop: Constantes) { }

  findCategoriaList() {
    const url = this.prop.PATH + "/sitp/categoria-service/categoria-list";
    return this.http.get(url, httpOptions);
  }

  //Falta revisar como pasar el parámetro.  
  findCategoriaById(){
    const url = this.prop.PATH + "/sitp/categoria-service/categoria-id";
    return this.http.get(url, httpOptions);
  }

  onSaveCategoria(rs: Categoria) {
    const url = this.prop.PATH + "/sitp/categoria-service/create";
    return this.http.post(url, rs, httpOptions);
  }

  onUpdateCategoria(rs: Categoria) {
    const url = this.prop.PATH + "/sitp/categoria-service/update";
    return this.http.post(url, rs, httpOptions);
  }

  getTipoTrabajoList() {
    //debugger;
    const url = this.prop.PATH + "/sitp/tipo-trabajo-service/tipo-trabajo-list";
    return this.http.get(url, httpOptions);
  }

  getCategoriaListByCodigoTipoTrabajo(codigoTipoTrabajo: number) {
    const url = this.prop.PATH + "/sitp/categoria-service/categoria-list-by-codigo-tipo-trabajo?codigoTipoTrabajo=" + codigoTipoTrabajo;
    return this.http.get(url, httpOptions);
  }

}
