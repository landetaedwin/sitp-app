import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Yacimiento } from 'src/app/entidades/yacimiento';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { YacimientoService } from '../../servicios/yacimiento.service';

@Component({
  selector: 'app-yacimiento',
  templateUrl: './yacimiento.component.html',
  styleUrls: ['./yacimiento.component.css']
})
export class YacimientoComponent implements OnInit {

  public loading = false;
  usuario: Usuario;

  searchText: string;

  page_size: number = 10;
  page_number: number = 1;

  page_size2: number = 10;
  page_number2: number = 1;

  yacimientoList: Yacimiento[] = [];
  yacimiento: Yacimiento = new Yacimiento;
  yacimientoEdit: Yacimiento = new Yacimiento;

  yacimientoModalRef: BsModalRef;
  yacimientoEditModalRef: BsModalRef;

  constructor(public yacimientoService: YacimientoService, public messageService: MessageService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getYacimientoList();
  }

  getYacimientoList() {
    this.yacimientoService.findYacimientoList().subscribe((data: Yacimiento[]) => {
      this.yacimientoList = data;
    });
  }

  openNewModal(template: TemplateRef<any>) {
    this.yacimiento = new Yacimiento;
    this.yacimientoModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeNewModal() {
    this.yacimientoModalRef.hide();
  }

  openEditModal(template: TemplateRef<any>, yacimiento: Yacimiento) {
    this.yacimientoEdit = yacimiento;
    this.yacimientoEditModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeEditModal() {
    this.yacimientoEditModalRef.hide();
  }

  save() {
    this.loading = true;
    this.yacimiento.estado = 1;
    //this.yacimiento.fechaRegistro = new Date();
    this.yacimientoService.onSaveYacimiento(this.yacimiento).subscribe(res => {
      this.closeNewModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se creo correctamente el yacimiento' });
    })
  }

  update() {
    this.loading = true;
    //this.yacimientoEdit.fechaRegistro = new Date(this.yacimientoEdit.fechaRegistro);
    this.yacimientoService.onUpdateYacimiento(this.yacimientoEdit).subscribe(res => {
      this.closeEditModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se actualizo correctamente el yacimiento' });
    })
  }

  anular(yacimientoAnular: Yacimiento) {
    this.loading = true;
    this.yacimientoEdit = yacimientoAnular;
    this.yacimientoEdit.estado = 0;
    //this.yacimientoEdit.fechaRegistro = new Date(this.yacimientoEdit.fechaRegistro);
    this.yacimientoService.onUpdateYacimiento(this.yacimientoEdit).subscribe(res => {
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se anulo correctamente el yacimiento' });
    })
  }
}

