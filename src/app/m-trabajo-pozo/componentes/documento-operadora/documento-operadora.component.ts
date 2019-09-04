import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Constantes } from 'src/app/resources/constantes';
import { CrearPortafolioService } from '../../servicios/crear-portafolio.service';
import { EditarPortafolioService } from '../../servicios/editar-portafolio.service';

@Component({
  selector: 'app-documento-operadora',
  templateUrl: './documento-operadora.component.html',
  styleUrls: ['./documento-operadora.component.css']
})
export class DocumentoOperadoraComponent implements OnInit {
  public loading = false;
  usuario: Usuario;
  portafolio: Portafolio = new Portafolio;

  constructor(public loginService: LoginService, public editarPortafolioService: EditarPortafolioService, public cs: Constantes, private crearPortafolioService: CrearPortafolioService, public messageService: MessageService, public router: Router, private modalService: BsModalService) {
  }
  ngOnInit() {

    this.loading = true;
    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
    if (!this.editarPortafolioService.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
    }

    this.portafolio = this.editarPortafolioService.portafolio;



    setTimeout(() => {
      this.loading = false;
    }, 1000);

  }

}
