
import { TipoPozo } from './tipo-pozo';
export class VerificacionProduccion {
    codVerificacion:number
    codPortafolio:number
    numRegistros:number
    porcentajeControlEstatico:number=10
    Porcentaje_inc_dis:number
    valoracion:number
    justificado:number
    observacion:number
    estado:number
    fecha_actualizacion:Date
    idUsu:number
    tipopozo:TipoPozo
    PorcentajeMostrar:String
    valor_antes:number
    valor_despues:number
    porcentajeControl:number
    descripcionValoracion:String

}