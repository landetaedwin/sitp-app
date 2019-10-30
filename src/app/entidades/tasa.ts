import { Operadora } from './operadora'
import { Bloque } from './bloque'
import { Campo } from './campo'
import { Pozo } from './pozo'
import { Usuario } from '../m-login/entidades/usuario'
import { Archivo } from './archivo'
import { Alias } from './alias'
import { Yacimiento } from './yacimiento'

export class Tasa {
    codigoTasa: number
    codigoYacimiento: number
    codigoAlias: number
    cexCodigo: number
    blqCodigo: String
    camCodigo: String
    pozCodigo: String
    tasa: number
    numeroOficio: String
    urlOficio: String
    fechaOficio: Date
    numeroSGC: String
    numeroResolucion: String
    urlResolucion: Date
    fechaResolucion: Date
    observacion: String
    estado: number
    fechaRegistro: Date
    fechaActualizacion: Date
    idUsuario: number
    operadora: Operadora
    bloque: Bloque
    campo: Campo
    pozo: Pozo
    alias: Alias
    yacimiento: Yacimiento
    funcionario: Usuario
    fileOficio: Archivo
    fileResolucion: Archivo
}