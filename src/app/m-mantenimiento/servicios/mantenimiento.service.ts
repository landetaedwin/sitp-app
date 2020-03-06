import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constantes } from 'src/app/resources/constantes';
import { Asunto } from 'src/app/entidades/asunto';
import { Consorcio } from 'src/app/entidades/consorcio';
import { TipoPozo } from 'src/app/entidades/tipo-pozo';
import { TipoTrabajo } from 'src/app/entidades/tipo-trabajo';



const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  constructor(readonly http: HttpClient, public prop: Constantes) { }

  /*Se consume los servicos web de:
  asunto
  consorcio
  TipoPozo
  TipoTrabajo*/


  //Asunto
  findAsuntoList() {
    const url = this.prop.PATH + "/sitp/asunto-service/asunto-list";
    return this.http.get(url, httpOptions);
  }

  findAsuntoById(){
    const url = this.prop.PATH + "/sitp/asunto-service/asunto-id";
    return this.http.get(url, httpOptions);
  }

  onSaveAsunto(rs: Asunto) {
    const url = this.prop.PATH + "/sitp/asunto-service/create";
    return this.http.post(url, rs, httpOptions);
  }

  onUpdateAsunto(rs: Asunto) {
    const url = this.prop.PATH + "/sitp/asunto-service/update";
    return this.http.post(url, rs, httpOptions);
  }  
  
  //Consorcio
  findConsorcioList() {
    const url = this.prop.PATH + "/sitp/consorcio-service/consorcio-list";
    return this.http.get(url, httpOptions);
  }

  onSaveConsorcio(consorcio: Consorcio) {
    const url = this.prop.PATH + "/sitp/consorcio-service/create";
    return this.http.post(url, consorcio, httpOptions);
  }

  onEditConsorcio(consorcio: Consorcio) {
    const url = this.prop.PATH + "/sitp/consorcio-service/update";
    return this.http.post(url, consorcio, httpOptions);
  }

  //Tipo pozo
  findTipoPozoList() {
    const url = this.prop.PATH + "/sitp/tipo-pozo-service/tipo-pozo-list";
    return this.http.get(url, httpOptions);
  }

  onSaveTipoPozo(rs: TipoPozo) {
    const url = this.prop.PATH + "/sitp/tipo-pozo-servicio/tipo-pozo-create";
    return this.http.post(url, rs, httpOptions);
  }

  onUpdateTipoPozo(rs: TipoPozo) {
    const url = this.prop.PATH + "/sitp/tipo-pozo-servicio/tipo-pozo-update";
    return this.http.post(url, rs, httpOptions);
  }

  //Tipo trabajo
  findTipoTrabajoList() {
    const url = this.prop.PATH + "/sitp/tipo-trabajo-service/tipo-trabajo-list";
    return this.http.get(url, httpOptions);
  }

  onSaveTipoTrabajo(rs: TipoTrabajo) {
    const url = this.prop.PATH + "/sitp/tipo-trabajo-servicio/tipo-trabajo-create";
    return this.http.post(url, rs, httpOptions);
  }

  onUpdateTipoTrabajo(rs: TipoTrabajo) {
    const url = this.prop.PATH + "/sitp/tipo-trabajo-servicio/tipo-trabajo-update";
    return this.http.post(url, rs, httpOptions);
  }





}
