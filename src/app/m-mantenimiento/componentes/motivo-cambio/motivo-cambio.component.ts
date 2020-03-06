import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { MotivoCambio } from 'src/app/entidades/motivo-cambio';
import { MotivoCambioService } from 'src/app/m-mantenimiento/servicios/motivo-cambio.service';


@Component({
  selector: 'app-motivo-cambio',
  templateUrl: './motivo-cambio.component.html',
  styleUrls: ['./motivo-cambio.component.css']
})
export class MotivoCambioComponent implements OnInit {

  public loading = false;
  usuario: Usuario;

  searchText: string;

  page_size: number = 10;
  page_number: number = 1;

  page_size2: number = 10;
  page_number2: number = 1;

  motivoCambioList: MotivoCambio[] = [];
  motivoCambio: MotivoCambio = new MotivoCambio;
  motivoCambioEdit: MotivoCambio = new MotivoCambio;

  motivoCambioModalRef: BsModalRef;
  motivoCambioEditModalRef: BsModalRef;

  constructor(public motivoCambioService: MotivoCambioService, public messageService: MessageService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getMotivoCambioList();
  }

  getMotivoCambioList() {
    this.motivoCambioService.findMotivoCambioList().subscribe((data: MotivoCambio[]) => {
      this.motivoCambioList = data;
    });
  }

  openNewModal(template: TemplateRef<any>) {
    this.motivoCambio = new MotivoCambio;
    this.motivoCambioModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeNewModal() {
    this.motivoCambioModalRef.hide();
  }

  openEditModal(template: TemplateRef<any>, motivoCambio: MotivoCambio) {
    this.motivoCambioEdit = motivoCambio;
    this.motivoCambioEditModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeEditModal() {
    this.motivoCambioEditModalRef.hide();
  }

  save() {
    this.loading = true;
    debugger
    this.motivoCambio.estado = 1;
   // this.motivoCambio.fechaRegistro = new Date();
    this.motivoCambioService.onSaveMotivoCambio(this.motivoCambio).subscribe(res => {
      this.closeNewModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se creo correctamente el motivocambio' });
    })
  }

  update() {
    this.loading = true;
    //this.motivoCambioEdit.fechaRegistro = new Date(this.motivoCambioEdit.fechaRegistro);
    this.motivoCambioService.onUpdateMotivoCambio(this.motivoCambioEdit).subscribe(res => {
      this.closeEditModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se actualizo correctamente el motivo cambio' });
    })
  }

  anular(motivoCambioAnular: MotivoCambio) {
    this.loading = true;
    this.motivoCambioEdit = motivoCambioAnular;
    this.motivoCambioEdit.estado = 0;
    //this.motivoCambioEdit.fechaRegistro = new Date(this.motivoCambioEdit.fechaRegistro);
    this.motivoCambioService.onUpdateMotivoCambio(this.motivoCambioEdit).subscribe(res => {
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se anulo correctamente el motivo cambio' });
    })
  }
}
