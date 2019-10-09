import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Constantes } from 'src/app/resources/constantes';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';

@Component({
  selector: 'app-documento-ministerio',
  templateUrl: './documento-ministerio.component.html',
  styleUrls: ['./documento-ministerio.component.css']
})
export class DocumentoMinisterioComponent implements OnInit {

  public loading = false;
  usuario: Usuario;
  portafolio: Portafolio = new Portafolio;

  constructor(public loginService: LoginService, public cs: Constantes, public messageService: MessageService, public router: Router, public buscarService: BusquedaService, private modalService: BsModalService) {
  }
  ngOnInit() {

    this.loading = true;
    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
    if (!this.buscarService.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
    }

    this.portafolio = this.buscarService.portafolio;



    setTimeout(() => {
      this.loading = false;
    }, 1000);

  }

}
