import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constantes } from 'src/app/resources/constantes';
import { TipoPozo } from 'src/app/entidades/tipo-pozo';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {


  constructor(readonly http: HttpClient, public prop: Constantes) { }


  //Tipo pozo
  findTipoPozoList() {
    const url = this.prop.PATH + "/sitp/crearPortafolio/findTipoPozoList";
    return this.http.get(url, httpOptions);
  }

  onSaveTipoPozo(rs: TipoPozo) {
    const url = this.prop.PATH + "/sitp/mantenimiento/onCreateTipoPozo";
    return this.http.post(url, rs, httpOptions);
  }

  onUpdateTipoPozo(rs: TipoPozo) {
    const url = this.prop.PATH + "/sitp/mantenimiento/onUpdateTipoPozo";
    return this.http.post(url, rs, httpOptions);
  }

}
