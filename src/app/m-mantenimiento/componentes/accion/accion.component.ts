import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Accion } from 'src/app/entidades/accion';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { AccionService } from '../../servicios/accion.service';


@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrls: ['./accion.component.css']
})
export class AccionComponent implements OnInit {

  public loading = false;
  usuario: Usuario;

  searchText: string;

  page_size: number = 10;
  page_number: number = 1;

  page_size2: number = 10;
  page_number2: number = 1;

  accionList: Accion[] = [];
  accion: Accion = new Accion;
  accionEdit: Accion = new Accion;

  accionModalRef: BsModalRef;
  accionEditModalRef: BsModalRef;

  constructor(public accionService: AccionService, public messageService: MessageService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getAccionList();
  }

  getAccionList() {
    this.accionService.findAccionList().subscribe((data: Accion[]) => {
      this.accionList = data;
    });
  }

  openNewModal(template: TemplateRef<any>) {
    this.accion = new Accion;
    this.accionModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeNewModal() {
    this.accionModalRef.hide();
  }

  openEditModal(template: TemplateRef<any>, accion: Accion) {
    this.accionEdit = accion;
    this.accionEditModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeEditModal() {
    this.accionEditModalRef.hide();
  }

  save() {
    this.loading = true;
    this.accion.estado = 1;
    //this.asunto.fechaRegistro = new Date();
    this.accionService.onSaveAccion(this.accion).subscribe(res => {
      this.closeNewModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se creo correctamente la accion' });
    })
  }

  update() {
    this.loading = true;
    //this.accionEdit.fechaRegistro = new Date(this.accionEdit.fechaRegistro);
    this.accionService.onUpdateAccion(this.accionEdit).subscribe(res => {
      this.closeEditModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se actualizo correctamente la accion' });
    })
  }

  anular(accionAnular: Accion) {
    this.loading = true;
    this.accionEdit = accionAnular;
    this.accionEdit.estado = 0;
    //this.accionEdit.fechaRegistro = new Date(this.accionEdit.fechaRegistro);
    this.accionService.onUpdateAccion(this.accionEdit).subscribe(res => {
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se anulo correctamente la accion' });
    })
  }

}
