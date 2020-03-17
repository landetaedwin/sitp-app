import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constantes } from 'src/app/resources/constantes';
import { Parametros } from 'src/app/entidades/parametro';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(readonly http: HttpClient, public prop: Constantes) { }

      //Parametro
      findParametroList() {
        const url = this.prop.PATH + "/sitp/parametro-service/parametro-list";
        return this.http.get(url, httpOptions);
      }
    
      findParametroById(){
        const url = this.prop.PATH + "/sitp/parametro-service/parametro-id";
        return this.http.get(url, httpOptions);
      }
    
      onSaveParametro(rs: Parametros) {
        const url = this.prop.PATH + "/sitp/parametro-service/create";
        return this.http.post(url, rs, httpOptions);
      }
    
      onUpdateParametro(rs: Parametros) {
        const url = this.prop.PATH + "/sitp/parametro-service/update";
        return this.http.post(url, rs, httpOptions);
      }

}
