import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { CrearPortafolioService } from '../../servicios/crear-portafolio.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BuscarPortafolioService } from 'src/app/m-trabajo-bitacora/servicios/buscar-portafolio.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Constantes } from 'src/app/resources/constantes';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { EditarPortafolioService } from '../../servicios/editar-portafolio.service';
import { Portafolio } from 'src/app/entidades/portafolio';

@Component({
  selector: 'app-registro-trabajo-diario',
  templateUrl: './registro-trabajo-diario.component.html',
  styleUrls: ['./registro-trabajo-diario.component.css']
})
export class RegistroTrabajoDiarioComponent implements OnInit {
  public loading = false;
  usuario: Usuario;
  portafolio: Portafolio = new Portafolio;

  maxDate: Date;
  minDate: Date;

  constructor(public loginService: LoginService, public editarPortafolioService: EditarPortafolioService, public cs: Constantes, private crearPortafolioService: CrearPortafolioService, public messageService: MessageService, public router: Router, private buscarService: BuscarPortafolioService, private modalService: BsModalService) {
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
    this.maxDate = new Date();
    this.minDate = new Date(2010, 0, 1);

    this.portafolio = this.editarPortafolioService.portafolio;


    setTimeout(() => {
      this.loading = false;
    }, 1000);



  }

}
