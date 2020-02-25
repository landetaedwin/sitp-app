import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService, SelectItem } from 'primeng/api';
import { Archivo } from 'src/app/entidades/archivo';
import { Bloque } from 'src/app/entidades/bloque';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { Campo } from 'src/app/entidades/campo';
import { Operadora } from 'src/app/entidades/operadora';
import { Pozo } from 'src/app/entidades/pozo';
import { Tasa } from 'src/app/entidades/tasa';
import { Yacimiento } from 'src/app/entidades/yacimiento';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';
import { CreateUpdateService } from '../../servicios/create-update.service';

@Component({
  selector: 'app-registro-tasas',
  templateUrl: './registro-tasas.component.html',
  styleUrls: ['./registro-tasas.component.css']
})
export class RegistroTasasComponent implements OnInit {
  public loading = false;

  usuario: Usuario;
  campoList: SelectItem[] = [];
  campo: Campo;
  pozoList: SelectItem[] = [];
  pozo: Pozo;
  yacimientoList: SelectItem[] = [];
  yacimientoT: Yacimiento;
  tasa: Tasa = new Tasa;
  tasaEdit: Tasa = new Tasa;
  tasaAnular: Tasa = new Tasa;
  campoT: Campo;
  pozoT: Pozo;
  operadoraT: Operadora = new Operadora;
  bloqueT: Bloque = new Bloque;
  docNroOficio: Archivo = new Archivo;
  docResolucion: Archivo = new Archivo;
  tasaList: Tasa[] = [];

  registroTasaModalRef: BsModalRef;
  maxDate: Date;
  minDate: Date;

  estadolist: SelectItem[] = [];
  estado: number;

  param: BusquedaParametros = new BusquedaParametros;

  constructor(public loginService: LoginService, public router: Router, private busquedaService: BusquedaService, private modalService: BsModalService, private dataApi: CreateUpdateService, private messageService: MessageService) {
    this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];

    this.estadolist = [
      { label: "Seleccione", value: null, disabled: true },
      { label: "Activo", value: 1, disabled: false },
      { label: "Derogado", value: 0, disabled: false }]


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

