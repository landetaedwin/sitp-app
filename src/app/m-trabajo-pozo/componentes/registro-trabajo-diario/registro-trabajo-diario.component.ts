import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Accion } from 'src/app/entidades/accion';
import { Portafolio } from 'src/app/entidades/portafolio';
import { RegistroDiario } from 'src/app/entidades/registro-diario';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Constantes } from 'src/app/resources/constantes';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';
import { CreateUpdateService } from '../../servicios/create-update.service';

@Component({
  selector: 'app-registro-trabajo-diario',
  templateUrl: './registro-trabajo-diario.component.html',
  styleUrls: ['./registro-trabajo-diario.component.css']
})
export class RegistroTrabajoDiarioComponent implements OnInit {
  public loading = false;
  usuario: Usuario;
  portafolio: Portafolio = new Portafolio;
  registroDiario: RegistroDiario = new RegistroDiario;
  registroDiarioEdit: RegistroDiario = new RegistroDiario;
  registroDiarioList: RegistroDiario[] = []

  maxDate: Date;
  minDate: Date;

  minDateTrabajo: Date;

  fechaInicio: Date;
  fechaFin: Date;
  registroModalRef: BsModalRef;

  bIniciar: boolean = true;
  bRegistroDiario: boolean = true;
  bSuspecion: boolean = true;
  bReinicio: boolean = true;
  bFin: boolean = true;

  aRegistroTrabajo: Accion = new Accion;
  aSuspencion: Accion = new Accion;
  aReinicio: Accion = new Accion;

  constructor(public loginService: LoginService, public busquedaService: BusquedaService, public cs: Constantes, private dataAPI: CreateUpdateService, public messageService: MessageService, public router: Router, private modalService: BsModalService) {
  }
  ngOnInit() {
    this.loading = true;
    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
    if (!this.busquedaService.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
    }
    this.maxDate = new Date();
    this.minDate = new Date(2010, 0, 1);
    this.minDateTrabajo = new Date(2010, 0, 1);
    this.portafolio = this.busquedaService.portafolio;

    if (this.portafolio.fechaInicio) {
      this.fechaInicio = new Date(this.portafolio.fechaInicio);
      this.bIniciar = true;
      this.bRegistroDiario = false;
      this.bFin = false;
    } else {
      this.bIniciar = false;
    }


    if (this.portafolio.fechaFin) {
      this.fechaFin = new Date(this.portafolio.fechaFin);
      this.bIniciar = true;
      this.bRegistroDiario = true
      this.bSuspecion = true;
      this.bReinicio = true;
      this.bFin = true;
    }

    this.getAccionList();
    this.getRegistroDiarioList();

  }

  getRegistroDiarioList() {
    this.busquedaService.getRegistroDiarioList(this.portafolio.codigoPortafolio).subscribe((data: RegistroDiario[]) => {
      if (data && data.length > 0 && !this.portafolio.fechaFin) {
        if (data[0].codigoAccion == this.aRegistroTrabajo.codigoAccion) {
          this.bRegistroDiario = false;
          this.bSuspecion = false;
          this.bReinicio = true;
        }
        if (data[0].codigoAccion == this.aSuspencion.codigoAccion) {
          this.bRegistroDiario = true;
          this.bSuspecion = true;
          this.bReinicio = false;
        }
        if (data[0].codigoAccion == this.aReinicio.codigoAccion) {
          this.bRegistroDiario = false;
          this.bSuspecion = false;
          this.bReinicio = true;
        }
      }
      setTimeout(() => {
        this.registroDiarioList = data;
        this.loading = false;

      }, 500);
    });
  }

  getAccionList() {
    this.busquedaService.getAccionList().subscribe((data: Accion[]) => {
      for (let i = 0; i < data.length; i++) {

        if (data[i].codigoAccion == 1) {
          this.aRegistroTrabajo = data[i];
        }
        if (data[i].codigoAccion == 2) {
          this.aSuspencion = data[i];
        }
        if (data[i].codigoAccion == 3) {
          this.aReinicio = data[i];
        }
      }
    });
  }


