import { TipoTrabajo } from './tipo-trabajo'
import { Categoria } from './categoria'

export class HistorialPozo {
    codigoPersonaPorCampo: number
    codigoCategoria: number
    codigoPortafolio: number
    codigoTipoTrabajo: number
    camCodigo: string
    pozCodigo: string
    numero: number
    fechaTST: Date
    fechaInicio: Date
    fechaFin: Date
    estado: number
    fechaRegistro: Date
    fechaActualizacion: Date
    idUsuario: number


    tipoTrabajo: TipoTrabajo;
    categoria: Categoria;



}