
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { BuscarPortafolioService } from '../../servicios/buscar-portafolio.service';
import { EditarPortafolioService } from '../../servicios/editar-portafolio.service';
import { InformeTrabajoOperadoraService} from '../../servicios/informe-trabajo-operadora.service';

@Component({
  selector: 'app-buscar-portafolio-bitacora',
  templateUrl: './buscar-portafolio-bitacora.component.html',
  styleUrls: ['./buscar-portafolio-bitacora.component.css']
})
export class BuscarPortafolioBitacoraComponent implements OnInit {
  public loading = false;


  busquedaParametros: BusquedaParametros = new BusquedaParametros;
  usuario: Usuario;
  portafolioList: Portafolio[] = [];
  constructor(public buscarPortafolioService: BuscarPortafolioService, private messageService: MessageService, public loginService: LoginService, public router: Router, public informeOperadoraService: InformeTrabajoOperadoraService) { }

  ngOnInit() {
    this.loading = true;
    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
    this.loading = false;
  }

  buscarPortafolio() {
    this.loading = true;
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

  informeOperadora(portafolio: Portafolio) {
  //  this.editarPortafolioService.portafolio = portafolio;
    this.informeOperadoraService.portafolio= portafolio;
      this.router.navigate(['/menu', { outlets: { sitp: ['informeOperadora'] } }]);
  }
}
