import { Component, OnInit, TemplateRef } from '@angular/core';
//import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService, SelectItem } from 'primeng/api';
import { BusquedaService } from 'src/app/m-trabajo-pozo/servicios/buscar-portafolio.service';
import { Categoria } from 'src/app/entidades/categoria';
import { TipoTrabajo } from 'src/app/entidades/tipo-trabajo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { CategoriaService } from 'src/app/m-mantenimiento/servicios/categoria.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  
  public loading = false;
  usuario: Usuario;

  searchText: string;

  page_size: number = 10;
  page_number: number = 1;

  page_size2: number = 10;
  page_number2: number = 1;

  tipoTrabajoList: SelectItem[] = [];
  tipoTrabajo: TipoTrabajo = new TipoTrabajo;

  
  categoria: Categoria = new Categoria;
  categoriaEdit: Categoria = new Categoria;
  categoriaList: SelectItem[] = [];
  categoriaList1: Categoria[] = [];

  categoriaModalRef: BsModalRef;
  categoriaEditModalRef: BsModalRef;

  constructor(public categoriaService: CategoriaService, public busquedaService: BusquedaService, public messageService: MessageService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getCategoriaList();
  }

  getCategoriaList() {
    this.categoriaService.findCategoriaList().subscribe((data: Categoria[]) => {
      this.categoriaList1 = data;
    });
  }

  getCategoriaByCodigoTipoTrabajo(tipoTrabajo: TipoTrabajo) {
    if (tipoTrabajo.codigoTipoTrabajo) {
      this.loading = true;
      this.categoriaService.getCategoriaListByCodigoTipoTrabajo(tipoTrabajo.codigoTipoTrabajo).subscribe(
        (data: Categoria[]) => {
          let p: Categoria;
          this.categoriaList = [{label: "Seleccione", value: null, disabled: true  }];
          for (let i in data) {
            p = data[i];
            this.categoriaList.push({ label: p.categoria, value: p });
          }
          this.loading = false;
        });
    }
  }




  openNewModal(template: TemplateRef<any>) {
    this.categoria = new Categoria;
    this.categoriaModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeNewModal() {
    this.categoriaModalRef.hide();
  }

  openEditModal(template: TemplateRef<any>, categoria: Categoria) {
    this.categoriaEdit = categoria;
    this.categoriaEditModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeEditModal() {
    this.categoriaEditModalRef.hide();
  }

  save() {
    this.loading = true;
   // debugger
   // this.categoria.estado = 1;
   // this.categoria.fechaRegistro = new Date();
    this.categoriaService.onSaveCategoria(this.categoria).subscribe(res => {
      this.closeNewModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se creo correctamente el categoria' });
    })
  }

  update() {
    this.loading = true;
    //this.categoriaEdit.fechaRegistro = new Date(this.categoriaEdit.fechaRegistro);
    this.categoriaService.onUpdateCategoria(this.categoriaEdit).subscribe(res => {
      this.closeEditModal();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se actualizo correctamente el categoria' });
    })
  }

  anular(categoriaAnular: Categoria) {
    this.loading = true;
    this.categoriaEdit = categoriaAnular;
    //this.categoriaEdit.estado = 0;
    //this.categoriaEdit.fechaRegistro = new Date(this.categoriaEdit.fechaRegistro);
    this.categoriaService.onUpdateCategoria(this.categoriaEdit).subscribe(res => {
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se anulo correctamente el categoria' });
    })
  }


  

}
