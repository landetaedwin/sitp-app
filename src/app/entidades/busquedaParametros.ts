import { Bloque } from './bloque';
import { Campo } from './campo';
import { Usuario } from '../m-login/entidades/usuario';

export class BusquedaParametros {
    numeroPortafolio: number = null;
    pozo: String = null;
    fechaDesde: Date = null;
    fechaHasta: Date = null;
    funcionario: String = null;
    bloque: Bloque = null;
    campo: Campo = null;
    estado: number = null;
    usuario: Usuario = null;
}