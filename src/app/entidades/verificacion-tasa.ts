import { Portafolio } from './portafolio'

export class VerificacionTasa {
    codigoVerificacionTasa: number
    codigoPortafolio: number
    codigoTasa: number
    numeroRegistros: number
    valorMaximo: number
    valoracion: number
    justificacion: number
    observacion: string
    estado: number
    idUsuario: number
    fechaModificacion: Date
    alias: string

    portafolio: Portafolio;

}