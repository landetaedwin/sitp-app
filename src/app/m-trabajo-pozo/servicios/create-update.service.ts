import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";
import { Portafolio } from 'src/app/entidades/portafolio';
import { PersonaPorCampo } from 'src/app/entidades/persona-por-campo';
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


}
