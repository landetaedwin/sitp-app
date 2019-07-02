import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Constantes } from '../../resources/constantes';
import { Usuario } from '../entidades/usuario';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  usuario: Usuario = new Usuario;
  public loading = false;

  constructor(public constantes: Constantes, public router: Router, public loginService: LoginService, private messageService: MessageService) {
  }

  ngOnInit() {
    if(this.loginService.sessionValue){
      this.router.navigate(['/menu']);
    }
  }


  verifyLogin() {
    this.messageService.clear();
    this.loading = true;
    this.loginService.loginUser(this.usuario).subscribe((data: Usuario) => {
      if (data) {
        this.loginService.sessionValue = data;
        this.router.navigate(['/menu']);
        this.loading = false;
      } else {
        this.messageService.add({ severity: 'info', detail: 'Usuario y Contraseña incorrecta' });
        this.loading = false;
      }
    }, (err) => {
      this.messageService.add({ severity: 'error', detail: 'Error interno' });

      this.loading = false;

    });
  }

}
