import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService, SelectItem } from 'primeng/api';
import { Bloque } from 'src/app/entidades/bloque';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { Campo } from 'src/app/entidades/campo';
import { PersonaPorCampo } from 'src/app/entidades/persona-por-campo';
import { Regional } from 'src/app/entidades/regional';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';
import { CrearPortafolioService } from '../../servicios/crear-portafolio.service';
import { CreateUpdateService } from '../../servicios/create-update.service';


@Component({
  selector: 'app-asignacion-campos',
  templateUrl: './asignacion-campos.component.html',
  styleUrls: ['./asignacion-campos.component.css']
})
export class AsignacionCamposComponent implements OnInit {

  public loading = false;
  usuario: Usuario;
  users: Usuario[] = [];
  usuarioFuncionario: Usuario = new Usuario;

  searchText: string;

  page_size: number = 10;
  page_number: number = 1;

  page_size2: number = 10;
  page_number2: number = 1;

  total: number = 3;
  total2: number = 10;



  regionalList: SelectItem[] = [];
  regional: Regional = new Regional;
  campoList: SelectItem[] = [];
  campo: Campo;
  bloqueList: SelectItem[] = [];
  bloque: Bloque;
  ubicacionList: SelectItem[] = [];
  estadoList: SelectItem[] = [];
  estado: number;
  personaPorCampoList: PersonaPorCampo[] = [];
  personaPorCampo: PersonaPorCampo;
  personaPorCampoEdit: PersonaPorCampo = new PersonaPorCampo;
  busquedaParametros: BusquedaParametros = new BusquedaParametros;

  usuarioModalRef: BsModalRef;
  newPersonaPorCampoModalRef: BsModalRef;
  editPersonaPorCampoModalRef: BsModalRef;
  usuarioModalRefBusqueda: BsModalRef;

  camposListNoAsing: Campo[] = [];

  constructor(public loginService: LoginService, private dataApi: CreateUpdateService, public messageService: MessageService, public router: Router, private buscarService: BusquedaService, private modalService: BsModalService) {

    this.estadoList = [{ label: "Seleccione", value: null, disabled: true }, { label: "Activo", value: 1 }, { label: "Inactivo", value: 0 }];
    this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.bloqueList = [{ label: "Seleccione", value: null, disabled: true }];
    this.regionalList = [{ label: "Seleccione", value: null, disabled: true }];
  }

  ngOnInit() {
    this.loading = true;
    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
    this.getBloqueList();
    this.getCamposListNoAsignados();
    this.getRegionalList();

    this.busquedaParametros.usuario = new Usuario;
    this.getPersonaPorCampoList();

  }

  getAllUsers() {
    this.loginService.findUserListPersonaCampo().subscribe((data: Usuario[]) => {
      this.users = data;
      this.loading = false;
    }, (err) => {
      this.messageService.add({ severity: 'error', detail: 'Error interno' });
      this.loading = false;

    });
  }

  getBloqueList() {
    this.buscarService.getBloqueList().subscribe((data: Bloque[]) => {
      let b: Bloque;
      for (let i in data) {
        b = data[i];
        this.bloqueList.push({ label: b.bqlNombre, value: b });
      }
    }, (err) => {
      this.messageService.add({ severity: 'error', detail: 'Error interno' });
      this.loading = false;

    });
  }

  getRegionalList() {
    this.buscarService.getRegionalList().subscribe((data: Regional[]) => {
      let b: Regional;
      for (let i in data) {
        b = data[i];
        this.regionalList.push({ label: b.rdhDescripcion, value: b });
      }
    }, (err) => {
      this.messageService.add({ severity: 'error', detail: 'Error interno' });
      this.loading = false;

    });
  }


  getCamposListNoAsignados() {
    this.buscarService.getPersonaPorCampoAsignadosList().subscribe((data: Campo[]) => {
      this.camposListNoAsing = data;
      this.loading = false;
    }, (err) => {
      this.messageService.add({ severity: 'error', detail: 'Error interno' });
      this.loading = false;

    });
  }

  getCampoListByBlqCodigo(bloque: Bloque) {
    this.loading = true;
    this.campoList = [];
    this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.buscarService.getCampoListByBlqCodigo(bloque.blqCodigo).subscribe((data: Campo[]) => {
      let c: Campo;
      for (let i in data) {
        c = data[i];
        this.campoList.push({ label: c.camNombre, value: c });
      }
      this.loading = false;

    }, (err) => {
      this.messageService.add({ severity: 'error', detail: 'Error interno' });
      this.loading = false;

    });
  }

  getPersonaPorCampoList() {
    this.loading = true;
    if (this.bloque) {
      this.busquedaParametros.bloque = this.bloque.blqCodigo;
    }
    if (this.campo) {
      this.busquedaParametros.campo = this.campo.camCodigo;
    }


    this.buscarService.getPersonaPorCampoList(this.busquedaParametros).subscribe((data: PersonaPorCampo[]) => {

      if (data.length > 0) {
        this.personaPorCampoList = data;
        this.messageService.add({ severity: 'success', detail: 'Datos encontrados correctamente' });
        this.busquedaParametros.bloque = null;
        this.busquedaParametros.campo = null;
        this.bloque = null;
        this.campo = null;
        this.busquedaParametros.fechaDesde = null;
        this.busquedaParametros.fechaHasta = null;
        this.busquedaParametros.estado = null;
        this.busquedaParametros.funcionario = null;
        this.loading = false;
      } else {
        this.messageService.add({ severity: 'info', detail: 'No se encontraron datos' });
        this.busquedaParametros.bloque = null;
        this.busquedaParametros.campo = null;
        this.bloque = null;
        this.campo = null;
        this.busquedaParametros.fechaDesde = null;
        this.busquedaParametros.fechaHasta = null;
        this.busquedaParametros.estado = null;
        this.busquedaParametros.funcionario = null;
        this.loading = false;
      }
    }, (err) => {
      this.messageService.add({ severity: 'error', detail: 'Error interno' });
      this.loading = false;
    });
  }

