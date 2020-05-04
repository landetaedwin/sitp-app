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
  documentoMinisterioEdit: DocumentoMinisterio = new DocumentoMinisterio;
  documentoModalRef: BsModalRef;
  maxDate: Date;
  minDate: Date;
  docNroOficio: Archivo = new Archivo;
  anexo1: Archivo = new Archivo;
  asuntoList: SelectItem[] = [];
  asunto: Asunto;
  nResol: boolean = false;
  documentoEditRef: BsModalRef;

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
    this.getAsuntoList();
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
    this.asuntoList = [];
    this.documentoMinisterio = new DocumentoMinisterio;
    this.getAsuntoList();
    this.documentoModalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static', keyboard: false });
  }

  goToBuscarPortafolio() {
    this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
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
      this.nResol = false;
    } else {
      this.nResol = true;
    }
  }

  guardar() {
    let errores: string[] = [];
    if (!this.documentoMinisterio.numeroSGC) {
      errores.push("El campo Nro. SGC es requerido");
    }
    if (!this.documentoMinisterio.numeroOficio) {
      errores.push("El campo Nro. Oficio es requerido");
    }

    if (!this.documentoMinisterio.fechaOficio) {
      errores.push("El campo fecha oficio es requerido");
    }

    if (!this.asunto) {
      errores.push("El campo asunto es requerido");
    }

    if (!this.nResol) {
      if (!this.documentoMinisterio.numeroResolucion) {
        errores.push("El campo Nro. Resolucion es requerido");
      }
    }
    if (!this.documentoMinisterio.objetivo) {
      errores.push("El campo objetivo es requerido");
    }

    if (errores.length <= 0) {
      this.loading = true;
      this.documentoMinisterio.codigoPortafolio = this.portafolio.codigoPortafolio;
      this.documentoMinisterio.idUsuario = this.usuario.idUsuario;
      this.documentoMinisterio.estado = 1;


      this.documentoMinisterio.codigoAsunto = this.asunto.codigoAsunto;
      if (this.documentoMinisterio.fechaOficio) {
        this.documentoMinisterio.fechaOficio = new Date(this.documentoMinisterio.fechaOficio);
      }
      if (this.documentoMinisterio.fechaRegistro) {
        this.documentoMinisterio.fechaRegistro = new Date(this.documentoMinisterio.fechaRegistro);
      }

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
          this.asunto = null;
          this.closeModalDocumento();

        } else {
          this.loading = false;
          this.messageService.add({ severity: 'info', detail: 'No se pudo agregar el documento de ministerio' });
        }

      }, err => {
        this.messageService.add({ severity: 'error', detail: 'Error en el servidor' });
      })


    } else {

      for (let i: number = 0; i < errores.length; i++) {
        this.messageService.add({ severity: 'error', detail: errores[i] });
      }

    }


  }

  editarDocumento() {

    let errores: string[] = [];

    if (!this.documentoMinisterioEdit.numeroSGC) {
      errores.push("El campo Nro. SGC es requerido");
    }
    if (!this.documentoMinisterioEdit.numeroOficio) {
      errores.push("El campo Nro. Oficio es requerido");
    }

    if (!this.documentoMinisterioEdit.fechaOficio) {
      errores.push("El campo fecha oficio es requerido");
    }

    if (!this.asunto) {
      errores.push("El campo asunto es requerido");
    }

    if (!this.documentoMinisterioEdit.numeroResolucion) {
      errores.push("El campo Nro. Resolucion es requerido");
    }
    if (!this.documentoMinisterioEdit.objetivo) {
      errores.push("El campo objetivo es requerido");
    }


    if (errores.length <= 0) {
      this.loading = true;
      this.documentoMinisterioEdit.idUsuario = this.usuario.idUsuario;

      this.documentoMinisterioEdit.codigoAsunto = this.asunto.codigoAsunto;
      if (this.documentoMinisterioEdit.fechaOficio) {
        this.documentoMinisterioEdit.fechaOficio = new Date(this.documentoMinisterioEdit.fechaOficio);
      }
      if (this.documentoMinisterioEdit.fechaRegistro) {
        this.documentoMinisterioEdit.fechaRegistro = new Date(this.documentoMinisterioEdit.fechaRegistro);
      }

      this.documentoMinisterioEdit.fileOficio = new Archivo;
      this.documentoMinisterioEdit.fileAnexo1 = new Archivo;

      if (this.docNroOficio.base64) {
        this.documentoMinisterioEdit.fileOficio.nombre = this.docNroOficio.nombre;
        this.documentoMinisterioEdit.fileOficio.base64 = this.docNroOficio.base64.substring(28);
      }
      if (this.anexo1.base64) {
        this.documentoMinisterioEdit.fileAnexo1.nombre = this.anexo1.nombre;
        this.documentoMinisterioEdit.fileAnexo1.base64 = this.anexo1.base64.substring(28);
      }

      this.dataApi.transUpdateDocumentoMinisterio(this.documentoMinisterioEdit).subscribe(res => {
        if (res) {
          this.getDocumentoMinisterioList();
          this.loading = false;
          this.messageService.add({ severity: 'success', detail: 'Se actualizo el documento de ministerio' });
          this.asunto = null;
          this.closeModalDocumentoEdit();

        } else {
          this.loading = false;
          this.messageService.add({ severity: 'info', detail: 'No se pudo actualizar el documento de ministerio' });
        }

      })


    } else {

      for (let i: number = 0; i < errores.length; i++) {
        this.messageService.add({ severity: 'error', detail: errores[i] });
      }

    }




  }

  showPdf(doc: string, name: string) {
    const linkSource = 'data:application/pdf;base64,' + doc;
    const downloadLink = document.createElement("a");
    const fileName = name + ".pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  openModalDocumentoEdit(template: TemplateRef<any>, document: DocumentoMinisterio) {
    this.loading = true
    this.documentoMinisterioEdit = this.cloneJSON(document)
    setTimeout(() => {
      this.getAsuntoList();
      this.documentoEditRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static', keyboard: false });
      this.asunto = this.documentoMinisterioEdit.asunto;
      if (this.documentoMinisterioEdit.fechaOficio) {
        this.documentoMinisterioEdit.fechaOficio = new Date(this.documentoMinisterioEdit.fechaOficio)
      }
    }, 2000);



  }

  closeModalDocumentoEdit() {
    this.documentoEditRef.hide();
  }

  cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
  }



  anularDocumento() {
    debugger
    this.loading = true;
    this.documentoMinisterioEdit.idUsuario = this.usuario.idUsuario;
    this.documentoMinisterioEdit.estado = 0;
    if (this.documentoMinisterioEdit.fechaRegistro) {
      this.documentoMinisterioEdit.fechaRegistro = new Date(this.documentoMinisterioEdit.fechaRegistro);
    }
    if (this.documentoMinisterioEdit.fechaOficio) {
      this.documentoMinisterioEdit.fechaOficio = new Date(this.documentoMinisterioEdit.fechaOficio);
    }


    this.dataApi.transUpdateDocumentoMinisterio(this.documentoMinisterioEdit).subscribe(data => {
      if (data) {
        this.getDocumentoMinisterioList()
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se anulo el documento de operadora' });
        this.asunto = null;
        this.closeModalDocumentoEdit();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se pudo anular el documento de operadora' });
      }

    });
  }
  confirmModalRef: BsModalRef;

  openConfirmModal(template: TemplateRef<any>, document: DocumentoMinisterio) {
    this.documentoMinisterioEdit = document;
    this.confirmModalRef = this.modalService.show(template);
  }


}
