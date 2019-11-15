import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { Campo } from 'src/app/entidades/campo';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Pozo } from 'src/app/entidades/pozo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';
import { Constantes } from 'src/app/resources/constantes';
import { Operadora } from 'src/app/entidades/operadora';
import { Bloque } from 'src/app/entidades/bloque';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateUpdateService } from '../../servicios/create-update.service';

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

  page_size: number = 10;
  page_number: number = 1;
  total: number = 10;

  searchText: string;
  usuarioModalRefBusqueda: BsModalRef;
  userList: Usuario[] = [];

  confirmModalRef: BsModalRef;

  portafolio: Portafolio = new Portafolio;

  constructor(public busquedaService: BusquedaService, private dataApi: CreateUpdateService, private messageService: MessageService, public loginService: LoginService, public router: Router, public prop: Constantes, private modalService: BsModalService) {
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
    this.buscarPortafolio();
    this.busquedaParametros.usuario = new Usuario;


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

        let dataAux: Portafolio[] = [];

        for (let i: number = 0; i < data.length; i++) {
          if (!data[i].operadora) {
            data[i].operadora = new Operadora;
            data[i].operadora.cexCodigo = null;
            data[i].operadora.cexApellidoPaterno = "N/A";
          }
          if (!data[i].bloque) {
            data[i].bloque = new Bloque;
            data[i].bloque.blqCodigo = null;
            data[i].bloque.bqlNombre = "N/A";
          }
          dataAux.push(data[i]);
        }
        this.portafolioList = dataAux;
        this.busquedaParametros.numeroPortafolio = null;
        this.busquedaParametros.pozo = null;
        this.busquedaParametros.campo = null;
        this.busquedaParametros.fechaDesde = null;
        this.busquedaParametros.fechaHasta = null;
        this.busquedaParametros.funcionario = null;
        this.busquedaParametros.usuario = new Usuario

        this.campo = null;
        this.pozo = null;
        this.loading = false;
      } else {
        this.messageService.add({ severity: 'info', detail: 'No se encontraron datos' });
        this.busquedaParametros.numeroPortafolio = null;
        this.busquedaParametros.pozo = null;
        this.busquedaParametros.campo = null;
        this.busquedaParametros.fechaDesde = null;
        this.busquedaParametros.fechaHasta = null;
        this.busquedaParametros.funcionario = null;
        this.busquedaParametros.usuario = new Usuario
        this.campo = null;
        this.pozo = null;
        this.loading = false;
      }
    });
  }

  crearPortafolio() {
    this.router.navigate(['/menu', { outlets: { sitp: ['crearPortafolio'] } }]);
  }

  editarPortafolio(portafolio: Portafolio) {
    if (portafolio.estado == 1) {
      this.busquedaService.portafolio = portafolio;
      this.router.navigate(['/menu', { outlets: { sitp: ['editarPortafolio'] } }]);
    } else {
      this.messageService.add({ severity: 'error', detail: 'Portafolio anulado, comunícate con el administrador.' });
    }
  }

  goToRegistroDiario(portafolio: Portafolio) {
    if (portafolio.estado == 1) {
      this.busquedaService.portafolio = portafolio;
      this.router.navigate(['/menu', { outlets: { sitp: ['registroDiario'] } }]);
    } else {
      this.messageService.add({ severity: 'error', detail: 'Portafolio anulado, comunícate con el administrador.' });
    }
  }

  goToDocumentoOperadota(portafolio: Portafolio) {
    if (portafolio.estado == 1) {
      this.busquedaService.portafolio = portafolio;
      this.router.navigate(['/menu', { outlets: { sitp: ['reporte-documentos-operadora'] } }]);
    } else {
      this.messageService.add({ severity: 'error', detail: 'Portafolio anulado, comunícate con el administrador.' });
    }
  }

  goToDocumentoMinisterio(portafolio: Portafolio) {
    if (portafolio.estado == 1) {
      this.busquedaService.portafolio = portafolio;
      this.router.navigate(['/menu', { outlets: { sitp: ['reporte-documentos-ministerio'] } }]);
    } else {
      this.messageService.add({ severity: 'error', detail: 'Portafolio anulado, comunícate con el administrador.' });
    }
  }

  openModalFuncionarioBusqueda(template: TemplateRef<any>) {
    this.loading = true;
    this.getAllUsers();
    this.usuarioModalRefBusqueda = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeUsuarioModalBusqueda() {
    this.usuarioModalRefBusqueda.hide();
  }

  getAllUsers() {
    this.loginService.findUserList().subscribe((data: Usuario[]) => {
      this.userList = data;
      this.loading = false;
    }, (err) => {
      this.messageService.add({ severity: 'error', detail: 'Error interno' });
      this.loading = false;

    });
  }

  goSelectUserBusqueds(user: Usuario) {
    this.busquedaParametros.usuario = user;
    this.busquedaParametros.funcionario = user.idUsuario;
    this.closeUsuarioModalBusqueda();
  }

  anularPortafolio() {
    this.loading = true;
    this.portafolio.estado = 0;
    this.portafolio.motivoCambio = "Anulacion del portafolio";
    this.portafolio.fechaRegistro = new Date(this.portafolio.fechaRegistro);
    if (this.portafolio.fechaInicio) {
      this.portafolio.fechaInicio = new Date(this.portafolio.fechaInicio);
    }
    if (this.portafolio.fechaFin) {
      this.portafolio.fechaFin = new Date(this.portafolio.fechaFin);
    }
    if (this.portafolio.fechaModificacion) {
      this.portafolio.fechaModificacion = new Date(this.portafolio.fechaModificacion);
    }
    if (this.portafolio.fechaTrabajoSinTorre) {
      this.portafolio.fechaModificacion = new Date(this.portafolio.fechaTrabajoSinTorre);
    }

    this.dataApi.transUpdatePortafolio(this.portafolio).subscribe(data => {
      if (data == "El portafolio ha sido actualizado correctamente") {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: '' + data });
        this.confirmModalRef.hide();
        this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);

      } else {
        this.loading = false;
        this.confirmModalRef.hide();
        this.messageService.add({ severity: 'info', detail: '' + data });
      }
    });
  }

  openConfirmModal(template: TemplateRef<any>, portafolio: Portafolio) {
    this.portafolio = portafolio;
    this.confirmModalRef = this.modalService.show(template);
  }

  goToVerificarTasa(portafolio: Portafolio) {
    if (portafolio.estado == 1) {
      this.busquedaService.portafolio = portafolio;
      this.router.navigate(['/menu', { outlets: { sitp: ['verificarTasa'] } }]);
    } else {
      this.messageService.add({ severity: 'error', detail: 'Portafolio anulado, comunícate con el administrador.' });
    }
  }

}
