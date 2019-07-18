import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { BuscarPortafolioService } from '../../servicios/buscar-portafolio.service';
import { EditarPortafolioService } from '../../servicios/editar-portafolio.service';

@Component({
  selector: 'app-buscar-portafolio',
  templateUrl: './buscar-portafolio.component.html',
  styleUrls: ['./buscar-portafolio.component.css']
})
export class BuscarPortafolioComponent implements OnInit {
  public loading = false;

  busquedaParametros: BusquedaParametros = new BusquedaParametros;
  usuario: Usuario;
  portafolioList: Portafolio[] = [];

  page_size: number = 8;
  page_number: number = 1;

  constructor(public buscarPortafolioService: BuscarPortafolioService, private messageService: MessageService, public loginService: LoginService, public router: Router, public editarPortafolioService: EditarPortafolioService) {
  }

  ngOnInit() {
    this.loading = true;
    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
   this.buscarPortafolio();
    
  }


  buscarPortafolio() {
    this.loading = true;
    this.portafolioList = [];
    this.buscarPortafolioService.findPortafolioList(this.busquedaParametros).subscribe((data: Portafolio[]) => {
      if (data) {
        this.portafolioList = data;
        this.busquedaParametros.numeroPortafolio = null;
        this.busquedaParametros.pozo = null;
        this.busquedaParametros.fechaDesde = null;
        this.busquedaParametros.fechaHasta = null;
        this.busquedaParametros.funcionario = null;
      }
      this.loading = false;

    });
  }

  editarPortafolio(portafolio: Portafolio) {
    this.editarPortafolioService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['editarPortafolio'] } }]);
  }

}
