import { Component, OnInit, TemplateRef } from '@angular/core';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { SelectItem, MessageService } from 'primeng/api';
import { Campo } from 'src/app/entidades/campo';
import { Pozo } from 'src/app/entidades/pozo';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tasa } from 'src/app/entidades/tasa';
import { Operadora } from 'src/app/entidades/operadora';
import { Bloque } from 'src/app/entidades/bloque';
import { Archivo } from 'src/app/entidades/archivo';
import { CreateUpdateService } from '../../servicios/create-update.service';

@Component({
  selector: 'app-verificacion-tasa',
  templateUrl: './verificacion-tasa.component.html',
  styleUrls: ['./verificacion-tasa.component.css']
})
export class VerificacionTasaComponent implements OnInit {

  public loading = false;
  usuario: Usuario;
  campoList: SelectItem[] = [];
  campo: Campo;
  pozoList: SelectItem[] = [];
  pozo: Pozo;
  tasa: Tasa = new Tasa;
  tasaEdit: Tasa = new Tasa;
  tasaAnular: Tasa = new Tasa;
  campoT: Campo;
  pozoT: Pozo;
  operadoraT: Operadora = new Operadora;
  bloqueT: Bloque = new Bloque;
  docNroOficio: Archivo = new Archivo;
  docResolucion: Archivo = new Archivo;
  tasaList: Tasa[] = [];

  registroTasaModalRef: BsModalRef;
  maxDate: Date;
  minDate: Date;

  param: BusquedaParametros = new BusquedaParametros;

  constructor(public loginService: LoginService, public router: Router, private busquedaService: BusquedaService, private modalService: BsModalService, private dataApi: CreateUpdateService, private messageService: MessageService) {



  }

  ngOnInit() {
    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }

    this.tasa = this.busquedaService.tasa;


  }



}