  //Modal registro diario 
  openModalRegistro(template: TemplateRef<any>) {
    this.registroDiario = new RegistroDiario;
    this.registroDiario.codigoAccion = this.aRegistroTrabajo.codigoAccion;
    this.registroDiario.accion = this.aRegistroTrabajo;
    this.registroDiario.codigoPortafolio = this.portafolio.codigoPortafolio;
    this.registroDiario.idUsuario = this.usuario.idUsuario;
    this.registroDiario.estado = 1;
    if (this.registroDiarioList.length > 0 && this.registroDiarioList[0].fechaAccion) {
      this.minDateTrabajo = new Date(this.registroDiarioList[0].fechaAccion);
    } else {
      this.minDateTrabajo = this.minDate;
    }

    this.registroModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });

  }

  closeModalRegistro() {
    this.registroModalRef.hide();
  }

  // Modal suspencion
  openModalSuspencion(template: TemplateRef<any>) {
    this.registroDiario = new RegistroDiario;
    this.registroDiario.codigoAccion = this.aSuspencion.codigoAccion;
    this.registroDiario.accion = this.aSuspencion;
    this.registroDiario.codigoPortafolio = this.portafolio.codigoPortafolio;
    this.registroDiario.idUsuario = this.usuario.idUsuario;
    this.registroDiario.estado = 1;
    if (this.registroDiarioList.length > 0 && this.registroDiarioList[0].fechaAccion) {
      this.minDateTrabajo = new Date(this.registroDiarioList[0].fechaAccion);
    } else {
      this.minDateTrabajo = this.minDate;
    }
    this.registroModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });

  }

  // Modal suspencion
  openModalReinicio(template: TemplateRef<any>) {
    this.registroDiario = new RegistroDiario;
    this.registroDiario.codigoAccion = this.aReinicio.codigoAccion;
    this.registroDiario.accion = this.aReinicio;
    this.registroDiario.codigoPortafolio = this.portafolio.codigoPortafolio;
    this.registroDiario.idUsuario = this.usuario.idUsuario;
    this.registroDiario.estado = 1;
    if (this.registroDiarioList.length > 0 && this.registroDiarioList[0].fechaAccion) {
      this.minDateTrabajo = new Date(this.registroDiarioList[0].fechaAccion);
    } else {
      this.minDateTrabajo = this.minDate;
    }
    this.registroModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });

  }


  iniciarOperacionesRegistroDiario() {
    this.loading = true;

    if (this.fechaInicio) {
      this.portafolio.fechaInicio = this.fechaInicio;
      this.portafolio.fechaRegistro = new Date(this.portafolio.fechaRegistro)
      this.portafolio.fechaModificacion = new Date(this.portafolio.fechaModificacion)
      if (this.portafolio.fechaTrabajoSinTorre) {
        this.portafolio.fechaTrabajoSinTorre = new Date(this.portafolio.fechaTrabajoSinTorre);
      }
    } else {
      this.portafolio.fechaInicio = new Date();
      this.portafolio.fechaRegistro = new Date(this.portafolio.fechaRegistro);
      this.portafolio.fechaModificacion = new Date(this.portafolio.fechaModificacion)
      if (this.portafolio.fechaTrabajoSinTorre) {
        this.portafolio.fechaTrabajoSinTorre = new Date(this.portafolio.fechaTrabajoSinTorre);
      }

    }
    this.dataAPI.transUpdatePortafolio(this.portafolio).subscribe(data => {
      if (data) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se inician las operaciones' });
        this.bIniciar = true;
        this.bRegistroDiario = false;
        this.bFin = false;
        this.fechaInicio = this.portafolio.fechaInicio;
      }
    });
  }


  finalizarOperacionesRegistroDiario() {
    if (this.fechaFin) {
      this.portafolio.fechaFin = this.fechaFin;
      this.portafolio.fechaInicio = new Date(this.portafolio.fechaInicio);
      this.portafolio.fechaRegistro = new Date(this.portafolio.fechaRegistro)
      if (this.portafolio.fechaTrabajoSinTorre) {
        this.portafolio.fechaTrabajoSinTorre = new Date(this.portafolio.fechaTrabajoSinTorre);
      }
      if (this.portafolio.consorcio.fechaRegistro) {
        this.portafolio.consorcio.fechaRegistro = new Date(this.portafolio.consorcio.fechaRegistro);
      }
      if (this.portafolio.fechaModificacion) {
        this.portafolio.fechaModificacion = new Date(this.portafolio.fechaModificacion);
      }

    } else {
      this.portafolio.fechaFin = new Date();
      this.portafolio.fechaInicio = new Date(this.portafolio.fechaInicio);
      this.portafolio.fechaRegistro = new Date(this.portafolio.fechaRegistro);
      if (this.portafolio.fechaTrabajoSinTorre) {
        this.portafolio.fechaTrabajoSinTorre = new Date(this.portafolio.fechaTrabajoSinTorre);
      }
      if (this.portafolio.consorcio.fechaRegistro) {
        this.portafolio.consorcio.fechaRegistro = new Date(this.portafolio.consorcio.fechaRegistro);
      }
      if (this.portafolio.fechaModificacion) {
        this.portafolio.fechaModificacion = new Date(this.portafolio.fechaModificacion);
      }

    }
    this.dataAPI.transUpdatePortafolio(this.portafolio).subscribe(data => {
      if (data) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se finalizaron las operaciones' });
        this.bIniciar = true;
        this.bRegistroDiario = true
        this.bSuspecion = true;
        this.bReinicio = true;
        this.bFin = true;
        this.fechaFin = this.portafolio.fechaFin;
      }
    });
  }

  guardarRegistroDiario() {
    this.loading = true;
    this.registroDiario.fechaAccion = new Date(this.registroDiario.fechaAccion)
    this.dataAPI.transCrearRegistroDiario(this.registroDiario).subscribe(data => {
      if (data) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Registro diario creado correctamente' });
        this.getRegistroDiarioList();
        this.bIniciar = true;
        this.closeModalRegistro();
      }
    })
  }

  guardarSuspencion() {
    this.loading = true;
    this.registroDiario.fechaAccion = new Date(this.registroDiario.fechaAccion)
    this.dataAPI.transCrearRegistroDiario(this.registroDiario).subscribe(data => {
      if (data) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Suspencion creada correctamente' });
        this.getRegistroDiarioList();
        this.bIniciar = true;
        this.closeModalRegistro();
      }
    })
  }

  guardarReinicio() {
    this.loading = true;
    this.registroDiario.fechaAccion = new Date(this.registroDiario.fechaAccion)
    this.dataAPI.transCrearRegistroDiario(this.registroDiario).subscribe(data => {
      if (data) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Reinicio creado correctamente' });
        this.getRegistroDiarioList();
        this.bIniciar = true;
        this.closeModalRegistro();
      }
    })
  }


  //Modal registro diario 
  openModalRegistroEdit(template: TemplateRef<any>, registroDiario: RegistroDiario) {
    this.registroDiarioEdit = this.cloneJSON(registroDiario);
    this.registroDiarioEdit.fechaAccion = new Date(this.registroDiarioEdit.fechaAccion)
    this.registroModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });

  }

  closeModalRegistroEdit() {
    this.registroModalRef.hide();
  }



  editarRegistroDiario() {
    this.loading = true;
    this.registroDiarioEdit.fechaAccion = new Date(this.registroDiarioEdit.fechaAccion)
    if (this.registroDiarioEdit.fechaActualizacion) {
      this.registroDiarioEdit.fechaActualizacion = new Date(this.registroDiarioEdit.fechaActualizacion)
    }
    this.dataAPI.transEditarRegistroDiario(this.registroDiarioEdit).subscribe(data => {
      if (data) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Registro actualizado creado correctamente' });
        this.getRegistroDiarioList();
        this.closeModalRegistro();
      }
    })
  }


  goToBuscarPortafolio() {
    this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
  }

  cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  anularRegistroDiario() {
    this.loading = true;
    if (this.registroDiarioEdit.fechaActualizacion) {
      this.registroDiarioEdit.fechaActualizacion = new Date(this.registroDiarioEdit.fechaActualizacion)
    }
    if (this.registroDiarioEdit.fechaAccion) {
      this.registroDiarioEdit.fechaAccion = new Date(this.registroDiarioEdit.fechaAccion)
    }
    this.registroDiarioEdit.estado = 0;
    this.dataAPI.transEditarRegistroDiario(this.registroDiarioEdit).subscribe(data => {
      if (data) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Registro actualizado creado correctamente' });
        this.getRegistroDiarioList();
        this.confirmModalRef.hide()
      }
    })
  }
  confirmModalRef: BsModalRef;
  openConfirmModal(template: TemplateRef<any>, registroDiario: RegistroDiario) {
    this.registroDiarioEdit = this.cloneJSON(registroDiario);
    this.confirmModalRef = this.modalService.show(template);
  }

}
