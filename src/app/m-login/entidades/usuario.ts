import { Perfil } from './perfil';
export class Usuario {

    idUsuario: number;
    usuarioLogin: string;
    password: string;
    apellidos: string;
    nombres: string;
    correo: string;

    perfil:Perfil;

}
