import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { Campo } from 'src/app/entidades/campo';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Pozo } from 'src/app/entidades/pozo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { CrearPortafolioService } from '../../servicios/crear-portafolio.service';
import { EditarPortafolioService } from '../../servicios/editar-portafolio.service';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';

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
  pozoList: SelectItem[] = [];
  pozo: Pozo;
  campoList: SelectItem[] = [];
  campo: Campo;

  page_size: number = 8;
  page_number: number = 1;

  constructor(public buscarPortafolioService: BusquedaService, private crearPortafolioService: CrearPortafolioService, private messageService: MessageService, public loginService: LoginService, public router: Router, public editarPortafolioService: EditarPortafolioService) {
    this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
  }

  ngOnInit() {
    this.loading = true;
    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
    this.crearPortafolioService.findCamposList().subscribe(
      (data: Campo[]) => {
        let c: Campo;
        for (let i in data) {
          c = data[i];
          this.campoList.push({ label: c.camNombre, value: c });
        }
      });
    this.buscarPortafolio();

  }

  cargarPozosByCamCodigo(campo: Campo) {
    if (campo.camCodigo) {
      this.loading = true;
      this.crearPortafolioService.findPozoByCamCodigo(campo.camCodigo).subscribe(
        (data: Pozo[]) => {
          let p: Pozo;
          this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
          for (let i in data) {
            p = data[i];
            this.pozoList.push({ label: p.pozNombre, value: p });
          }
          this.loading = false;
        });
    }

  }


  buscarPortafolio() {
    this.loading = true;
    this.portafolioList = [];

    if (this.pozo) {
      this.busquedaParametros.pozo = this.pozo.pozNombre;
    }
    this.buscarPortafolioService.findPortafolioList(this.busquedaParametros).subscribe((data: Portafolio[]) => {
      if (data) {
        this.portafolioList = data;
        this.busquedaParametros.numeroPortafolio = null;
        this.busquedaParametros.pozo = null;
        this.busquedaParametros.fechaDesde = null;
        this.busquedaParametros.fechaHasta = null;
        this.busquedaParametros.funcionario = null;
        this.campo = null;
        this.pozo = null;
        this.loading = false;
      } else {
        this.messageService.add({ severity: 'info', detail: 'No se encontraron datos' });
        this.busquedaParametros.numeroPortafolio = null;
        this.busquedaParametros.pozo = null;
        this.busquedaParametros.fechaDesde = null;
        this.busquedaParametros.fechaHasta = null;
        this.busquedaParametros.funcionario = null;
        this.campo = null;
        this.pozo = null;
        this.loading = false;
      }

    });
  }

  crearPortafolio() {
    this.loading = true;
    this.router.navigate(['/menu', { outlets: { sitp: ['crearPortafolio'] } }]);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  editarPortafolio(portafolio: Portafolio) {
    this.editarPortafolioService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['editarPortafolio'] } }]);
  }


  goToRegistroDiario(portafolio: Portafolio) {
    this.editarPortafolioService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['registroDiario'] } }]);
  }

  goToInformeOperadora(portafolio: Portafolio) {
    this.editarPortafolioService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['reporte-documentos-operadora'] } }]);
  }

  goToDocumentoMinisterio(portafolio: Portafolio) {
    this.editarPortafolioService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['reporte-documentos-ministerio'] } }]);
  }


}