  openModalFuncionario(template: TemplateRef<any>) {
    this.loading = true;
    this.getAllUsers();
    this.usuarioModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeUsuarioModal() {
    this.usuarioModalRef.hide();
  }

  openModalFuncionarioBusqueda(template: TemplateRef<any>) {
    this.loading = true;
    this.getAllUsers();
    this.usuarioModalRefBusqueda = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeUsuarioModalBusqueda() {
    this.usuarioModalRefBusqueda.hide();
  }


  openModalNewPersonaPorCampo(template: TemplateRef<any>) {
    this.loading = true;
    this.campo = new Campo;
    this.bloque = new Bloque;
    this.usuarioFuncionario = new Usuario;
    // this.getBloqueList()
    this.newPersonaPorCampoModalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: 'static', keyboard: false });
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  closeModalNewPersonaPorCampo() {
    this.newPersonaPorCampoModalRef.hide();

  }

  openModalEditPersonaPorCampo(template: TemplateRef<any>, ppc: PersonaPorCampo) {
    this.personaPorCampoEdit = ppc;
    this.editPersonaPorCampoModalRef = this.modalService.show(template, { class: 'modal-xl', backdrop: 'static', keyboard: false });
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  closeModalEditPersonaPorCampo() {
    this.editPersonaPorCampoModalRef.hide();
  }

  goSelectUser(user: Usuario) {
    this.usuarioFuncionario = user;
    this.usuarioModalRef.hide();
  }
  goSelectUserBusqueds(user: Usuario) {
    this.busquedaParametros.usuario = user;
    this.usuarioModalRefBusqueda.hide();
  }

  clearMessage() {
    setTimeout(() => {
      this.messageService.clear();
    }, 1000);

  }
  errorCrear: boolean = false;
  guardarPersonaPorCampo() {
    this.personaPorCampo = new PersonaPorCampo;
    this.personaPorCampo.blqCodigo = this.bloque.blqCodigo;
    this.personaPorCampo.camCodigo = this.campo.camCodigo;
    this.personaPorCampo.idUsuarioFuncionario = this.usuarioFuncionario.idUsuario;
    this.personaPorCampo.correo = this.usuarioFuncionario.correo;
    this.personaPorCampo.rdhCodigo = this.regional.rdhCodigo;
    this.personaPorCampo.idUsuario = this.usuario.idUsuario;

    this.loading = true;

    
    if (this.bloque.blqCodigo && this.campo.camCodigo && this.usuarioFuncionario.idUsuario) {
      this.dataApi.transCreatePersonaPorCampo(this.personaPorCampo).subscribe(data => {
        if (data == 'Se asigno correctamente la persona al campo') {
          this.loading = false;
          this.messageService.add({ severity: 'success', detail: 'Se asigno correctamente la persona al campo' });
          this.bloque = new Bloque;
          this.campo = new Campo;
          this.usuarioFuncionario = new Usuario;
          this.estado = null;
          this.newPersonaPorCampoModalRef.hide();

        } else {
          this.loading = false;
          this.messageService.add({ severity: 'info', detail: 'No se pudo crear el registro' });
        }
      }, (err) => {
        this.messageService.add({ severity: 'error', detail: 'Error interno' });
        this.loading = false;

      });
    } else {
      this.loading = false;
      this.errorCrear = true;
      setTimeout(() => {
        this.errorCrear = false;
      }, 3000);
    }


  }

  guardarEditPersonaPorCampo() {

    // this.personaPorCampoEdit.estado = this.estado;
    // if (this.estado == 0) {
    //   this.personaPorCampoEdit.fechaFin = new Date();
    // }

    // if (this.personaPorCampoEdit.fechaInicio) {
    //   this.personaPorCampoEdit.fechaInicio = new Date(this.personaPorCampoEdit.fechaInicio);
    // }
    // if (this.personaPorCampoEdit.fechaAsignacion) {
    //   this.personaPorCampoEdit.fechaAsignacion = new Date(this.personaPorCampoEdit.fechaAsignacion);
    // }

    // this.loading = true;
    // this.crearPortafolioService.transUpdatePersonaPorCampo(this.personaPorCampoEdit).subscribe(data => {

    //   if (data) {
    //     this.loading = false;
    //     this.messageService.add({ severity: 'success', detail: 'Se actualizo correctamente el registro' });
    //     this.estado = null;
    //     this.editPersonaPorCampoModalRef.hide();

    //   } else {
    //     this.loading = false;
    //     this.messageService.add({ severity: 'info', detail: 'No se pudo actualizo el registro' });
    //   }
    // }, (err) => {
    //   this.messageService.add({ severity: 'error', detail: 'Error interno' });
    //   this.loading = false;

    // });

  }
}