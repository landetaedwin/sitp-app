import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService, SelectItem } from 'primeng/api';
import { Bloque } from 'src/app/entidades/bloque';
import { Campo } from 'src/app/entidades/campo';
import { Consorcio } from 'src/app/entidades/consorcio';
import { Operadora } from 'src/app/entidades/operadora';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Pozo } from 'src/app/entidades/pozo';
import { TipoPozo } from 'src/app/entidades/tipo-pozo';
import { TipoTrabajo } from 'src/app/entidades/tipo-trabajo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { CrearPortafolioService } from '../../servicios/crear-portafolio.service';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';

@Component({
  selector: 'app-editar-portafolio',
  templateUrl: './editar-portafolio.component.html',
  styleUrls: ['./editar-portafolio.component.css']
})
export class EditarPortafolioComponent implements OnInit {

  public loading = false;

  usuario: Usuario;
  today = new Date();
  portafolio: Portafolio = new Portafolio;

  minDate: Date;
  maxDate: Date;

  pozoList: SelectItem[] = [];
  tipoPozoList: SelectItem[] = [];
  consorcioList: SelectItem[] = [];
  tipoTrabajoList: SelectItem[] = [];
  numeroList: SelectItem[] = [];
  estadoList: SelectItem[] = [];

  pozo: Pozo = new Pozo;
  consorcio: Consorcio = new Consorcio;
  tipoPozo: TipoPozo = new TipoPozo;
  tipoTrabajo: TipoTrabajo = new TipoTrabajo;
  bloque: Bloque = new Bloque;
  operadora: Operadora = new Operadora;
  tst: boolean = true;
  numeroTrabajo: number;
  estado: number;

  confirmModalRef: BsModalRef;

  constructor(public busquedaService: BusquedaService, private messageService: MessageService, private modalService: BsModalService, public crearPortafolioService: CrearPortafolioService, public loginService: LoginService, public router: Router) {

    this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.tipoPozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.consorcioList = [{ label: "Seleccione", value: null, disabled: true }];
    this.tipoTrabajoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.numeroList = [{ label: "Seleccione", value: null, disabled: true }];
    this.estadoList = [{ label: "Seleccione", value: null, disabled: true }, { label: "Registrado", value: 3 }, { label: "Anulado", value: 0 }];

  }

  ngOnInit() {
    this.loading = true;
    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
    if (!this.busquedaService.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
    }
    this.maxDate = new Date();
    this.minDate = new Date(2010, 0, 1);


    this.portafolio = this.busquedaService.portafolio;

    this.pozo = this.portafolio.pozo;
    this.consorcio = this.portafolio.consorcio;
    this.tipoTrabajo = this.portafolio.tipoTrabajo;
    this.numeroTrabajo = this.portafolio.numeroTrabajo;
    this.tipoPozo = this.portafolio.tipoPozo
    this.estado = this.portafolio.estado;


    if (this.tipoTrabajo.codigoTipoTrabajo == 3) {
      this.campoTst = true;
      this.portafolio.fechaTrabajoSinTorre = new Date(this.portafolio.fechaTrabajoSinTorre);
    }

    this.cargarCampoPozo(this.portafolio.campo);
    this.cargarOperadoraByPozCompaniaPetrolera(this.pozo);
    this.cargarTipoPozoList();
    this.cargarConsorcioList();
    this.cargarNumeroList();
    this.cargarTipoTrabajoList();

  }

  cargarTipoTrabajoList() {
    this.crearPortafolioService.findTrabajoList().subscribe(
      (data: TipoTrabajo[]) => {
        let tt: TipoTrabajo;
        this.tipoTrabajoList = [{ label: "Seleccione", value: null, disabled: true }];
        for (let i in data) {
          tt = data[i];
          this.tipoTrabajoList.push({ label: tt.tipoTrabajo, value: tt });
        }
      });
  }

  cargarConsorcioList() {
    this.crearPortafolioService.findConsorcioList().subscribe(
      (data: Consorcio[]) => {
        let con: Consorcio;
        this.consorcioList = [{ label: "Seleccione", value: null, disabled: true }];
        for (let i in data) {
          con = data[i];
          this.consorcioList.push({ label: con.consorcio, value: con });
        }
      });

  }

