import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService, SelectItem } from 'primeng/api';
import { Bloque } from 'src/app/entidades/bloque';
import { Campo } from 'src/app/entidades/campo';
import { Consorcio } from 'src/app/entidades/consorcio';
import { Operadora } from 'src/app/entidades/operadora';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Pozo } from 'src/app/entidades/pozo';
import { TipoPozo } from 'src/app/entidades/tipo-pozo';
import { TipoTrabajo } from 'src/app/entidades/tipo-trabajo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';
import { CreateUpdateService } from '../../servicios/create-update.service';

@Component({
  selector: 'app-editar-portafolio',
  templateUrl: './editar-portafolio.component.html',
  styleUrls: ['./editar-portafolio.component.css']
})
export class EditarPortafolioComponent implements OnInit {

  public loading = false;

  usuario: Usuario;
  portafolio: Portafolio = new Portafolio;

  minDate: Date;
  maxDate: Date;

  campoList: SelectItem[] = [];
  pozoList: SelectItem[] = [];
  tipoPozoList: SelectItem[] = [];
  consorcioList: SelectItem[] = [];
  tipoTrabajoList: SelectItem[] = [];
  numeroList: SelectItem[] = [];
  estadoList: SelectItem[] = [];
  portafolioAuditList: SelectItem[] = [];



  campo: Campo = new Campo;
  pozo: Pozo = new Pozo;
  consorcio: Consorcio = new Consorcio;
  tipoPozo: TipoPozo = new TipoPozo;
  tipoTrabajo: TipoTrabajo = new TipoTrabajo;
  bloque: Bloque = new Bloque;
  operadora: Operadora = new Operadora;
  numeroTrabajo: number;
  estado: number;

  confirmModalRef: BsModalRef;
  editarPortafolioModalRef: BsModalRef;

  constructor(public busquedaService: BusquedaService, private messageService: MessageService, private modalService: BsModalService, public dataApi: CreateUpdateService, public loginService: LoginService, public router: Router) {

    this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.tipoPozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.consorcioList = [{ label: "Seleccione", value: null, disabled: true }];
    this.tipoTrabajoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.numeroList = [{ label: "Seleccione", value: null, disabled: true }];
    this.estadoList = [{ label: "Seleccione", value: null, disabled: true }, { label: "Registrado", value: 1 }, { label: "Anulado", value: 0 }];


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
    this.campo = this.portafolio.campo;
    this.pozo = this.portafolio.pozo;
    this.consorcio = this.portafolio.consorcio;
    this.tipoTrabajo = this.portafolio.tipoTrabajo;
    this.numeroTrabajo = this.portafolio.numeroTrabajo;
    this.tipoPozo = this.portafolio.tipoPozo
    this.estado = this.portafolio.estado;
    if (this.portafolio.fechaModificacion) {
      this.portafolio.fechaModificacion = new Date(this.portafolio.fechaModificacion);
    }
    if (this.portafolio.fechaTrabajoSinTorre) {
      this.portafolio.fechaTrabajoSinTorre = new Date(this.portafolio.fechaTrabajoSinTorre);
    }

    
    this.cargarPortafolioAuditList();
    this.cargarCampoList();
    this.cargarTipoPozoList();
    this.cargarConsorcioList();
    this.cargarTipoTrabajoList();
    this.cargarOperadoraByPozCompaniaPetroleraInit(this.pozo);
    this.cargarCampoPozoInit(this.portafolio.campo);

  }


  cargarPortafolioAuditList() {
    this.busquedaService.getPorfatolioAuditList(this.portafolio.codigoPortafolio).subscribe(
      (data:any) => {

        this.portafolioAuditList =data;
      
        this.loading = false;
      }, (err) => {
        this.messageService.add({ severity: 'error', detail: 'Error interno' });
        this.loading = false;
        console.log(err)
      });
  }

  cargarCampoList() {
    this.busquedaService.getCampoList().subscribe(
      (data: Campo[]) => {
        let c: Campo;
        this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
        for (let i in data) {
          c = data[i];
          this.campoList.push({ label: c.camNombre, value: c });
        }
        this.loading = false;
      }, (err) => {
        this.messageService.add({ severity: 'error', detail: 'Error interno' });
        this.loading = false;
        console.log(err)
      });
  }

