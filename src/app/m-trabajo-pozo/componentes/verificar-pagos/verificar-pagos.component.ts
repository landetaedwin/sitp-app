import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService, SelectItem } from 'primeng/api';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { Campo } from 'src/app/entidades/campo';
import { Pago } from 'src/app/entidades/pago';
import { Pozo } from 'src/app/entidades/pozo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';
import { CreateUpdateService } from '../../servicios/create-update.service';

@Component({
  selector: 'app-verificar-pagos',
  templateUrl: './verificar-pagos.component.html',
  styleUrls: ['./verificar-pagos.component.css']
})
export class VerificarPagosComponent implements OnInit {
  public loading = false;

  usuario: Usuario;
  campoList: SelectItem[] = [];
  campo: Campo;
  pozoList: SelectItem[] = [];
  pozo: Pozo;
  param: BusquedaParametros = new BusquedaParametros;

  estadolist: SelectItem[] = [];


  pagoList: Pago[] = []

  pago: Pago = new Pago;
  maxDate: Date;
  minDate: Date;
  pagoModalRef: BsModalRef;

  ntrans: boolean = false;
  ncomp: boolean = false;
  estado: number;


  constructor(private busquedaService: BusquedaService, private loginService: LoginService, private router: Router, private messageService: MessageService, private modalService: BsModalService, private dataApi: CreateUpdateService) {
    this.estadolist = [
      { label: "Seleccione ", value: null, disabled: false },
      { label: "Registrado", value: 1, disabled: false },
      { label: "Verificado ", value: 2, disabled: false },
      // { label: "Anulado ", value: 0, disabled: false },

    ];
  }

  ngOnInit() {
    this.loading = true;

    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }

    this.maxDate = new Date();
    this.minDate = new Date(2010, 0, 1);

    this.getCampoList();
  }

  getCampoList() {
    this.busquedaService.getCampoList().subscribe(
      (data: Campo[]) => {
        let c: Campo;
        this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
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

  getPagoList() {
    this.loading = true;
    this.pagoList = [];

    if (this.pozo) {
      this.param.pozo = this.pozo.pozCodigo;
    }
    if (this.campo) {
      this.param.campo = this.campo.camCodigo;
    }
    this.param.estado = this.estado;
    this.busquedaService.getPagoList(this.param).subscribe((data: Pago[]) => {
      if (data.length > 0) {
        this.pagoList = data;
        this.param.pozo = null;
        this.param.campo = null;
        this.campo = null;
        this.pozo = null;
        this.estado = null;
        this.param = new BusquedaParametros;
        this.loading = false;
      } else {
        this.messageService.add({ severity: 'info', detail: 'No se encontraron datos' });
        this.param.pozo = null;
        this.param.campo = null;
        this.campo = null;
        this.pozo = null;
        this.estado = null;
        this.param = new BusquedaParametros;
        this.loading = false;
      }


    })
  }

  openModalPagos(template: TemplateRef<any>, pago: Pago) {
    this.pago = new Pago;
    this.pago = this.cloneJSON(pago);
    this.pago.fechaPago = new Date(this.pago.fechaPago);

    if (this.pago.numeroComprobante) {
      this.ntrans = true;
      this.ncomp = false;
    }
    if (this.pago.numeroTransaccion) {
      this.ncomp = true;
      this.ntrans = false;

    }


    this.pagoModalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static', keyboard: false });
  }

  closeModalPagos() {
    this.pagoModalRef.hide();
  }

  cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  bloquearTransferencia() {
    this.ntrans = true;
  }

  bloquearComprobante() {
    this.ncomp = true;
  }

  activarTransferencia() {
    if (this.pago.numeroComprobante.length == 0) {
      this.ntrans = false;
    }
  }

  activarComprobante() {
    if (this.pago.numeroTransaccion.length == 0) {
      this.ncomp = false;
    }
  }

  updatePago() {
    this.loading = true;
    this.pago.idUsuario = this.usuario.idUsuario;
    this.pago.fechaModificacion = new Date();
    this.pago.fechaRegistro = new Date(this.pago.fechaRegistro);
    this.pago.fechaPago = new Date(this.pago.fechaPago);
    this.pago.estado = 2;
    this.pago.documentoOperadora = null;
    debugger
    this.dataApi.transUpdatePago(this.pago).subscribe(res => {
      if (res) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: '' + "Se verifico correctamente el pago." });
        this.closeModalPagos();
        this.getPagoList();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: '' + "Error al verificar el pago." });
      }

    });
  }


  showPdf(doc: string, name: string) {
    const linkSource = 'data:application/pdf;base64,' + doc;
    const downloadLink = document.createElement("a");
    const fileName = name + ".pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
