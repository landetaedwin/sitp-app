import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constantes } from 'src/app/resources/constantes';
import { TipoPozo } from 'src/app/entidades/tipo-pozo';
import { ConsorciosComponent } from '../componentes/consorcios/consorcios.component';
import { Asunto } from 'src/app/entidades/asunto';
import { Consorcio } from 'src/app/entidades/consorcio';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {


  constructor(readonly http: HttpClient, public prop: Constantes) { }

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






}