  cargarTipoPozoList() {
    this.crearPortafolioService.findTipoPozoList().subscribe((data: TipoPozo[]) => {
      let tp: TipoPozo;
      this.tipoPozoList = [{ label: "Seleccione", value: null, disabled: true }];
      for (let i in data) {
        tp = data[i];
        this.tipoPozoList.push({ label: tp.tipoPozo, value: tp });
      }
    });
  }


  cargarNumeroList() {
    for (let i: number = 0; i < 10; i++) {
      this.numeroList.push({ label: i.toString(), value: i });
    }
  }

  cargarCampoPozo(campo: Campo) {
    this.bloque.bqlNombre = "n/a";
    this.operadora.cexApellidoPaterno = "n/a";
    this.cargarBloqueByBlqCodigo(campo);
    this.cargarPozosByCamCodigo(campo);
  }

  cargarOperadoraByPozCompaniaPetrolera(pozo: Pozo) {

    this.operadora.cexApellidoPaterno = "n/a";
    if (pozo.pozCompaniaPetrolera) {
      this.loading = true;
      this.crearPortafolioService.findOperadoraByCompaniaPetrolera(pozo.pozCompaniaPetrolera).subscribe(
        (data: Operadora) => {
          if (data) {
            this.operadora = data;
          }
          this.loading = false;
        });
    }
  }

  campoTst: boolean = false;
  campoNumero: boolean = true;
  verificacionTipoTrabajo(tipoTrabajo: TipoTrabajo) {
    if (tipoTrabajo.codigoTipoTrabajo == 3) {
      this.campoTst = true;
    }
    if (tipoTrabajo.codigoTipoTrabajo == 2) {
      this.campoNumero = true;
      this.campoTst = false;
      this.portafolio.fechaTrabajoSinTorre = null;
    }

    if (tipoTrabajo.codigoTipoTrabajo == 1) {
      this.campoNumero = false;
      this.campoTst = false;
      this.portafolio.fechaTrabajoSinTorre = null;
    }
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
  cargarBloqueByBlqCodigo(campo: Campo) {
    this.bloque.bqlNombre = "n/a";
    this.loading = true;
    if (campo.bqlCodigo) {
      this.loading = true;
      this.crearPortafolioService.findBloque(campo.bqlCodigo).subscribe(
        (data: Bloque) => {
          if (data) {
            this.bloque = data;
          }
          this.loading = false;
        });
    }

  }


  guardarPortafolio() {
    this.loading = true;
    this.portafolio.codigoConsorcio = this.consorcio.codigoConsorcio;
    this.portafolio.codigoTipoTrabajo = this.tipoTrabajo.codigoTipoTrabajo;
    this.portafolio.codigoTipoPozo = this.tipoPozo.codigoTipoPozo;
    this.portafolio.cexCodigo = this.operadora.cexCodigo;
    this.portafolio.bqlCodigo = this.bloque.blqCodigo;
    this.portafolio.camCodigo = this.portafolio.campo.camCodigo;
    this.portafolio.pozCodigo = this.pozo.pozCodigo;
    this.portafolio.numeroTrabajo = this.numeroTrabajo;
    this.portafolio.estado = this.estado;
    this.portafolio.fechaRegistro = this.today;
    this.portafolio.idUsuario = this.usuario.idUsuario;

    this.crearPortafolioService.transUpdatePortafolio(this.portafolio).subscribe(data => {

      if (data) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se actualizo el portafolio' });
        this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se pudo actualizar el portafolio' });

      }
    });

  }

  goToBuscarPortafolio() {
    this.busquedaService.portafolio = null;
    this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
  }

  anularPortafolio() {
    this.portafolio.estado = 0;
    this.crearPortafolioService.transUpdatePortafolio(this.portafolio).subscribe(data => {
      if (data) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se actualizo el portafolio' });
        this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
        this.confirmModalRef.hide();
      } else {
        this.loading = false;
        this.confirmModalRef.hide();
        this.messageService.add({ severity: 'info', detail: 'No se pudo actualizar el portafolio' });
      }
    });
  }

  openConfirmModal(template: TemplateRef<any>) {
    this.confirmModalRef = this.modalService.show(template);
  }


}
