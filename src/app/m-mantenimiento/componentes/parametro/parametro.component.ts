import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Parametros } from 'src/app/entidades/parametro';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { ParametroService } from '../../servicios/parametro.service';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.css']
})
export class ParametroComponent implements OnInit {

  public loading = false;
  usuario: Usuario;

  searchText: string;

  page_size: number = 10;
  page_number: number = 1;

  page_size2: number = 10;
  page_number2: number = 1;

  parametroList: Parametros[] = [];
  parametro: Parametros = new Parametros;
  parametroEdit: Parametros = new Parametros;

  parametroModalRef: BsModalRef;
  parametroEditModalRef: BsModalRef;

  constructor(public parametroService: ParametroService, public messageService: MessageService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getParametroList();
  }

  getParametroList() {
    this.parametroService.findParametroList().subscribe((data: Parametros[]) => {
      this.parametroList = data;
    });
  }

  openNewModal(template: TemplateRef<any>) {
    this.parametro = new Parametros;
    this.parametroModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeNewModal() {
    this.parametroModalRef.hide();
  }

  openEditModal(template: TemplateRef<any>, parametro: Parametros) {
    this.parametroEdit = parametro;
    this.parametroEditModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeEditModal() {
    this.parametroEditModalRef.hide();
  }

  save() {
    this.loading = true;
    this.parametro.estado = 1;
    this.parametro.fechaRegistro = new Date();
    this.parametroService.onSaveParametro(this.parametro).subscribe(res => {
      this.closeNewModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se creo correctamente el parametro' });
    })
  }

  update() {
    this.loading = true;
    this.parametroEdit.fechaRegistro = new Date(this.parametroEdit.fechaRegistro);
    this.parametroService.onUpdateParametro(this.parametroEdit).subscribe(res => {
      this.closeEditModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se actualizo correctamente el parametro' });
    })
  }

  anular(parametroAnular: Parametros) {
    this.loading = true;
    this.parametroEdit = parametroAnular;
    this.parametroEdit.estado = 0;
    this.parametroEdit.fechaRegistro = new Date(this.parametroEdit.fechaRegistro);
    this.parametroService.onUpdateParametro(this.parametroEdit).subscribe(res => {
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se anulo correctamente el parametro' });
    })
  }

}
