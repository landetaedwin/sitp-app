import { Operadora } from './operadora';
import { Bloque } from './bloque';
import { Campo } from './campo';
import { Pozo } from './pozo';
import { TipoTrabajo } from './tipo-trabajo';
import { Consorcio } from './consorcio';
import { TipoPozo } from './tipo-pozo';
import { Usuario } from '../m-login/entidades/usuario';

export class Portafolio {
    codigoPortafolio: number
    codigoTipoTrabajo: number
    cexCodigo: number
    blqCodigo: String
    camCodigo: String
    pozCodigo: string
    pozNombre: string
    numeroTrabajo: number
    fechaTrabajoSinTorre: Date
    fechaInicio: Date
    fechaFin: Date
    estado: number
    fechaRegistro: Date
    idUsuario: number
    codigoTipoPozo: number
    codigoConsorcio: number

    operadora: Operadora;
    bloque: Bloque;
    campo: Campo;
    pozo: Pozo;
    tipoTrabajo: TipoTrabajo;
    tipoPozo: TipoPozo;
    consorcio: Consorcio;
    funcionario: Usuario;

    motivoCambio: string
    observacion: string
    fechaModificacion: Date


}
