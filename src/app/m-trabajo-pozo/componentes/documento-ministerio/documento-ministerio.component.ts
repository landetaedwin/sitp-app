import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService, SelectItem } from 'primeng/api';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Constantes } from 'src/app/resources/constantes';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';
import { Archivo } from 'src/app/entidades/archivo';
import { Asunto } from 'src/app/entidades/asunto';
import { DocumentoMinisterio } from 'src/app/entidades/documentoMinisterio';
import { CreateUpdateService } from '../../servicios/create-update.service';

@Component({
  selector: 'app-documento-ministerio',
  templateUrl: './documento-ministerio.component.html',
  styleUrls: ['./documento-ministerio.component.css']
})
export class DocumentoMinisterioComponent implements OnInit {

  public loading = false;
  usuario: Usuario;
  portafolio: Portafolio = new Portafolio;
  documentoMinisterio: DocumentoMinisterio = new DocumentoMinisterio;
  documentoMinisterioList: DocumentoMinisterio[] = [];


  documentoModalRef: BsModalRef;
  maxDate: Date;
  minDate: Date;

  docNroOficio: Archivo = new Archivo;
  anexo1: Archivo = new Archivo;

  asuntoList: SelectItem[] = [];
  asunto: Asunto;

  nResol: boolean = false;


  constructor(public loginService: LoginService, public cs: Constantes, public messageService: MessageService, public router: Router, public buscarService: BusquedaService, private dataApi: CreateUpdateService, private modalService: BsModalService) {
    this.asuntoList = [{ label: "Seleccione", value: null, disabled: true }];

  }
  ngOnInit() {

    this.loading = true;
    this.usuario = this.loginService.sessionValue;

    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
    if (!this.buscarService.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
    }
    this.portafolio = this.buscarService.portafolio;
    this.maxDate = new Date();
    this.minDate = new Date(2010, 0, 1);
    this.getDocumentoMinisterioList();

  }

  getDocumentoMinisterioList() {
    this.buscarService.getDocumentoMinisterioByCodigoPortafolioList(this.portafolio.codigoPortafolio).subscribe((data: DocumentoMinisterio[]) => {
      this.documentoMinisterioList = data;
      this.loading = false;

    });
  }

  getAsuntoList() {
    this.buscarService.getAsuntoList().subscribe((data: Asunto[]) => {
      let c: Asunto;
      for (let i in data) {
        c = data[i];
        this.asuntoList.push({ label: c.asunto, value: c });
      }
      this.loading = false;
    })
  }

  openModalDocumeto(template: TemplateRef<any>) {
    this.loading = true;
    this.getAsuntoList();
    this.documentoModalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static', keyboard: false });
  }

  closeModalDocumento() {
    this.documentoModalRef.hide();
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

  descativarNresolucion(asunto: Asunto) {
    debugger
    if (asunto.codigoAsunto == 5 || asunto.codigoAsunto == 6) {
      this.nResol = true;
    } else {
      this.nResol = false;
    }

  }


  guardar() {

    this.loading = true;
    this.documentoMinisterio.codigoPortafolio = this.portafolio.codigoPortafolio;
    this.documentoMinisterio.idUsuario = this.usuario.idUsuario;
    this.documentoMinisterio.estado = 1;
    this.documentoMinisterio.fechaRegistro = new Date();
    this.documentoMinisterio.asunto = this.asunto.codigoAsunto;
    this.documentoMinisterio.fechaOficio = new Date(this.documentoMinisterio.fechaOficio);

    this.documentoMinisterio.fileOficio = new Archivo;
    this.documentoMinisterio.fileAnexo1 = new Archivo;

    if (this.docNroOficio.base64) {
      this.documentoMinisterio.fileOficio.nombre = this.docNroOficio.nombre;
      this.documentoMinisterio.fileOficio.base64 = this.docNroOficio.base64.substring(28);
    }
    if (this.anexo1.base64) {
      this.documentoMinisterio.fileAnexo1.nombre = this.anexo1.nombre;
      this.documentoMinisterio.fileAnexo1.base64 = this.anexo1.base64.substring(28);
    }

    this.dataApi.transCrearDocumentoMinisterio(this.documentoMinisterio).subscribe(res => {
      if (res) {
        this.getDocumentoMinisterioList();
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se agrego el documento de ministerio' });
        this.closeModalDocumento();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se pudo agregar el documento de ministerio' });
      }

    })


  }

}
