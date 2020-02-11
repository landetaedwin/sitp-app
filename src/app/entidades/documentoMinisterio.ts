import { Archivo } from './archivo'
import { Asunto } from './asunto'

export class DocumentoMinisterio {
    
    codigoDocumentoMinisterio: number
    codigoPortafolio: number
    numeroSGC: String
    numeroOficio: String
    urlOficio: String
    urlAnexo1: String
    fechaOficio: Date
    codigoAsunto: number
    asunto:Asunto
    numeroResolucion: String
    objetivo: String
    estado: number
    fechaRegistro: Date
    idUsuario: number
    fileOficio: Archivo
    fileAnexo1: Archivo

}