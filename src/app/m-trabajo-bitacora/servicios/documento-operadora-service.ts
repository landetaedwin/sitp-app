import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constantes } from "src/app/resources/constantes";
import { DocumentoOperadora } from 'src/app/entidades/documentoOperadora';


const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  
  @Injectable({
    providedIn: "root"
  })

  export class DocumentoOperadoraService {

    constructor(readonly http: HttpClient, public prop: Constantes) { }

    transDocumentoOperadora(documentoOperadora:DocumentoOperadora){
        const url =  this.prop.PATH + "/sitp/DocumentOperadora/transCrearDocumentoOperadora";
        return this.http.post(url, documentoOperadora, httpOptions);
      }

      findDocumentoOperadoraList() {
        const url = this.prop.PATH + "sitp/DocumentOperadora/findDocumentOperadora";
        return this.http.get(url, httpOptions);
      }




}