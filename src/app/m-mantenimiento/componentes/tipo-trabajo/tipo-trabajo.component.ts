import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TipoTrabajo } from 'src/app/entidades/tipo-trabajo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { MantenimientoService } from '../../servicios/mantenimiento.service';

@Component({
  selector: 'app-tipo-trabajo',
  templateUrl: './tipo-trabajo.component.html',
  styleUrls: ['./tipo-trabajo.component.css']
})
export class TipoTrabajoComponent implements OnInit {

  public loading = false;
  usuario: Usuario;

  searchText: string;

  page_size: number = 10;
  page_number: number = 1;

  page_size2: number = 10;
  page_number2: number = 1;

  tipoTrabajoList: TipoTrabajo[] = [];
  tipoTrabajo: TipoTrabajo = new TipoTrabajo;
  tipoTrabajoEdit: TipoTrabajo = new TipoTrabajo;

  tipoTrabajoModalRef: BsModalRef;
  tipoTrabajoEditModalRef: BsModalRef;

  constructor(public mantenimientoService: MantenimientoService, public messageService: MessageService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getTipoTrabajoList();
  }

  getTipoTrabajoList() {
    this.mantenimientoService.findTipoTrabajoList().subscribe((data: TipoTrabajo[]) => {
      this.tipoTrabajoList = data;
    });
  }

  openNewModal(template: TemplateRef<any>) {
    this.tipoTrabajoModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeNewModal() {
    this.tipoTrabajoModalRef.hide();
  }

  openEditModal(template: TemplateRef<any>, tipoTrabajo: TipoTrabajo) {
    this.tipoTrabajoEdit = tipoTrabajo;
    this.tipoTrabajoEditModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeEditModal() {
    this.tipoTrabajoEditModalRef.hide();
  }

}
