import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService, SelectItem } from 'primeng/api';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Constantes } from 'src/app/resources/constantes';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';
import { CreateUpdateService } from '../../servicios/create-update.service';
import { Tasa } from 'src/app/entidades/tasa';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { Produccion } from 'src/app/entidades/produccion';
import { Pozo } from 'src/app/entidades/pozo';
import { VerificacionTasa } from 'src/app/entidades/verificacion-tasa';

@Component({
  selector: 'app-verificacion-tasa',
  templateUrl: './verificacion-tasa.component.html',
  styleUrls: ['./verificacion-tasa.component.css']
})
export class VerificacionTasaComponent implements OnInit {

  public loading = false;
  usuario: Usuario;
  portafolio: Portafolio = new Portafolio;
  maxDate: Date;
  minDate: Date;
  tasaList: Tasa[] = []
  param: BusquedaParametros = new BusquedaParametros;
  tasa: Tasa = new Tasa;
  produccionDiariaList: Produccion[] = []
  promedio: number
  justificadoList: SelectItem[] = [];
  justificacion: number;

  verificacionTasa: VerificacionTasa = new VerificacionTasa
  verificacionTasaList: VerificacionTasa[] = []



  constructor(public loginService: LoginService, public router: Router, private busqueda: BusquedaService, private modalService: BsModalService, private dataApi: CreateUpdateService, private messageService: MessageService, public cs: Constantes) {
    this.justificadoList = [
      { label: "Seleccione", value: null, disabled: false },
      { label: "Si", value: 1, disabled: false },
      { label: "No", value: 0, disabled: false }];
  }

  ngOnInit() {
    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
    if (!this.busqueda.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
    }


    this.portafolio = new Portafolio
    this.portafolio.pozo = new Pozo
    this.portafolio = this.busqueda.portafolio;
    this.portafolio.pozo = this.busqueda.portafolio.pozo
    this.maxDate = new Date();
    this.minDate = new Date(2010, 0, 1);

    this.getTasaByPozCodigo();
    this.getVerificacionList();

  }

  getTasaByPozCodigo() {
    this.loading = true;
    this.tasaList = [];
    if (this.portafolio.pozo.pozCodigo) {
      this.param.pozo = this.portafolio.pozo.pozCodigo
    }

    this.busqueda.getTasaList(this.param).subscribe((data: Tasa[]) => {

      if (data.length > 0) {
        this.param.pozo = null;
        this.param = new BusquedaParametros;
        this.tasa = data[0];
        this.loading = false;
      } else {
        this.messageService.add({ severity: 'info', detail: 'No se encontraron datos' });
        this.param.pozo = null;
        this.param = new BusquedaParametros;
        this.loading = false;
      }
    })
  }

  goToBuscarPortafolio() {
    this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
  }

  getProduccion3Despues() {
    this.portafolio.fechaFin = new Date(this.portafolio.fechaFin);
    this.busqueda.BuscarDespues(this.portafolio.fechaFin, 3, this.portafolio.pozo.pozNombre).subscribe((data: Produccion[]) => {
      this.produccionDiariaList = data;
      this.promedio = 0;
      debugger
      for (let i: number = 0; i < data.length; i++) {
        this.promedio = this.promedio + data[i].bppd;
      }
      this.promedio = this.promedio / data.length;
    })
  }

  goSaveVerificacion() {

    this.verificacionTasa = new VerificacionTasa;
    this.verificacionTasa.codigoPortafolio = this.portafolio.codigoPortafolio;
    this.verificacionTasa.codigoTasa = this.tasa.codigoTasa;
    this.verificacionTasa.numeroRegistros = 3;
    this.verificacionTasa.valorMaximo = this.promedio;
    if (this.promedio > this.tasa.tasa) {
      this.verificacionTasa.valoracion = 0
    } else {
      this.verificacionTasa.valoracion = 1
    }
    this.verificacionTasa.justificacion = this.justificacion;
    this.verificacionTasa.idUsuario = this.usuario.idUsuario;

    this.dataApi.transCreateVErificacionTasa(this.verificacionTasa).subscribe(data => {
      if (data == "Se ha creado correctamente el registro") {
       
        this.getVerificacionList();
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: '' + data });

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: '' + data });
      }
    });

  }

  getVerificacionList() {
    this.loading = true;
    this.tasaList = [];
    if (this.portafolio.codigoPortafolio) {
      this.param.numeroPortafolio = this.portafolio.codigoPortafolio
    }

    this.busqueda.getVerificacionTasaList(this.param).subscribe((data: VerificacionTasa[]) => {

      if (data.length > 0) {
        this.param = new BusquedaParametros;
        this.verificacionTasaList = data;
        this.loading = false;
      } else {
        this.messageService.add({ severity: 'info', detail: 'No se encontraron datos' });
        this.param = new BusquedaParametros;
        this.loading = false;
      }
    })

  }

}




