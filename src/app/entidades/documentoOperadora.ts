import { Archivo } from './archivo'

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
    fechaARCH: string
    asunto: string
    objetivo:string
    estado: number
    fechaRegistro:Date;
    idUsuario: number

    fileOficio: Archivo
    fileAnexo1: Archivo
    fileAnexo2: Archivo
    fileAnexo3: Archivo
    fileAnexo4: Archivo
    filePago: Archivo


}
