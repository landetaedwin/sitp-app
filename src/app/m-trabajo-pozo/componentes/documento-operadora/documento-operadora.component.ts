import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService, SelectItem } from 'primeng/api';
import { Archivo } from 'src/app/entidades/archivo';
import { Categoria } from 'src/app/entidades/categoria';
import { DocumentoOperadora } from 'src/app/entidades/documentoOperadora';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Constantes } from 'src/app/resources/constantes';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';
import { CreateUpdateService } from '../../servicios/create-update.service';
import { Pago } from 'src/app/entidades/pago';
import { Asunto } from 'src/app/entidades/asunto';
import { VerificarFechasService } from 'src/app/m-trabajo-bitacora/servicios/verificar-fechas.service';


@Component({
  selector: 'app-documento-operadora',
  templateUrl: './documento-operadora.component.html',
  styleUrls: ['./documento-operadora.component.css']
})
export class DocumentoOperadoraComponent implements OnInit {
  public loading = false;
  usuario: Usuario;
  portafolio: Portafolio = new Portafolio;
  documentoOperadoraList: DocumentoOperadora[] = [];
  documentoOperadora: DocumentoOperadora = new DocumentoOperadora;
  pago: Pago = new Pago;
  pagoList: Pago[] = [];


  categoriaList: SelectItem[] = [];
  categoria: Categoria;

  documentoModalRef: BsModalRef;
  pagoModalRef: BsModalRef;
  pdfModalRef: BsModalRef;

  docNroOficio: Archivo = new Archivo;
  anexo1: Archivo = new Archivo;
  anexo2: Archivo = new Archivo;
  anexo3: Archivo = new Archivo;
  anexo4: Archivo = new Archivo;
  docPagos: Archivo = new Archivo;

  maxDate: Date;
  minDate: Date;

  minDateFA: Date;

  ntrans: boolean = false;
  ncomp: boolean = false;

  asuntoList: SelectItem[] = [];
  asunto: Asunto;



  constructor(public VerificarFechasService: VerificarFechasService, public loginService: LoginService, public cs: Constantes, public busquedaService: BusquedaService, public dataApi: CreateUpdateService, public messageService: MessageService, public router: Router, private modalService: BsModalService) {
    this.categoriaList = [{ label: "Seleccione", value: null, disabled: true }];
    this.asuntoList = [{ label: "Seleccione", value: null, disabled: true }];


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
    this.portafolio = this.busquedaService.portafolio;


    this.maxDate = new Date();
    this.minDate = new Date(2010, 0, 1);
    this.minDateFA = new Date(2010, 0, 1);
    this.getListDocumentoOperadora()


  }

  getAsuntoList() {
    this.busquedaService.getAsuntoList().subscribe((data: Asunto[]) => {
      let c: Asunto;
      this.asuntoList = [{ label: "Seleccione", value: null, disabled: true }];

      for (let i in data) {
        c = data[i];
        this.asuntoList.push({ label: c.asunto, value: c });
      }
      this.loading = false;
    })
  }

  getListDocumentoOperadora() {
    this.busquedaService.getDocumentoOperadoraByCodigoPortafolioList(this.portafolio.codigoPortafolio).subscribe((data: DocumentoOperadora[]) => {
      this.documentoOperadoraList = data;
      this.loading = false;
    });
  }

  getListCategoriaByCodigoTipoTrabajo() {

    this.busquedaService.getCategoriaListByCodigoTipoTrabajo(this.portafolio.codigoTipoTrabajo).subscribe((data: Categoria[]) => {
      let c: Categoria;
      this.categoriaList = [{ label: "Seleccione", value: null, disabled: true }];
      for (let i in data) {
        c = data[i];
        this.categoriaList.push({ label: c.categoria, value: c });
      }
      this.loading = false;

    })

  }

  openModalDocumeto(template: TemplateRef<any>) {
    this.documentoOperadora = new DocumentoOperadora;
    this.getAsuntoList();
    if (this.portafolio.codigoTipoTrabajo != 1) {
      this.getListCategoriaByCodigoTipoTrabajo();
    }
    this.documentoModalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static', keyboard: false });
  }

  closeModalDocumento() {
    this.documentoModalRef.hide();
  }

  openModalPagos(template: TemplateRef<any>, codigoDocumentoOperadora: number) {
    this.pago = new Pago;
    this.pago.codigoDocumentoOperadora = codigoDocumentoOperadora;
    this.pagoModalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static', keyboard: false });
  }

  closeModalPagos() {
    this.pagoModalRef.hide();
  }

