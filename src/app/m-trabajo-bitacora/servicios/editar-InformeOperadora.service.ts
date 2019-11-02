import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";
import { InformeOperadora } from 'src/app/entidades/informe-operadora';
import { VerificacionFechas } from 'src/app/entidades/verificacionFechas';
import { Portafolio } from 'src/app/entidades/portafolio';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
    providedIn: "root"
})
export class EditarInformeOperadoraService {

    verificarFechas: VerificacionFechas;
    portafolio:Portafolio;
    informeOperadora: InformeOperadora;

    constructor(readonly http: HttpClient, public prop: Constantes) { }


}

