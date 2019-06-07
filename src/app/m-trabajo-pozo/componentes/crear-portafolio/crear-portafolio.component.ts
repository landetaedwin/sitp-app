import { Component, OnInit } from "@angular/core";
import { MessageService, SelectItem } from "primeng/api";
import { Bloque } from "src/app/entidades/bloque";
import { Campo } from "src/app/entidades/campo";
import { Operadora } from 'src/app/entidades/operadora';
import { Pozo } from "src/app/entidades/pozo";
import { TipoPozo } from "src/app/entidades/tipo-pozo";
import { CrearPortafolioService } from "../../servicios/crear-portafolio.service";
import { Consorcio } from 'src/app/entidades/consorcio';
import { TipoTrabajo } from 'src/app/entidades/tipo-trabajo';

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
  numeroList: SelectItem[] = [];
  campo: Campo;
  pozo: Pozo;
  consorcio: Consorcio;
  tipoPozo: TipoPozo;
  tipoTrabajo: TipoTrabajo;
  bloque: Bloque = new Bloque;
  operadora: Operadora = new Operadora;
  tst: boolean = true;

  constructor(
    public crearPortafolioService: CrearPortafolioService,
    private messageService: MessageService
  ) {
    this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.tipoPozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.consorcioList = [{ label: "Seleccione", value: null, disabled: true }];
    this.tipoTrabajoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.numeroList = [{ label: "Seleccione", value: null, disabled: true }];



  }

  ngOnInit() {
    this.loading = true;
    this.crearPortafolioService.findTipoPozoList().subscribe(
      (data: TipoPozo[]) => {
        let tp: TipoPozo;
        for (let i in data) {
          tp = data[i];
          this.tipoPozoList.push({
            label: tp.tipoPozo,
            value: tp.codigoTipoPozo
          });
        }
        this.loading = false;
      }
    );

    this.crearPortafolioService.findCamposList().subscribe(
      (data: Campo[]) => {
        let c: Campo;
        for (let i in data) {
          c = data[i];
          this.campoList.push({ label: c.camNombre, value: c });
        }
        this.loading = false;
      });
    this.crearPortafolioService.findConsorcioList().subscribe(
      (data: Consorcio[]) => {
        let con: Consorcio;
        for (let i in data) {
          con = data[i];
          this.consorcioList.push({ label: con.consorcio, value: con });
        }
        this.loading = false;
      });

    this.crearPortafolioService.findTrabajoList().subscribe(
      (data: TipoTrabajo[]) => {
        let tt: TipoTrabajo;
        for (let i in data) {
          tt = data[i];
          this.tipoTrabajoList.push({ label: tt.tipoTrabajo, value: tt });
        }
        this.loading = false;
      });

      this.cargarNumeroList();

    this.bloque.bqlNombre = "n/a";
    this.operadora.cexApellidoPaterno = "n/a";
  }

  cargarNumeroList() {
    debugger
    for (let i: number = 0; i < 10; i++) {
      this.numeroList.push({ label: i.toString(), value: i });
    }

  }

  cargarCampoPozo(campo: Campo) {
    this.bloque.bqlNombre = "n/a";
    this.operadora.cexApellidoPaterno = "n/a";
    this.cargarBloqueByBlqCodigo(campo);
    this.cargarPozosByCamCodigo(campo);
  }

  cargarPozosByCamCodigo(campo: Campo) {
    if (campo.camCodigo) {
      this.loading = true;
      this.crearPortafolioService.findPozoByCamCodigo(campo.camCodigo).subscribe(
        (data: Pozo[]) => {
          let p: Pozo;
          this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
          for (let i in data) {
            p = data[i];
            this.pozoList.push({ label: p.pozNombre, value: p });
          }
          this.loading = false;
        });
    }

  }

  cargarBloqueByBlqCodigo(campo: Campo) {
    this.bloque.bqlNombre = "n/a";
    this.loading = true;
    if (campo.bqlCodigo) {
      this.loading = true;
      this.crearPortafolioService.findBloque(campo.bqlCodigo).subscribe(
        (data: Bloque) => {
          if (data) {
            this.bloque = data;
          }
          this.loading = false;
        });
    }

  }

  cargarOperadoraByPozCompaniaPetrolera(pozo: Pozo) {
    this.operadora.cexApellidoPaterno = "n/a";
    if (pozo.pozCompaniaPetrolera) {
      this.loading = true;
      this.crearPortafolioService.findOperadoraByCompaniaPetrolera(pozo.pozCompaniaPetrolera).subscribe(
        (data: Operadora) => {
          if (data) {
            this.operadora = data;
          }
          this.loading = false;
        });
    }
  }

  verficarTrabajoSinTorre(tipoTrabajo: TipoTrabajo) {
    if (tipoTrabajo.tipoTrabajo == 'Trabajo sin torre-TST') {
      this.tst = false;
    } else {
      this.tst = true;
    }
  }

  guardarPortafolio() {
    // this.loading = true;
  }
}
