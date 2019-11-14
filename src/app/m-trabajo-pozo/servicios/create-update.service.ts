import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DocumentoMinisterio } from 'src/app/entidades/documentoMinisterio';
import { DocumentoOperadora } from 'src/app/entidades/documentoOperadora';
import { HistorialPozo } from 'src/app/entidades/historialPozo';
import { Pago } from 'src/app/entidades/pago';
import { Portafolio } from 'src/app/entidades/portafolio';
import { RegistroDiario } from 'src/app/entidades/registro-diario';
import { Tasa } from 'src/app/entidades/tasa';
import { VerificacionTasa } from 'src/app/entidades/verificacion-tasa';
import { Constantes } from "src/app/resources/constantes";
import { PersonaPorCampo } from 'src/app/entidades/persona-por-campo';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
    providedIn: "root"
})
export class CreateUpdateService {
    constructor(readonly http: HttpClient, public prop: Constantes) { }

    transCrearPortafolio(portafolio: Portafolio) {
        const url = this.prop.PATH + "/sitp/portafolio-service/crear-portafolio";
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

    transEditarRegistroDiario(rs: RegistroDiario) {
        const url = this.prop.PATH + "/sitp/registro-diario-service/update-registro-diario";
        return this.http.post(url, rs, httpOptions);
    }

    transCrearDocumentoOperadora(documentoOperadora: DocumentoOperadora) {
        const url = this.prop.PATH + "/sitp/documento-operadora-service/crear-documento-operadora";
        return this.http.post(url, documentoOperadora, httpOptions);
    }

    transUpdateDocumentoOperadora(documentoOperadora: DocumentoOperadora) {
        const url = this.prop.PATH + "/sitp/documento-operadora-service/update-documento-operadora";
        return this.http.post(url, documentoOperadora, httpOptions);
    }

    transCrearPago(pago: Pago) {
        const url = this.prop.PATH + "/sitp/pago-service/crear-pago";
        return this.http.post(url, pago, httpOptions);
    }

    transCrearDocumentoMinisterio(documentoMinisterio: DocumentoMinisterio) {
        const url = this.prop.PATH + "/sitp/documento-ministerio-service/crear-documento-ministerio";
        return this.http.post(url, documentoMinisterio, httpOptions);
    }

    transUpdateDocumentoMinisterio(documentoMinisterio: DocumentoMinisterio) {
        const url = this.prop.PATH + "/sitp/documento-ministerio-service/update-documento-ministerio";
        return this.http.post(url, documentoMinisterio, httpOptions);
    }

    transCrearHistorialPozo(historialPozo: HistorialPozo) {
        const url = this.prop.PATH + "/sitp/historial-pozo-service/crear-historial-pozo";
        return this.http.post(url, historialPozo, httpOptions);
    }

    transCrearTasa(tasa: Tasa) {
        const url = this.prop.PATH + "/sitp/tasa-service/crear-tasa";
        return this.http.post(url, tasa, httpOptions);
    }

    transUpdateTasa(tasa: Tasa) {
        const url = this.prop.PATH + "/sitp/tasa-service/update-tasa";
        return this.http.post(url, tasa, httpOptions);
    }

    transUpdatePago(pago: Pago) {
        const url = this.prop.PATH + "/sitp/pago-service/editar-pago";
        return this.http.post(url, pago, httpOptions);
    }

    transCreateVErificacionTasa(verificacionTasa: VerificacionTasa) {
        const url = this.prop.PATH + "/sitp/tasa-service/crear-verificacion-tasa";
        return this.http.post(url, verificacionTasa, httpOptions);
    }

    transCreatePersonaPorCampo(personaPorCampo: PersonaPorCampo) {
        const url = this.prop.PATH + "/sitp/persona-campo-service/create-persona-campo";
        return this.http.post(url, personaPorCampo, httpOptions);
    }


}
