import { Archivo } from './archivo'

export class DocumentoMinisterio {
    
    codigoDocumentoMinisterio: number
    codigoPortafolio: number
    numeroSGC: String
    numeroOficio: String
    urlOficio: String
    urlAnexo1: String
    fechaOficio: Date
    asunto: number
    numeroResolucion: String
    objetivo: String
    estado: number
    fechaRegistro: Date
    idUsuario: number
    fileOficio: Archivo
    fileAnexo1: Archivo

}