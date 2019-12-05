import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { MessageService, SelectItem } from "primeng/api";
import { Bloque } from "src/app/entidades/bloque";
import { Campo } from "src/app/entidades/campo";
import { Consorcio } from 'src/app/entidades/consorcio';
import { Operadora } from 'src/app/entidades/operadora';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Pozo } from "src/app/entidades/pozo";
import { TipoPozo } from "src/app/entidades/tipo-pozo";
import { TipoTrabajo } from 'src/app/entidades/tipo-trabajo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';
import { CreateUpdateService } from '../../servicios/create-update.service';
@Component({
  selector: "app-crear-portafolio",
  templateUrl: "./crear-portafolio.component.html",
  styleUrls: ["./crear-portafolio.component.css"]
})
export class CrearPortafolioComponent implements OnInit {
  public loading = false;
  campoList: SelectItem[] = [];
  pozoList: SelectItem[] = [];
  tipoPozoList: SelectItem[] = [];
  consorcioList: SelectItem[] = [];
  tipoTrabajoList: SelectItem[] = [];
  campo: Campo;
  pozo: Pozo;
  consorcio: Consorcio;
  tipoPozo: TipoPozo;
  tipoTrabajo: TipoTrabajo = new TipoTrabajo;
  bloque: Bloque = new Bloque;
  operadora: Operadora = new Operadora;
  usuario: Usuario;
  portafolio: Portafolio = new Portafolio;
  minDate: Date;
  maxDate: Date;

  constructor(public dataApi: CreateUpdateService, public busquedaService: BusquedaService, private messageService: MessageService, public loginService: LoginService, public router: Router) {
    this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.tipoPozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.consorcioList = [{ label: "Seleccione", value: null, disabled: true }];
    this.tipoTrabajoList = [{ label: "Seleccione", value: null, disabled: true }];
  }


  ngOnInit() {
    this.loading = true;

    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }

    this.maxDate = new Date();
    this.minDate = new Date(2010, 0, 1);


    this.initComponentes();
    this.bloque.bqlNombre = "n/a";
    this.operadora.cexApellidoPaterno = "n/a";
  }

  initComponentes() {
    this.busquedaService.getCampoList().subscribe(
      (data: Campo[]) => {
        let c: Campo;
        for (let i in data) {
          c = data[i];
          this.campoList.push({ label: c.camNombre, value: c });
        }

        this.busquedaService.getTipoPozoList().subscribe(
          (data: TipoPozo[]) => {
            let tp: TipoPozo;
            for (let i in data) {
              tp = data[i];
              this.tipoPozoList.push({
                label: tp.tipoPozo,
                value: tp
              });
            }
            this.busquedaService.getConsorcioList().subscribe(
              (data: Consorcio[]) => {
                let con: Consorcio;
                for (let i in data) {
                  con = data[i];
                  this.consorcioList.push({ label: con.consorcio, value: con });
                }
                this.busquedaService.getTipoTrabajoList().subscribe(
                  (data: TipoTrabajo[]) => {
                    let tt: TipoTrabajo;
                    for (let i in data) {
                      tt = data[i];
                      this.tipoTrabajoList.push({ label: tt.tipoTrabajo, value: tt });
                    }
                    this.loading = false;
                  });
              });
          }
        );
      });
  }

  cargarPozosByCamCodigo(campo: Campo) {
    if (campo.camCodigo) {
      this.loading = true;
      this.busquedaService.getPozoListByCamCodigo(campo.camCodigo).subscribe(
        (data: Pozo[]) => {
          let p: Pozo;
          this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
          for (let i in data) {
            p = data[i];
            this.pozoList.push({ label: p.pozNombre, value: p });
          }
          this.loading = false;
        }, err => {
          console.log(err)
          this.loading = false;
        });
    }
  }

  cargarCampoPozo(campo: Campo) {
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
        }, err => {
          console.log(err)
          this.loading = false;
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
        }, err => {
          console.log(err)
          this.loading = false;
        });
    }
  }

  guardarPortafolio() {

    let errores: string[] = [];

    if (!this.campo) {
      errores.push("El campo es requerido");
    }

    if (!this.pozo) {
      errores.push("El pozo es requerido");
    }

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
      this.portafolio.codigoConsorcio = this.consorcio.codigoConsorcio;
      this.portafolio.codigoTipoTrabajo = this.tipoTrabajo.codigoTipoTrabajo;
      this.portafolio.codigoTipoPozo = this.tipoPozo.codigoTipoPozo;
      this.portafolio.cexCodigo = this.operadora.cexCodigo;
      this.portafolio.blqCodigo = this.bloque.blqCodigo;
      this.portafolio.camCodigo = this.campo.camCodigo;
      this.portafolio.pozCodigo = this.pozo.pozCodigo;
      this.portafolio.idUsuario = this.usuario.idUsuario;


      this.dataApi.transCrearPortafolio(this.portafolio).subscribe(data => {
        if (data == "El portafolio ha sido creado correctamente") {
          this.loading = false;
          this.messageService.add({ severity: 'success', detail: '' + data });
          this.goToBuscarPortafolio()
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
    this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
  }

}
