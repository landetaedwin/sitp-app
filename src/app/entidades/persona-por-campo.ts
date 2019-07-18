import { Bloque } from './bloque';
import { Campo } from './campo';
import { Usuario } from '../m-login/entidades/usuario';

export class PersonaPorCampo {
    codigoPersonaPorCampo: number
    bloque: Bloque
    campo: Campo
    funcionario: Usuario
    rdhCodigo: string
    correo: string
    fechaInicio: Date
    fechaFin: Date
    fechaAsignacion: Date
    estado: number
    idUsuario: number
}