  cargarPozosByCamCodigoInit(campo: Campo) {
    if (campo.camCodigo) {
      this.busquedaService.getPozoListByCamCodigo(campo.camCodigo).subscribe(
        (data: Pozo[]) => {
          let p: Pozo;
          this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
          for (let i in data) {
            p = data[i];
            this.pozoList.push({ label: p.pozNombre, value: p });
          }
        }, (err) => {
          this.messageService.add({ severity: 'error', detail: 'Error interno' });
          this.loading = false;
          console.log(err)
        });
    }
  }
  cargarBloqueByBlqCodigoInit(campo: Campo) {
    this.bloque.bqlNombre = "n/a";
    if (campo.blqCodigo) {
      this.busquedaService.getBloqueByBloqueCodigo(campo.blqCodigo).subscribe(
        (data: Bloque) => {
          if (data) {
            this.bloque = data;
          }
        }, (err) => {
          this.messageService.add({ severity: 'error', detail: 'Error interno' });
          this.loading = false;
          console.log(err)
        });
    }
  }

  cargarCampoPozoInit(campo: Campo) {
    this.bloque.bqlNombre = "n/a";
    this.operadora.cexApellidoPaterno = "n/a";
    this.cargarBloqueByBlqCodigoInit(campo);
    this.cargarPozosByCamCodigoInit(campo);
  }


  cargarOperadoraByPozCompaniaPetroleraInit(pozo: Pozo) {
    this.operadora.cexApellidoPaterno = "n/a";
    if (pozo.pozCompaniaPetrolera) {
      this.busquedaService.getOperadoraByCompaniaPetrolera(pozo.pozCompaniaPetrolera).subscribe(
        (data: Operadora) => {
          if (data) {
            this.operadora = data;
          }
        }, (err) => {
          this.messageService.add({ severity: 'error', detail: 'Error interno' });
          this.loading = false;
          console.log(err)
        });
    }
  }

  cargarOperadoraByPozCompaniaPetrolera(pozo: Pozo) {
    this.operadora.cexApellidoPaterno = "n/a";
    if (pozo.pozCompaniaPetrolera) {
      this.loading = true;
      this.busquedaService.getOperadoraByCompaniaPetrolera(pozo.pozCompaniaPetrolera).subscribe(
        (data: Operadora) => {
          if (data) {
            this.operadora = data;
          }
          this.loading = false;
        }, (err) => {
          this.messageService.add({ severity: 'error', detail: 'Error interno' });
          this.loading = false;
          console.log(err)
        });
    }
  }

  cargarCampoPozo(campo: Campo) {
    this.bloque.bqlNombre = "n/a";
    this.operadora.cexApellidoPaterno = "n/a";
    this.cargarBloqueByBlqCodigo(campo);
    this.cargarPozosByCamCodigo(campo);
  }

  cargarBloqueByBlqCodigo(campo: Campo) {
    this.bloque.bqlNombre = "n/a";
    this.loading = true;
    if (campo.blqCodigo) {
      this.loading = true;
      this.busquedaService.getBloqueByBloqueCodigo(campo.blqCodigo).subscribe(
        (data: Bloque) => {
          if (data) {
            this.bloque = data;
          }
          this.loading = false;
        }, (err) => {
          this.messageService.add({ severity: 'error', detail: 'Error interno' });
          this.loading = false;
          console.log(err)
        });
    }
  }

  cargarPozosByCamCodigo(campo: Campo) {
    this.loading = true;
    if (campo.camCodigo) {
      this.busquedaService.getPozoListByCamCodigo(campo.camCodigo).subscribe(
        (data: Pozo[]) => {
          let p: Pozo;
          this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
          for (let i in data) {
            p = data[i];
            this.pozoList.push({ label: p.pozNombre, value: p });
          }
          this.loading = false;

        }, (err) => {
          this.messageService.add({ severity: 'error', detail: 'Error interno' });
          this.loading = false;
          console.log(err)
        });
    }
  }

  cargarTipoTrabajoList() {
    this.busquedaService.getTipoTrabajoList().subscribe(
      (data: TipoTrabajo[]) => {
        let tt: TipoTrabajo;
        this.tipoTrabajoList = [{ label: "Seleccione", value: null, disabled: true }];
        for (let i in data) {
          tt = data[i];
          this.tipoTrabajoList.push({ label: tt.tipoTrabajo, value: tt });
        }
      }, (err) => {
        this.messageService.add({ severity: 'error', detail: 'Error interno' });
        this.loading = false;
        console.log(err)
      });
  }

