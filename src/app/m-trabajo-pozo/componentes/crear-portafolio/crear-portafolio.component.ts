import { Component, OnInit } from "@angular/core";
import { SelectItem, MessageService } from "primeng/api";
import { CrearPortafolioService } from "../../servicios/crear-portafolio.service";
import { Campo } from "src/app/entidades/campo";
import { Pozo } from "src/app/entidades/pozo";
import { TipoPozo } from "src/app/entidades/tipo-pozo";
import { Bloque } from "src/app/entidades/bloque";

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
  campo: Campo;
  bloque:Bloque;

  constructor(
    public crearPortafolioService: CrearPortafolioService,
    private messageService: MessageService
  ) {
    this.campoList = [{ label: "Seleccione", value: null }];
    this.pozoList = [{ label: "Seleccione", value: null }];
    this.tipoPozoList = [{ label: "Seleccione", value: null }];
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
      },
      err => {
        this.messageService.add({ severity: "error", detail: "Error interno" });
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
      },
      err => {
        this.messageService.add({ severity: "error", detail: "Error interno" });
        this.loading = false;
      }
    );
  }


  cargarCampoPozo(campo:Campo){
    this.cargarBloqueByBlqCodigo(campo);
    this.cargarPozosByCamCodigo(campo);
  }

  cargarPozosByCamCodigo(campo: Campo) {
    this.loading = true;
    this.crearPortafolioService.findPozoByCamCodigo(campo.camCodigo).subscribe(
      (data: Pozo[]) => {
        let p: Pozo;
        this.pozoList = [{ label: "Seleccione", value: null }];
        for (let i in data) {
          p = data[i];
          this.pozoList.push({ label: p.pozNombre, value: p.pozCodigo });
        }
        this.loading = false;
      },
      err => {
        this.messageService.add({ severity: "error", detail: "Error interno" });
        this.loading = false;
      }
    );
  }

  cargarBloqueByBlqCodigo(campo: Campo) {
    this.loading = true;
    debugger
    this.crearPortafolioService.findBloque(campo.bqlCodigo).subscribe(
      (data: Bloque) => {
        if(data){

        }
        this.loading = false;
      },
      err => {
        this.messageService.add({ severity: "error", detail: "Error interno" });
        this.loading = false;
      }
    );
  }

  guardarPortafolio() {
    // this.loading = true;
  }
}
