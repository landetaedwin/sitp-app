import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService, SelectItem } from 'primeng/api';
import { Campo } from 'src/app/entidades/campo';
import { Categoria } from 'src/app/entidades/categoria';
import { HistorialPozo } from 'src/app/entidades/historialPozo';
import { Pozo } from 'src/app/entidades/pozo';
import { TipoTrabajo } from 'src/app/entidades/tipo-trabajo';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';
import { CreateUpdateService } from '../../servicios/create-update.service';
import { Usuario } from 'src/app/m-login/entidades/usuario';

@Component({
  selector: 'app-historial-pozo',
  templateUrl: './historial-pozo.component.html',
  styleUrls: ['./historial-pozo.component.css']
})
export class HistorialPozoComponent implements OnInit {
  public loading = false;
  usuario: Usuario;

  historialPozoModalRef: BsModalRef;
  minDate: Date;
  maxDate: Date;

  minDateF: Date;

  campoList: SelectItem[] = [];
  campo: Campo;
  pozoList: SelectItem[] = [];
  pozo: Pozo;
  tipoTrabajoList: SelectItem[] = [];
  tipoTrabajo: TipoTrabajo = new TipoTrabajo;
  categoriaList: SelectItem[] = [];
  categoria: Categoria;

  historialPozoList: HistorialPozo[] = [];
  historialPozo: HistorialPozo = new HistorialPozo;


  constructor(public loginService: LoginService, public messageService: MessageService, private busqueda: BusquedaService, private dataApi: CreateUpdateService, public router: Router, private modalService: BsModalService) {
    this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
  }

  ngOnInit() {

    this.loading = true;
    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }


    this.maxDate = new Date();
    this.minDate = new Date(2010, 0, 1);
    this.minDateF = new Date(2010, 0, 1);

    this.getHistorialPozoList();


  }

  getHistorialPozoList() {
    debugger
    this.busqueda.getHistorialPozoList().subscribe((data: HistorialPozo[]) => {
      this.historialPozoList = data;

      if (!data) {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No existen datos' });
      } else {
        let dataAux: HistorialPozo[] = [];
        for (let i: number = 0; i < data.length; i++) {

          if (!data[i].categoria) {
            data[i].categoria = new Categoria;
            data[i].categoria.codigoCategoria = null;
            data[i].categoria.categoria = "N/A";
          }
          dataAux.push(data[i]);
        }

        this.historialPozoList = dataAux;
        this.loading = false;

      }
    }, err => {
      console.log(err)
      this.loading = false;
    });

  }

  getCampoList() {
    this.busqueda.getCampoList().subscribe(
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
      this.busqueda.getPozoListByCamCodigo(campo.camCodigo).subscribe(
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

  getTipoTrabajoList() {
    this.busqueda.getTipoTrabajoList().subscribe(
      (data: TipoTrabajo[]) => {
        let tt: TipoTrabajo;
        for (let i in data) {
          tt = data[i];
          this.tipoTrabajoList.push({ label: tt.tipoTrabajo, value: tt });
        }

      });
  }

  getCategoriaByCodigoTipoTrabajo(tipoTrabajo: TipoTrabajo) {
    if (tipoTrabajo.codigoTipoTrabajo) {
      this.loading = true;
      this.busqueda.getCategoriaListByCodigoTipoTrabajo(tipoTrabajo.codigoTipoTrabajo).subscribe(
        (data: Categoria[]) => {
          let p: Categoria;
          this.categoriaList = [{ label: "Seleccione", value: null, disabled: true }];
          for (let i in data) {
            p = data[i];
            this.categoriaList.push({ label: p.categoria, value: p });
          }
          this.loading = false;
        });
    }

  }

  openModalHistorialPozo(template: TemplateRef<any>) {
    this.loading = true;
    this.historialPozo = new HistorialPozo;
    this.getCampoList();
    this.getTipoTrabajoList()
    this.historialPozoModalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static', keyboard: false });
  }

  closeModalHistorialPozo() {
    this.historialPozoModalRef.hide();
  }

  changeFechaFin() {
    this.minDateF = this.historialPozo.fechaInicio;
  }

  crearHistorialPozo() {


    let errores: string[] = [];

    if (!this.campo) {
      errores.push("El campo es requerido");
    }

    if (!this.pozo) {
      errores.push("El pozo es requerido");
    }

    if (!this.tipoTrabajo.codigoTipoTrabajo) {
      errores.push("El tipo de trabajo es requerido");
    }

    

    if (!this.historialPozo.fechaInicio) {
      errores.push("El campo fecha inicio es requerido");
    }

    if (!this.historialPozo.fechaInicio) {
      errores.push("El campo fecha fin es requerido");
    }

    if (this.tipoTrabajo.codigoTipoTrabajo && this.tipoTrabajo.codigoTipoTrabajo == 3) {
      if (!this.historialPozo.fechaTST) {
        errores.push("Fecha de trabajo sin torre es requerido");
      }
      if (!this.historialPozo.numero) {
        errores.push("El campo numero es requerido");
      }
    }


    if (errores.length <= 0) {
      this.loading = true;
      this.historialPozo.camCodigo = this.campo.camCodigo;
      this.historialPozo.pozCodigo = this.pozo.pozCodigo;
      this.historialPozo.codigoTipoTrabajo = this.tipoTrabajo.codigoTipoTrabajo;

      if (this.historialPozo.fechaTST) {
        this.historialPozo.fechaTST = new Date(this.historialPozo.fechaTST);
      }
      this.historialPozo.fechaInicio = new Date(this.historialPozo.fechaInicio);
      this.historialPozo.fechaFin = new Date(this.historialPozo.fechaFin);
      if (this.categoria) {
        this.historialPozo.codigoCategoria = this.categoria.codigoCategoria;
      }

      this.historialPozo.idUsuario = this.usuario.idUsuario;
      this.historialPozo.fechaRegistro = new Date();
      this.historialPozo.estado = 1;


      this.dataApi.transCrearHistorialPozo(this.historialPozo).subscribe(res => {
        if (res == "El historial de pozo ha sido creado correctamente") {
          this.loading = false;
          this.messageService.add({ severity: 'success', detail: '' + res });
          this.closeModalHistorialPozo();

        } else {
          this.loading = false;
          this.messageService.add({ severity: 'info', detail: '' + res });

        }
      });

    } else {

      for (let i: number = 0; i < errores.length; i++) {
        this.messageService.add({ severity: 'error', detail: errores[i] });
      }

    }






  }

}