  cargarConsorcioList() {
    this.busquedaService.getConsorcioList().subscribe(
      (data: Consorcio[]) => {
        let con: Consorcio;
        this.consorcioList = [{ label: "Seleccione", value: null, disabled: true }];
        for (let i in data) {
          con = data[i];
          this.consorcioList.push({ label: con.consorcio, value: con });
        }
      }, (err) => {
        this.messageService.add({ severity: 'error', detail: 'Error interno' });
        this.loading = false;
        console.log(err)
      });
  }

  cargarTipoPozoList() {
    this.busquedaService.getTipoPozoList().subscribe((data: TipoPozo[]) => {
      let tp: TipoPozo;
      this.tipoPozoList = [{ label: "Seleccione", value: null, disabled: true }];
      for (let i in data) {
        tp = data[i];
        this.tipoPozoList.push({ label: tp.tipoPozo, value: tp });
      }
    }, (err) => {
      this.messageService.add({ severity: 'error', detail: 'Error interno' });
      this.loading = false;
      console.log(err)
    });
  }


  guardarPortafolio() {


    let errores: string[] = [];

    if (!this.tipoPozo) {
      errores.push("El tipo pozo es requerido");
    }

    if (!this.consorcio) {
      errores.push("El consorcio es requerido");
    }

    if (!this.tipoTrabajo.codigoTipoTrabajo) {
      errores.push("El tipo de trabajo es requerido");
    }

    if (this.tipoTrabajo.codigoTipoTrabajo && this.tipoTrabajo.codigoTipoTrabajo == 3) {
      if (!this.portafolio.fechaTrabajoSinTorre) {
        errores.push("Fecha de trabajo sin torre es requerido");
      }
    }

    

    if (errores.length <= 0) {
      this.loading = true;
      this.loading = true;
      this.portafolio.codigoConsorcio = this.consorcio.codigoConsorcio;
      this.portafolio.codigoTipoTrabajo = this.tipoTrabajo.codigoTipoTrabajo;
      this.portafolio.codigoTipoPozo = this.tipoPozo.codigoTipoPozo;
      this.portafolio.cexCodigo = this.operadora.cexCodigo;
      this.portafolio.blqCodigo = this.bloque.blqCodigo;
      this.portafolio.camCodigo = this.campo.camCodigo;
      this.portafolio.pozCodigo = this.pozo.pozCodigo;
      
      this.portafolio.fechaRegistro = new Date(this.portafolio.fechaRegistro);
      if (this.portafolio.fechaModificacion) {
        this.portafolio.fechaModificacion = new Date(this.portafolio.fechaModificacion);
      }
      if (this.portafolio.fechaTrabajoSinTorre) {
        this.portafolio.fechaTrabajoSinTorre = new Date(this.portafolio.fechaTrabajoSinTorre);
      }
      if (this.portafolio.fechaInicio) {
        this.portafolio.fechaInicio = new Date(this.portafolio.fechaInicio);
      }
      if (this.portafolio.fechaFin) {
        this.portafolio.fechaFin = new Date(this.portafolio.fechaFin);
      }

      this.portafolio.idUsuario = this.usuario.idUsuario;

      this.dataApi.transUpdatePortafolio(this.portafolio).subscribe(data => {
        if (data == "El portafolio ha sido actualizado correctamente") {
          this.loading = false;
          this.messageService.add({ severity: 'success', detail: '' + data });
          this.closeModalEditarPortafolio();
          this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
        } else {
          this.loading = false;
          this.messageService.add({ severity: 'info', detail: '' + data });
        }
      }, (err) => {
        this.messageService.add({ severity: 'error', detail: 'Error interno' });
        this.loading = false;
        console.log(err)
      });

    } else {
      for (let i: number = 0; i < errores.length; i++) {
        this.messageService.add({ severity: 'error', detail: errores[i] });
      }
    }



  }

  goToBuscarPortafolio() {
    this.busquedaService.portafolio = null;
    this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
  }

  openModalEditarPortafolio(template: TemplateRef<any>) {
    this.portafolio.motivoCambio = ""
    this.editarPortafolioModalRef = this.modalService.show(template, { class: 'modal-sm', backdrop: 'static', keyboard: false });
  }

  closeModalEditarPortafolio() {
    this.editarPortafolioModalRef.hide();
  }

}
