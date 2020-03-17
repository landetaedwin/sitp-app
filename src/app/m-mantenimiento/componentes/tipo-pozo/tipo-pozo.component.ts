import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TipoPozo } from 'src/app/entidades/tipo-pozo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { MantenimientoService } from '../../servicios/mantenimiento.service';

@Component({
  selector: 'app-tipo-pozo',
  templateUrl: './tipo-pozo.component.html',
  styleUrls: ['./tipo-pozo.component.css']
})
export class TipoPozoComponent implements OnInit {

  public loading = false;
  usuario: Usuario;

  searchText: string;

  page_size: number = 10;
  page_number: number = 1;

  page_size2: number = 10;
  page_number2: number = 1;

  tipoPozoList: TipoPozo[] = [];
  tipoPozo: TipoPozo = new TipoPozo;
  tipoPozoEdit: TipoPozo = new TipoPozo;

  tipoPozoModalRef: BsModalRef;
  tipoPozoEditModalRef: BsModalRef;


  constructor(public mantenimientoService: MantenimientoService, public messageService: MessageService, private modalService: BsModalService) {

  }

  ngOnInit() {
    this.getTipoPozoList();
  }

  getTipoPozoList() {
    this.mantenimientoService.findTipoPozoList().subscribe((data: TipoPozo[]) => {
      this.tipoPozoList = data;
    });
  }

  openNewModal(template: TemplateRef<any>) {
    this.tipoPozoModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeNewModal() {
    this.tipoPozoModalRef.hide();
  }

  openEditModal(template: TemplateRef<any>, tipoPozo: TipoPozo) {
    this.tipoPozoEdit = tipoPozo;
    this.tipoPozoEditModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeEditModal() {
    this.tipoPozoEditModalRef.hide();
  }

  saveTipoPozo() {
    this.loading = true;
    this.mantenimientoService.onSaveTipoPozo(this.tipoPozo).subscribe(res => {
      this.closeNewModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se creo correctamente' });

    })

  }

  updateTipoPozo() {
    this.mantenimientoService.onUpdateTipoPozo(this.tipoPozoEdit).subscribe(res => {
      this.closeEditModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se actualizo correctamente' });
    })

  }


}
