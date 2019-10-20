import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Portafolio } from 'src/app/entidades/portafolio';
import { Constantes } from "src/app/resources/constantes";
import { RegistroDiario } from 'src/app/entidades/registro-diario';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
    providedIn: "root"
})
export class CreateUpdateService {
    constructor(readonly http: HttpClient, public prop: Constantes) { }

    transCrearPortafolio(portafolio: Portafolio) {
        const url = this.prop.PATH + "/sitp/crearPortafolio/transCrearPortafolio";
        return this.http.post(url, portafolio, httpOptions);
    }

    transUpdatePortafolio(portafolio: Portafolio) {
        const url = this.prop.PATH + "/sitp/portafolio-service/update-portafolio";
        return this.http.post(url, portafolio, httpOptions);
    }

    transCrearRegistroDiario(rs: RegistroDiario) {
        const url = this.prop.PATH + "/sitp/registro-diario-service/crear-registro-diario";
        return this.http.post(url, rs, httpOptions);
    }






}
