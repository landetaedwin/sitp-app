import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { EditarPortafolioService } from '../../servicios/editar-portafolio.service';
import { SelectItem } from 'primeng/api';
import { Campo } from 'src/app/entidades/campo';
import { Pozo } from 'src/app/entidades/pozo';
import { Consorcio } from 'src/app/entidades/consorcio';
import { TipoPozo } from 'src/app/entidades/tipo-pozo';
import { TipoTrabajo } from 'src/app/entidades/tipo-trabajo';
import { Bloque } from 'src/app/entidades/bloque';
import { Operadora } from 'src/app/entidades/operadora';
import { CrearPortafolioService } from '../../servicios/crear-portafolio.service';

@Component({
  selector: 'app-editar-portafolio',
  templateUrl: './editar-portafolio.component.html',
  styleUrls: ['./editar-portafolio.component.css']
})
export class EditarPortafolioComponent implements OnInit {

  public loading = false;

  usuario: Usuario;
  today = new Date();
  portafolio: Portafolio = new Portafolio;

  campoList: SelectItem[] = [];
  pozoList: SelectItem[] = [];
  tipoPozoList: SelectItem[] = [];
  consorcioList: SelectItem[] = [];
  tipoTrabajoList: SelectItem[] = [];
  numeroList: SelectItem[] = [];

  campo: Campo;
  pozo: Pozo;
  consorcio: Consorcio;
  tipoPozo: TipoPozo = new TipoPozo;
  tipoTrabajo: TipoTrabajo = new TipoTrabajo;
  bloque: Bloque = new Bloque;
  operadora: Operadora = new Operadora;
  tst: boolean = true;

  constructor(public editarPortafolioService: EditarPortafolioService, public crearPortafolioService: CrearPortafolioService, public loginService: LoginService, public router: Router) {

    this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.tipoPozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.consorcioList = [{ label: "Seleccione", value: null, disabled: true }];
    this.tipoTrabajoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.numeroList = [{ label: "Seleccione", value: null, disabled: true }];
  }

  ngOnInit() {
    this.loading = true;

    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }

    if(!this.editarPortafolioService.portafolio){
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolio'] } }]);
    }
    this.portafolio = this.editarPortafolioService.portafolio;
    


    this.crearPortafolioService.findCamposList().subscribe(
      (data: Campo[]) => {
        let c: Campo;
        for (let i in data) {
          c = data[i];
          this.campoList.push({ label: c.camNombre, value: c });
        }

        this.crearPortafolioService.findTipoPozoList().subscribe(
          (data: TipoPozo[]) => {
            let tp: TipoPozo;
            for (let i in data) {
              tp = data[i];
              this.tipoPozoList.push({
                label: tp.tipoPozo,
                value: tp
              });
            }
            this.crearPortafolioService.findConsorcioList().subscribe(
              (data: Consorcio[]) => {
                let con: Consorcio;
                for (let i in data) {
                  con = data[i];
                  this.consorcioList.push({ label: con.consorcio, value: con });
                }
                this.crearPortafolioService.findTrabajoList().subscribe(
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

    this.cargarNumeroList();
    this.bloque.bqlNombre = "n/a";
    this.operadora.cexApellidoPaterno = "n/a";



    this.campo = this.portafolio.campo;
    this.pozo = this.portafolio.pozo;
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
    if (tipoTrabajo.codigoTipoTrabajo == 2) {
      this.tst = false;
    } else {
      this.tst = true;
    }
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

}
