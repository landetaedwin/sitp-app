import { Operadora } from './operadora';
import { Bloque } from './bloque';
import { Campo } from './campo';
import { Pozo } from './pozo';
import { TipoTrabajo } from './tipo-trabajo';

export class Portafolio {
    codigoPortafolio: number
    codigoTipoTrabajo:number
    cexCodigo: number
    bqlCodigo: String
    camCodigo: String
    pozCodigo: string
    pozNombre: String
    numeroTrabajo: number
    fechaTrabajoSinTorre: Date
    fechaInicio: Date
    fechaFin: Date
    estado: number
    fechaRegistro: Date
    idUsuario: number
    codigoTipoPozo: number
    codigoConsorcio: number

    operadora:Operadora;
    bloque:Bloque;
    campo:Campo;
    pozo:Pozo;
    tipoTrabajo:TipoTrabajo;
    
}
