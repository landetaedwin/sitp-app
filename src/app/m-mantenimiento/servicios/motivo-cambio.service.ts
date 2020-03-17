import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MotivoCambio } from 'src/app/entidades/motivo-cambio';
import { Constantes } from 'src/app/resources/constantes';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})

export class MotivoCambioService {

  constructor(readonly http: HttpClient, public prop: Constantes) { }

    //MotivoCambio
    findMotivoCambioList() {
      const url = this.prop.PATH + "/sitp/motivoCambio-service/motivoCambio-list";
      return this.http.get(url, httpOptions);
    }
  
    findMotivoCambioId() {
      const url = this.prop.PATH + "/sitp/motivoCambio-service/motivoCambio-id";
      return this.http.get(url, httpOptions);
    }
  
    onSaveMotivoCambio(rs: MotivoCambio) {
      const url = this.prop.PATH + "/sitp/motivoCambio-service/create";
      return this.http.post(url, rs, httpOptions);
    }
  
    onUpdateMotivoCambio(rs: MotivoCambio) {
      const url = this.prop.PATH + "/sitp/motivoCambio-service/update";
      return this.http.post(url, rs, httpOptions);
    }
}
