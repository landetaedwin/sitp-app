import { Archivo } from './archivo'
import { Asunto } from './asunto'
import { Portafolio } from './portafolio'
import { Categoria } from './categoria'

export class DocumentoOperadora {

    codigoDocumentoOperadora: number
    codigoCategoria: number
    codigoPortafolio: number
    numeroSGC: string
    numeroOficio: string
    urlOficio: string
    urlAnexo1: string
    urlAnexo2: string
    urlAnexo3: string
    urlAnexo4: string
    urlPagos: string
    fechaOficio: Date
    fechaARCH: Date
    codigoAsunto: number
    asunto: Asunto
    categoria: Categoria
    objetivo: string
    estado: number
    fechaRegistro: Date;
    idUsuario: number

    fileOficio: Archivo
    fileAnexo1: Archivo
    fileAnexo2: Archivo
    fileAnexo3: Archivo
    fileAnexo4: Archivo
    filePago: Archivo

    portafolio: Portafolio


}
