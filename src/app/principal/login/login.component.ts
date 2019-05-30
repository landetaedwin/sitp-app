import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../entidades/usuario';
import { Constantes } from '../../resources/constantes';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  usuario: Usuario = new Usuario;

  constructor(public constantes: Constantes, public router: Router, public loginService: LoginService) {
  }

  ngOnInit() {
  }


  verifyLogin() {
    this.usuario.userName = this.username;
    this.usuario.password = this.password;
    this.loginService.loginUser(this.usuario).subscribe((data: Usuario) => {
      if (data && data.perfil) {
        this.loginService.usuario = data;
        this.router.navigate(['/menu']);
      }

    });
  }

}
