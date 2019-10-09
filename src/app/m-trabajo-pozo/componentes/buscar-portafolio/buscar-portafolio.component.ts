import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { Campo } from 'src/app/entidades/campo';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Pozo } from 'src/app/entidades/pozo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
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
  total: number = 8;

  constructor(public busquedaService: BusquedaService, private messageService: MessageService, public loginService: LoginService, public router: Router) {
    this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
  }

  ngOnInit() {
    this.loading = true;
    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
    this.getCampoList();
    //this.buscarPortafolio();

  }

  getCampoList() {
    this.busquedaService.getCampoList().subscribe(
      (data: Campo[]) => {
        let c: Campo;
        for (let i in data) {
          c = data[i];
          this.campoList.push({ label: c.camNombre, value: c });
        }
        this.loading = false;
      });
  }

  getPozoListByCamCodigo(campo: Campo) {
    if (campo.camCodigo) {
      this.loading = true;
      this.busquedaService.getPozoListByCamCodigo(campo.camCodigo).subscribe(
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
      this.busquedaParametros.pozo = this.pozo.pozCodigo;
    }

    if (this.campo) {
      this.busquedaParametros.campo = this.campo.camCodigo;
    }


    this.busquedaService.getPortafolioList(this.busquedaParametros).subscribe((data: Portafolio[]) => {
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
    this.busquedaService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['editarPortafolio'] } }]);
  }


  goToRegistroDiario(portafolio: Portafolio) {
    this.busquedaService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['registroDiario'] } }]);
  }

  goToInformeOperadora(portafolio: Portafolio) {
    this.busquedaService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['reporte-documentos-operadora'] } }]);
  }

  goToDocumentoMinisterio(portafolio: Portafolio) {
    this.busquedaService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['reporte-documentos-ministerio'] } }]);
  }


}
