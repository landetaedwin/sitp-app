import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Consorcio } from 'src/app/entidades/consorcio';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { MantenimientoService } from '../../servicios/mantenimiento.service';

@Component({
  selector: 'app-consorcios',
  templateUrl: './consorcios.component.html',
  styleUrls: ['./consorcios.component.css']
})
export class ConsorciosComponent implements OnInit {

  public loading = false;
  usuario: Usuario;

  searchText: string;

  page_size: number = 10;
  page_number: number = 1;

  page_size2: number = 10;
  page_number2: number = 1;



  consorcioList: Consorcio[] = [];
  consorcio: Consorcio = new Consorcio;
  consorcioEdit: Consorcio = new Consorcio;

  consorcioModalRef: BsModalRef;
  consorcioEditModalRef: BsModalRef;



  constructor(public mantenimientoService: MantenimientoService, public messageService: MessageService, private modalService: BsModalService) {

  }

  ngOnInit() {
    this.getTipoPozoList();
  }

  getTipoPozoList() {
    this.mantenimientoService.findConsorcioList().subscribe((data: Consorcio[]) => {
      this.consorcioList = data;
    });
  }

  openNewModal(template: TemplateRef<any>) {
    this.consorcio = new Consorcio;
    this.consorcioModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeNewModal() {
    this.consorcioModalRef.hide();
  }

  openEditModal(template: TemplateRef<any>, tipoPozo: Consorcio) {
    this.consorcioEdit = tipoPozo;
    this.consorcioEditModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeEditModal() {
    this.consorcioEditModalRef.hide();
  }

  save() {
    this.loading = true;
    this.consorcio.estado = 1;
    this.consorcio.fechaRegistro = new Date();
    this.mantenimientoService.onSaveConsorcio(this.consorcio).subscribe(res => {
      this.closeNewModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se creo correctamente' });

    })

  }

  update() {
    this.loading = true;
    this.consorcioEdit.fechaRegistro = new Date(this.consorcioEdit.fechaRegistro);
    this.mantenimientoService.onEditConsorcio(this.consorcioEdit).subscribe(res => {
      this.closeEditModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se actualizo correctamente' });
    })

  }

  anular(consorcioAnular:Consorcio) {
    this.loading = true;
    this.consorcioEdit = consorcioAnular;
    this.consorcioEdit.estado = 0;
    this.consorcioEdit.fechaRegistro = new Date(this.consorcioEdit.fechaRegistro);
    this.mantenimientoService.onEditConsorcio(this.consorcioEdit).subscribe(res => {
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se anulo correctamente' });
    })

  }


}
