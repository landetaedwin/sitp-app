import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DocumentoOperadora } from 'src/app/entidades/documentoOperadora';
import { Portafolio } from 'src/app/entidades/portafolio';
import { RegistroDiario } from 'src/app/entidades/registro-diario';
import { Constantes } from "src/app/resources/constantes";
import { Pago } from 'src/app/entidades/pago';

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

    transCrearDocumentoOperadora(documentoOperadora: DocumentoOperadora) {
        const url = this.prop.PATH + "/sitp/documento-operadora-service/crear-documento-operadora";
        return this.http.post(url, documentoOperadora, httpOptions);
    }

    transCrearPago(pago: Pago) {
        const url = this.prop.PATH + "/sitp/pago-service/crear-pago";
        return this.http.post(url, pago, httpOptions);
    }






}
