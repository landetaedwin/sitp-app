import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService, SelectItem } from 'primeng/api';
import { Categoria } from 'src/app/entidades/categoria';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Constantes } from 'src/app/resources/constantes';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';

@Component({
  selector: 'app-documento-operadora',
  templateUrl: './documento-operadora.component.html',
  styleUrls: ['./documento-operadora.component.css']
})
export class DocumentoOperadoraComponent implements OnInit {
  public loading = false;
  usuario: Usuario;
  portafolio: Portafolio = new Portafolio;

  categoriaList: SelectItem[] = [];
  categoria: Categoria;

  documentoModalRef: BsModalRef;
  pdfModalRef: BsModalRef;

  docNroOficio: File;
  anexo1: File;
  anexo2: File;
  anexo3: File;
  anexo4: File;
  docPagos: File;



  constructor(public loginService: LoginService, public cs: Constantes, public busquedaService: BusquedaService, public messageService: MessageService, public router: Router, private modalService: BsModalService) {
    this.categoriaList = [{ label: "Seleccione", value: null, disabled: true }];

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

    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  getListCategoriaByCodigoTipoTrabajo() {
    debugger
    this.busquedaService.getCategoriaListByCodigoTipoTrabajo(this.portafolio.codigoTipoTrabajo).subscribe((data: Categoria[]) => {
      let c: Categoria;
      for (let i in data) {
        c = data[i];
        this.categoriaList.push({ label: c.categoria, value: c });
      }
      this.loading = false;

    })

  }

  openModalDocumeto(template: TemplateRef<any>) {
    this.getListCategoriaByCodigoTipoTrabajo();
    this.documentoModalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static', keyboard: false });
  }

  closeModalDocumento() {
    this.documentoModalRef.hide();
  }


  openModalPDF(template: TemplateRef<any>) {
    debugger
    this.pdfModalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static', keyboard: false });
  }

  closeModalPDF() {
    this.pdfModalRef.hide();
  }

  onChangeDocNroOficio(event) {
    const file = event.target.files[0];
    this.docNroOficio = file;
  }

  onChangeAnexo1(event) {
    const file = event.target.files[0];
    this.anexo1 = file;
  }

  onChangeAnexo2(event) {
    const file = event.target.files[0];
    this.anexo2 = file;
  }

  onChangeAnexo3(event) {
    const file = event.target.files[0];
    this.anexo3 = file;
  }

  onChangeAnexo4(event) {
    const file = event.target.files[0];
    this.anexo4 = file;
  }

  onChangeDocPagos(event) {
    const file = event.target.files[0];
    this.docPagos = file;
  }

  imprimir() {
    console.log(this.docNroOficio)


  }
}
