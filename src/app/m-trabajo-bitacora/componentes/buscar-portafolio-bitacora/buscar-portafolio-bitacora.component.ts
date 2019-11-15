
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Bloque } from 'src/app/entidades/bloque';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { Campo } from 'src/app/entidades/campo';
import { Operadora } from 'src/app/entidades/operadora';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Pozo } from 'src/app/entidades/pozo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { BusquedaService } from 'src/app/m-trabajo-pozo/servicios/buscar-portafolio.service';
//import { EditarPortafolioService } from '../../servicios/editar-portafolio.service';
import { InformeTrabajoOperadoraService } from '../../servicios/informe-trabajo-operadora.service';
import { VerificarFechasService } from '../../servicios/verificar-fechas.service';
import { VerificarProduccionService } from '../../servicios/verificar-produccion.service';
import { VerificarNovedadService } from '../../servicios/verificarNovedad.service';
import { ConclusionesRecomendaciones } from '../../servicios/conclusiones-recomendaciones.service';

@Component({
  selector: 'app-buscar-portafolio-bitacora',
  templateUrl: './buscar-portafolio-bitacora.component.html',
  styleUrls: ['./buscar-portafolio-bitacora.component.css']
})
export class BuscarPortafolioBitacoraComponent implements OnInit {
  public loading = false;

  page_size: number = 8;
  page_number: number = 1;


  busquedaParametros: BusquedaParametros = new BusquedaParametros;
  usuario: Usuario;
  portafolioList: Portafolio[] = [];
  pozoList: SelectItem[] = [];
  pozo: Pozo;
  campoList: SelectItem[] = [];
  campo: Campo;


  constructor(public conclusionService:ConclusionesRecomendaciones ,public busquedaService: BusquedaService, private messageService: MessageService, public loginService: LoginService, public router: Router, public informeOperadoraService: InformeTrabajoOperadoraService, public verificarFechasService: VerificarFechasService, public verificarNovedadService: VerificarNovedadService, public verificarProduccionService: VerificarProduccionService) {

    this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
  }

  ngOnInit() {

    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
    this.busquedaService.getCampoList().subscribe(
      (data: Campo[]) => {
        let c: Campo;
        for (let i in data) {
          c = data[i];
          this.campoList.push({ label: c.camNombre, value: c });
        }
      });

  }

  buscarPortafolio() {
    this.loading = true;
    this.portafolioList = [];
    if (this.pozo) {
      this.busquedaParametros.pozo = this.pozo.pozCodigo;
    }
    if (this.campo) {
      this.busquedaParametros.campo = this.campo.camCodigo;
    }
    this.busquedaService.getPortafolioList(this.busquedaParametros).subscribe((data: Portafolio[]) => {
      if (data) {

        let dataAux: Portafolio[] = [];

        for (let i: number = 0; i < data.length; i++) {
          if (!data[i].operadora) {
            data[i].operadora = new Operadora;
            data[i].operadora.cexCodigo = null;
            data[i].operadora.cexApellidoPaterno = "N/A";
          }
          if (!data[i].bloque) {
            data[i].bloque = new Bloque;
            data[i].bloque.blqCodigo = null;
            data[i].bloque.bqlNombre = "N/A";
          }
          dataAux.push(data[i]);
        }
        this.portafolioList = dataAux;
        this.busquedaParametros.numeroPortafolio = null;
        this.busquedaParametros.pozo = null;
        this.busquedaParametros.campo = null;
        this.busquedaParametros.fechaDesde = null;
        this.busquedaParametros.fechaHasta = null;
        this.busquedaParametros.funcionario = null;
        this.campo = null;
        this.pozo = null;
        this.loading = false;
      } else {
        this.messageService.add({ severity: 'info', detail: 'No se encontraron datos' });
        this.busquedaParametros.numeroPortafolio = null;
        this.busquedaParametros.pozo = null;
        this.busquedaParametros.campo = null;
        this.busquedaParametros.fechaDesde = null;
        this.busquedaParametros.fechaHasta = null;
        this.busquedaParametros.funcionario = null;
        this.campo = null;
        this.pozo = null;
        this.loading = false;
      }
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
        });
    }
  }

  getPozoListByCamCodigo(campo: Campo) {
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
        });
    }

  }



  informeOperadora(portafolio: Portafolio) {
    //  this.editarPortafolioService.portafolio = portafolio;
    this.informeOperadoraService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['informeOperadora'] } }]);
  }
  verificarFechas(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarFechasService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificacionFechas'] } }]);
  }

  verificarNovedad(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarNovedadService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarNovedad'] } }]);
  }

  verificarProduccion(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarProduccionService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarProduccion'] } }]);
  }


  verificarTasa(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarNovedadService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarTasa'] } }]);
  }

  verificarInyector(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarNovedadService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarInyector'] } }]);
  }

  verificarReinyector(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarNovedadService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarReinyector'] } }]);
  }
  verificarTrabajo(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarNovedadService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarTrabajo'] } }]);
  }

  conclusion(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.conclusionService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['conclusiones'] } }]);
  }
}
