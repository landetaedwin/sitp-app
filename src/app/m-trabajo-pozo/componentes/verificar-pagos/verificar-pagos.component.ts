import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { Campo } from 'src/app/entidades/campo';
import { Pago } from 'src/app/entidades/pago';
import { Pozo } from 'src/app/entidades/pozo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';

@Component({
  selector: 'app-verificar-pagos',
  templateUrl: './verificar-pagos.component.html',
  styleUrls: ['./verificar-pagos.component.css']
})
export class VerificarPagosComponent implements OnInit {
  public loading = false;

  usuario: Usuario;
  campoList: SelectItem[] = [];
  campo: Campo;
  pozoList: SelectItem[] = [];
  pozo: Pozo;
  param: BusquedaParametros = new BusquedaParametros;

  pagoList: Pago[] = []


  constructor(private busquedaService: BusquedaService, private loginService: LoginService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.loading = true;

    this.usuario = this.loginService.sessionValue;
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }

    this.getCampoList();
  }

  getCampoList() {
    this.busquedaService.getCampoList().subscribe(
      (data: Campo[]) => {
        let c: Campo;
        this.campoList = [{ label: "Seleccione", value: null, disabled: true }];
        for (let i in data) {
          c = data[i];
          this.campoList.push({ label: c.camNombre, value: c });
        }
        this.loading = false;
      });
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

  getPagoList() {
    this.loading = true;
    this.pagoList = [];

    if (this.pozo) {
      this.param.pozo = this.pozo.pozCodigo;
    }
    if (this.campo) {
      this.param.campo = this.campo.camCodigo;
    }
    this.busquedaService.getPagoList(this.param).subscribe((data: Pago[]) => {
      if (data.length > 0) {
        this.pagoList = data;
        this.param.pozo = null;
        this.param.campo = null;
        this.campo = null;
        this.pozo = null;
        this.param = new BusquedaParametros;
        this.loading = false;
      } else {
        this.messageService.add({ severity: 'info', detail: 'No se encontraron datos' });
        this.param.pozo = null;
        this.param.campo = null;
        this.campo = null;
        this.pozo = null;
        this.param = new BusquedaParametros;
        this.loading = false;
      }


    })
  }


  showPdf(doc: string, name: string) {
    const linkSource = 'data:application/pdf;base64,' + doc;
    const downloadLink = document.createElement("a");
    const fileName = name + ".pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
