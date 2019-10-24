
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { Portafolio } from 'src/app/entidades/portafolio';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { BuscarPortafolioService } from '../../servicios/buscar-portafolio.service';
//import { EditarPortafolioService } from '../../servicios/editar-portafolio.service';
import { InformeTrabajoOperadoraService} from '../../servicios/informe-trabajo-operadora.service';
import{VerificarFechasService} from '../../servicios/verificar-fechas.service';
import{VerificarNovedadService} from '../../servicios/verificarNovedad.service';
import{VerificarProduccionService} from '../../servicios/verificar-produccion.service';
import { CrearPortafolioService } from '../../servicios/crear-portafolio.service';
import { Campo } from 'src/app/entidades/campo';
import { Pozo } from 'src/app/entidades/pozo';

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


  constructor(public buscarPortafolioService: BuscarPortafolioService, private messageService: MessageService, public loginService: LoginService, public router: Router, public informeOperadoraService: InformeTrabajoOperadoraService, public verificarFechasService: VerificarFechasService, public verificarNovedadService :VerificarNovedadService, public verificarProduccionService: VerificarProduccionService) { 

    this.pozoList = [{ label: "Seleccione", value: null, disabled: true }];
    this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
  }

  ngOnInit() {
 
    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
   this.buscarPortafolioService.findCamposList().subscribe(
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
      this.busquedaParametros.pozo = this.pozo.pozNombre;
    }

    this.buscarPortafolioService.findPortafolioList(this.busquedaParametros).subscribe((data: Portafolio[]) => {
      if (data) {
        this.portafolioList = data;
        this.busquedaParametros.numeroPortafolio = null;
        this.busquedaParametros.pozo = null;
        this.busquedaParametros.fechaDesde = null;
        this.busquedaParametros.fechaHasta = null;
        this.busquedaParametros.funcionario = null;
        this.campo = null;
        this.pozo = null;
        this.loading = false;
      } else {
       // console.log(data.length);
        this.messageService.add({ severity: 'info', detail: 'No se encontraron datos' });
        this.busquedaParametros.numeroPortafolio = null;
        this.busquedaParametros.pozo = null;
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
      this.buscarPortafolioService.findPozoByCamCodigo(campo.camCodigo).subscribe(
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
    this.informeOperadoraService.portafolio= portafolio;
      this.router.navigate(['/menu', { outlets: { sitp: ['informeOperadora'] } }]);
  }
  verificarFechas(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarFechasService.portafolio= portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificacionFechas'] } }]);
  }

  verificarNovedad(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarNovedadService.portafolio= portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarNovedad'] } }]);
  }

  verificarProduccion(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarProduccionService.portafolio= portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarProduccion'] } }]);
  }


  verificarTasa(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarNovedadService.portafolio= portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarTasa'] } }]);
  }

  verificarInyector(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarNovedadService.portafolio= portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarInyector'] } }]);
  }

  verificarReinyector(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarNovedadService.portafolio= portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarReinyector'] } }]);
  }
  verificarTrabajo(portafolio: Portafolio) {
    console.log("click");
    console.log(portafolio);
    this.verificarNovedadService.portafolio= portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarTrabajo'] } }]);
  }
}