  openModalPagosList(template: TemplateRef<any>, codigoDocumentoOperadora: number) {
    this.loading = true;
    this.busquedaService.getPagoListByCodigoDocumentoOperadora(codigoDocumentoOperadora).subscribe((data: Pago[]) => {
      if (data.length > 0) {
        this.pagoList = data;
        this.pagoModalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: 'static', keyboard: false });
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se encontraron pagos' });
      }

    });
  }

  closeModalPagosList() {
    this.pagoModalRef.hide();
  }



  // openModalPDF(template: TemplateRef<any>) {
  //   this.pdfModalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static', keyboard: false });
  // }

  // closeModalPDF() {
  //   this.pdfModalRef.hide();
  // }

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

  onChangeAnexo1(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._onChangeAnexo1.bind(this);
    reader.readAsDataURL(file);
    this.anexo1.nombre = file.name;
  }
  _onChangeAnexo1(e) {
    let reader = e.target;
    this.anexo1.base64 = reader.result;
  }

  onChangeAnexo2(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._onChangeAnexo2.bind(this);
    reader.readAsDataURL(file);
    this.anexo2.nombre = file.name;
  }
  _onChangeAnexo2(e) {
    let reader = e.target;
    this.anexo2.base64 = reader.result;
  }

  onChangeAnexo3(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._onChangeAnexo3.bind(this);
    reader.readAsDataURL(file);
    this.anexo3.nombre = file.name;
  }
  _onChangeAnexo3(e) {
    let reader = e.target;
    this.anexo3.base64 = reader.result;
  }

  onChangeAnexo4(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._onChangeAnexo4.bind(this);
    reader.readAsDataURL(file);
    this.anexo4.nombre = file.name;
  }
  _onChangeAnexo4(e) {
    let reader = e.target;
    this.anexo4.base64 = reader.result;
  }

  onChangeDocPagos(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._onChangeDocPagos.bind(this);
    reader.readAsDataURL(file);
    this.docPagos.nombre = file.name;

  }
  _onChangeDocPagos(e) {
    let reader = e.target;
    this.docPagos.base64 = reader.result;
  }

  guardar() {
    this.loading = true;
    this.documentoOperadora.codigoPortafolio = this.portafolio.codigoPortafolio;
    this.documentoOperadora.codigoCategoria = this.categoria.codigoCategoria;
    this.documentoOperadora.idUsuario = this.usuario.idUsuario;
    this.documentoOperadora.estado = 1;
    this.documentoOperadora.fechaRegistro = new Date();
    this.documentoOperadora.fechaOficio = new Date(this.documentoOperadora.fechaOficio);

    this.documentoOperadora.codigoAsunto = this.asunto.codigoAsunto;

    this.documentoOperadora.fileOficio = new Archivo;
    this.documentoOperadora.fileAnexo1 = new Archivo;
    this.documentoOperadora.fileAnexo2 = new Archivo;
    this.documentoOperadora.fileAnexo3 = new Archivo;
    this.documentoOperadora.fileAnexo4 = new Archivo;
    this.documentoOperadora.filePago = new Archivo;

    if (this.docNroOficio.base64) {
      this.documentoOperadora.fileOficio.nombre = this.docNroOficio.nombre;
      this.documentoOperadora.fileOficio.base64 = this.docNroOficio.base64.substring(28);
    }

    if (this.anexo1.base64) {
      this.documentoOperadora.fileAnexo1.nombre = this.anexo1.nombre;
      this.documentoOperadora.fileAnexo1.base64 = this.anexo1.base64.substring(28);
    }

    if (this.anexo2.base64) {
      this.documentoOperadora.fileAnexo2.nombre = this.anexo2.nombre;
      this.documentoOperadora.fileAnexo2.base64 = this.anexo2.base64.substring(28);
    }

    if (this.anexo3.base64) {
      this.documentoOperadora.fileAnexo3.nombre = this.anexo3.nombre;
      this.documentoOperadora.fileAnexo3.base64 = this.anexo3.base64.substring(28);
    }

    if (this.anexo4.base64) {
      this.documentoOperadora.fileAnexo4.nombre = this.anexo4.nombre;
      this.documentoOperadora.fileAnexo4.base64 = this.anexo4.base64.substring(28);
    }

    if (this.docPagos.base64) {
      this.documentoOperadora.filePago.nombre = this.docPagos.nombre;
      this.documentoOperadora.filePago.base64 = this.docPagos.base64.substring(28);
    }

    this.dataApi.transCrearDocumentoOperadora(this.documentoOperadora).subscribe(data => {
      if (data) {
        this.getListDocumentoOperadora()
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se agrego el documento de operadora' });
        this.asunto = null;
        this.categoria = null;
        this.closeModalDocumento();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se pudo agregar el documento de operadora' });
      }

    });
  }


  guardarPago() {
    this.loading = true;
    this.pago.estado = 1;
    this.pago.idUsuario = this.usuario.idUsuario;
    this.pago.fechaRegistro = new Date();

    this.dataApi.transCrearPago(this.pago).subscribe(res => {
      if (res) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se agrego el pago' });
        this.closeModalPagos();
      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se pudo agregar el pago' });
      }

    });

  }

  changeFechaOficio() {
    this.minDateFA = this.documentoOperadora.fechaOficio;
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



}