  getTasaList() {
    this.loading = true;
    this.tasaList = [];
    debugger
    if (this.pozo) {
      this.param.pozo = this.pozo.pozCodigo;
    }
    if (this.campo) {
      this.param.campo = this.campo.camCodigo;
    }

    this.param.estado = this.estado;

    this.busquedaService.getTasaList(this.param).subscribe((data: Tasa[]) => {

      if (data.length > 0) {

        let dataAux: Tasa[] = [];

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

        this.tasaList = dataAux;
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

  getYacimientoList() {
    this.busquedaService.getYacimientoList().subscribe(
      (data: Yacimiento[]) => {
        let c: Yacimiento;
        this.yacimientoList = [{ label: "Seleccione", value: null, disabled: true }];
        for (let i in data) {
          c = data[i];
          this.yacimientoList.push({ label: c.yacimiento, value: c });
        }
        this.loading = false;
      });
  }

  getPozoListByCamCodigo(campo: Campo) {
    if (campo.camCodigo) {
      this.cargarBloqueByBlqCodigo(campo);
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

  cargarOperadoraByPozCompaniaPetrolera(pozo: Pozo) {
    this.operadoraT.cexApellidoPaterno = "n/a";
    this.loading = true;
    debugger
    if (pozo.pozCompaniaPetrolera) {
      this.loading = true;
      this.busquedaService.getOperadoraByCompaniaPetrolera(pozo.pozCompaniaPetrolera).subscribe(
        (data: Operadora) => {
          if (data) {
            this.operadoraT = data;
          }
          this.loading = false;
        });
    }
  }

  cargarBloqueByBlqCodigo(campo: Campo) {
    this.bloqueT.bqlNombre = "n/a";
    this.loading = true;
    if (campo.blqCodigo) {
      this.loading = true;
      this.busquedaService.getBloqueByBloqueCodigo(campo.blqCodigo).subscribe(
        (data: Bloque) => {
          if (data) {
            this.bloqueT = data;
          }
          this.loading = false;
        });
    }
  }

  cargarCampoPozo(campo: Campo) {
    this.operadoraT.cexApellidoPaterno = "n/a";
    this.cargarBloqueByBlqCodigo(campo);
    this.getPozoListByCamCodigo(campo);
  }


  onChangeDocNroOficio(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._onChangeDocNroOficio.bind(this);
    reader.readAsDataURL(file);
    this.docNroOficio.nombre = file.name;
  }
  _onChangeDocNroOficio(e) {
    let reader = e.target;
    this.docNroOficio.base64 = reader.result;
  }

  onChangeResolucion(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._onChangeResolucion.bind(this);
    reader.readAsDataURL(file);
    this.docResolucion.nombre = file.name;
  }
  _onChangeResolucion(e) {
    let reader = e.target;
    this.docResolucion.base64 = reader.result;
  }

  openModalTasa(template: TemplateRef<any>) {
    this.getCampoList();
    this.getYacimientoList()
    this.tasa = new Tasa;
    this.campoT = new Campo;
    this.pozoT = new Pozo;
    this.bloqueT = new Bloque;
    this.operadoraT = new Operadora;
    this.yacimientoT = new Yacimiento;
    this.bloqueT.bqlNombre = "n/a";
    this.operadoraT.cexApellidoPaterno = "n/a";
    this.registroTasaModalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static', keyboard: false });
  }

  closeModalTasa() {
    this.registroTasaModalRef.hide();
  }


  openModalTasaEdit(template: TemplateRef<any>, tasaEdit: Tasa) {
    debugger
    this.getCampoList();
    this.getYacimientoList();
    this.tasaEdit = this.cloneJSON(tasaEdit);
    this.cargarCampoPozo(tasaEdit.campo);
    this.campoT = tasaEdit.campo;
    this.pozoT = tasaEdit.pozo;
    this.bloqueT = tasaEdit.bloque;
    this.operadoraT = tasaEdit.operadora;
    this.yacimientoT = tasaEdit.yacimiento;
    this.tasaEdit.fechaOficio = new Date(tasaEdit.fechaOficio);
    this.tasaEdit.fechaResolucion = new Date(tasaEdit.fechaResolucion);


    this.registroTasaModalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static', keyboard: false });
  }

  closeModalTasaEdit() {
    this.registroTasaModalRef.hide();
  }

  openModalTasaAnular(template: TemplateRef<any>, tasaAnular: Tasa) {
    this.tasaAnular = this.cloneJSON(tasaAnular);
    this.registroTasaModalRef = this.modalService.show(template, { class: 'modal-sm', backdrop: 'static', keyboard: false });
  }

  closeModalTasaAnular() {
    this.registroTasaModalRef.hide();
  }

  saveTasa() {
    this.loading = true;
    this.tasa.camCodigo = this.campoT.camCodigo;
    this.tasa.pozCodigo = this.pozoT.pozCodigo;
    this.tasa.cexCodigo = this.operadoraT.cexCodigo;
    this.tasa.blqCodigo = this.bloqueT.blqCodigo;
    this.tasa.fileOficio = new Archivo;
    this.tasa.fileResolucion = new Archivo;


    this.tasa.pozo = this.pozoT;
    this.tasa.bloque = this.bloqueT;
    this.tasa.campo = this.campoT;



    if (this.docNroOficio.base64) {
      this.tasa.fileOficio.nombre = this.docNroOficio.nombre;
      this.tasa.fileOficio.base64 = this.docNroOficio.base64.substring(28);
    }
    if (this.docResolucion.base64) {
      this.tasa.fileResolucion.nombre = this.docResolucion.nombre;
      this.tasa.fileResolucion.base64 = this.docResolucion.base64.substring(28);
    }
    this.tasa.estado = 1;
    this.tasa.idUsuario = this.usuario.idUsuario;
    this.tasa.fechaRegistro = new Date();
    this.tasa.codigoYacimiento = this.yacimientoT.codigoYacimiento;


    this.dataApi.transCrearTasa(this.tasa).subscribe(data => {

      if (data == "La tasa ha sido creada correctamente") {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: '' + data });
        this.closeModalTasa();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: '' + data });
      }
    });


  }

  editTasa() {
    debugger
    this.loading = true;
    this.tasaEdit.camCodigo = this.campoT.camCodigo;
    this.tasaEdit.pozCodigo = this.pozoT.pozCodigo;
    this.tasaEdit.cexCodigo = this.operadoraT.cexCodigo;
    this.tasaEdit.blqCodigo = this.bloqueT.blqCodigo;
    this.tasaEdit.fileOficio = new Archivo;
    this.tasaEdit.fileResolucion = new Archivo;

    this.tasa.pozo = this.pozoT;
    this.tasa.bloque = this.bloqueT;
    this.tasa.campo = this.campoT;

    this.tasaEdit.fechaOficio = new Date(this.tasaEdit.fechaOficio)
    this.tasaEdit.fechaResolucion = new Date(this.tasaEdit.fechaResolucion)
    this.tasaEdit.fechaRegistro = new Date(this.tasaEdit.fechaRegistro)

    if (this.docNroOficio.base64) {
      this.tasaEdit.fileOficio.nombre = this.docNroOficio.nombre;
      this.tasaEdit.fileOficio.base64 = this.docNroOficio.base64.substring(28);
    }
    if (this.docResolucion.base64) {
      this.tasaEdit.fileResolucion.nombre = this.docResolucion.nombre;
      this.tasaEdit.fileResolucion.base64 = this.docResolucion.base64.substring(28);
    }
    this.tasaEdit.idUsuario = this.usuario.idUsuario;
    this.tasaEdit.fechaActualizacion = new Date();
    this.tasaEdit.codigoYacimiento = this.yacimientoT.codigoYacimiento;


    this.dataApi.transUpdateTasa(this.tasaEdit).subscribe(data => {

      if (data == "La tasa ha sido actualizada correctamente") {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: '' + data });
        this.closeModalTasa();
        this.getTasaList();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: '' + data });
      }
    });


  }

  anularTasa() {
    this.loading = true;
    debugger
    this.tasaAnular.fechaOficio = new Date(this.tasaEdit.fechaOficio)
    this.tasaAnular.fechaResolucion = new Date(this.tasaEdit.fechaResolucion)
    this.tasaAnular.fechaRegistro = new Date(this.tasaEdit.fechaRegistro)
    this.tasaAnular.idUsuario = this.usuario.idUsuario;
    this.tasaAnular.fechaActualizacion = new Date();
    this.tasaAnular.estado = 0;

    this.dataApi.transUpdateTasa(this.tasaAnular).subscribe(data => {

      if (data == "La tasa ha sido actualizada correctamente") {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: '' + data });
        this.closeModalTasa();
        this.getTasaList();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: '' + data });
      }
    });


  }

  cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
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
