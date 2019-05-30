import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuario: Usuario = new Usuario;

  constructor(readonly http: HttpClient) { }


  loginUser(user: Usuario) {
    const url = `http://localhost:8080/sitp/menu/loginUser`;
    return this.http.post(url, user, httpOptions);
  }

}
