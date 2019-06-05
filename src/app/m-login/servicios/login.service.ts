import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { Constantes } from 'src/app/resources/constantes';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuario: Usuario = new Usuario;

  constructor(readonly http: HttpClient, public prop:Constantes) { }


  loginUser(user: Usuario) {
    const url = this.prop.PATH+"/sitp/menu/loginUser";
    return this.http.post(url, user, httpOptions);
  }

}