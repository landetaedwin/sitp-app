import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Asunto } from 'src/app/entidades/asunto';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { MantenimientoService } from '../../servicios/mantenimiento.service';


@Component({
  selector: 'app-asunto',
  templateUrl: './asunto.component.html',
  styleUrls: ['./asunto.component.css']
})
export class AsuntoComponent implements OnInit {

  public loading = false;
  usuario: Usuario;

  searchText: string;

  page_size: number = 10;
  page_number: number = 1;

  page_size2: number = 10;
  page_number2: number = 1;

  asuntoList: Asunto[] = [];
  asunto: Asunto = new Asunto;
  asuntoEdit: Asunto = new Asunto;

  asuntoModalRef: BsModalRef;
  asuntoEditModalRef: BsModalRef;

  constructor(public mantenimientoService: MantenimientoService, public messageService: MessageService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getAsuntoList();
  }

  getAsuntoList() {
    this.mantenimientoService.findAsuntoList().subscribe((data: Asunto[]) => {
      this.asuntoList = data;
    });
  }

  openNewModal(template: TemplateRef<any>) {
    this.asunto = new Asunto;
    this.asuntoModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeNewModal() {
    this.asuntoModalRef.hide();
  }

  openEditModal(template: TemplateRef<any>, asunto: Asunto) {
    this.asuntoEdit = asunto;
    this.asuntoEditModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeEditModal() {
    this.asuntoEditModalRef.hide();
  }

  save() {
    this.loading = true;
    debugger
    this.asunto.estado = 1;
    this.asunto.fechaRegistro = new Date();
    this.mantenimientoService.onSaveAsunto(this.asunto).subscribe(res => {
      this.closeNewModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se creo correctamente el asunto' });
    })
  }

  update() {
    this.loading = true;
    this.asuntoEdit.fechaRegistro = new Date(this.asuntoEdit.fechaRegistro);
    this.mantenimientoService.onUpdateAsunto(this.asuntoEdit).subscribe(res => {
      this.closeEditModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se actualizo correctamente el asunto' });
    })
  }

  anular(asuntoAnular: Asunto) {
    this.loading = true;
    this.asuntoEdit = asuntoAnular;
    this.asuntoEdit.estado = 0;
    this.asuntoEdit.fechaRegistro = new Date(this.asuntoEdit.fechaRegistro);
    this.mantenimientoService.onUpdateAsunto(this.asuntoEdit).subscribe(res => {
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se anulo correctamente el asunto' });
    })
  }

}
