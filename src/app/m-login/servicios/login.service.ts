import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { Constantes } from 'src/app/resources/constantes';
import { SessionStorage } from 'angular-web-storage';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuario: Usuario = new Usuario;
  @SessionStorage() sessionValue: Usuario;
  constructor(readonly http: HttpClient, public prop: Constantes) { }


  loginUser(user: Usuario) {
    const url = this.prop.PATH + "/sitp/loginService/loginByUsuario?usuario=" + user.usuarioLogin + "&password=" + user.password + "";
    return this.http.get(url, httpOptions);
  }

  findUserList() {
    const url = this.prop.PATH + "/sitp/loginService/findUserList";
    return this.http.get(url, httpOptions);
  }



}