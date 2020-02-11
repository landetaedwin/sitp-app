import { Bloque } from './bloque';
import { Campo } from './campo';
import { Usuario } from '../m-login/entidades/usuario';
import { Regional } from './regional';

export class PersonaPorCampo {
    codigoPersonaPorCampo: number
    bloque: Bloque
    campo: Campo
    funcionario: Usuario
    regional: Regional
    rdhCodigo: string
    correo: string
    fechaInicio: Date;
    fechaFin: Date
    fechaAsignacion: Date
    estado: number
    idUsuario: number

    blqCodigo: string;
    camCodigo: string
    idUsuarioFuncionario: number
}