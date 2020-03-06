import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constantes } from 'src/app/resources/constantes';
import { Yacimiento } from 'src/app/entidades/yacimiento';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class YacimientoService {

  constructor(readonly http: HttpClient, public prop: Constantes) { }

    //Yacimiento
    findYacimientoList() {
      const url = this.prop.PATH + "/sitp/yacimiento-service/yacimiento-list";
      return this.http.get(url, httpOptions);
    }
  
    findYacimientoById(){
      const url = this.prop.PATH + "/sitp/yacimiento-service/yacimiento-id";
      return this.http.get(url, httpOptions);
    }
  
    onSaveYacimiento(rs: Yacimiento) {
      const url = this.prop.PATH + "/sitp/yacimiento-service/create";
      return this.http.post(url, rs, httpOptions);
    }
  
    onUpdateYacimiento(rs: Yacimiento) {
      const url = this.prop.PATH + "/sitp/yacimiento-service/update";
      return this.http.post(url, rs, httpOptions);
    }
}
