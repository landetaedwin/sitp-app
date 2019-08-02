import { Accion } from './accion';

export class RegistroDiario {
    codigoRegistroDiario: number
    codigoAccion: number
    accion: Accion
    codigoPortafolio: number
    fechaAccion: Date
    fechaFin: Date
    actividad: string
    estado: number
    fechaActualizacion: Date
    idUsuario: number
}