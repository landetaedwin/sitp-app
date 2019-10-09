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
import { CrearPortafolioService } from '../../servicios/crear-portafolio.service';

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

  maxDate: Date;
  minDate: Date;

  fechaInicio: Date;

  registroModalRef: BsModalRef;

  bIniciar: boolean = false;
  bRegistroDiario: boolean = true;
  bSuspecion: boolean = true;
  bReinicio: boolean = true;
  bFin: boolean = true;

  aRegistroTrabajo: Accion = new Accion;
  aSuspencion: Accion = new Accion;
  aReinicio: Accion = new Accion;

  constructor(public loginService: LoginService, public busquedaService: BusquedaService, public cs: Constantes, private crearPortafolioService: CrearPortafolioService, public messageService: MessageService, public router: Router, private modalService: BsModalService) {
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
    this.portafolio = this.busquedaService.portafolio;
    this.getAccionList();

    if (this.portafolio.fechaInicio) {
      this.bIniciar = true;
      this.bRegistroDiario = false;
      this.bSuspecion = false;
      this.bReinicio = false;
      this.bFin = false;
    }
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  getAccionList() {
    this.crearPortafolioService.findAccionList().subscribe((data: Accion[]) => {
      for (let i = 0; i < data.length; i++) {
        debugger
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

  openModalRegistro(template: TemplateRef<any>) {
    this.loading = true;
    this.registroDiario = new RegistroDiario;
    this.registroDiario.codigoAccion = this.aRegistroTrabajo.codigoAccion;
    this.registroDiario.accion = this.aRegistroTrabajo;
    this.registroDiario.codigoPortafolio = this.portafolio.codigoPortafolio;
    this.registroDiario.fechaAccion = new Date();
    this.registroDiario.idUsuario = this.usuario.idUsuario;
    this.registroDiario.estado = 1;
    this.registroModalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    console.log(this.aRegistroTrabajo)
  }

  closeModalRegistro() {
    this.registroModalRef.hide();
  }

  iniciarOperacionesRegistroDiario() {
    if (this.fechaInicio) {
      this.portafolio.fechaInicio = this.fechaInicio;
    } else {
      this.portafolio.fechaInicio = new Date();
    }
    this.crearPortafolioService.transUpdatePortafolio(this.portafolio).subscribe(data => {
      if (data) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se inician las operaciones' });
        this.bIniciar = true;
      }
    });
  }

  guardarRegistroDiario() {
    this.loading = true;
    debugger
    this.crearPortafolioService.transCrearRegistroDiario(this.registroDiario).subscribe(data => {
      if (data) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Registro diario creado correctamente' });
        this.bIniciar = true;
        this.closeModalRegistro();
      }
    })


  }



}
