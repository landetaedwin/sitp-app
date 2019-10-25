import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { BusquedaParametros } from 'src/app/entidades/busquedaParametros';
import { SelectItem } from 'primeng/api';
import { Campo } from 'src/app/entidades/campo';
import { Pozo } from 'src/app/entidades/pozo';
import { BusquedaService } from '../../servicios/buscar-portafolio.service';

@Component({
  selector: 'app-registro-tasas',
  templateUrl: './registro-tasas.component.html',
  styleUrls: ['./registro-tasas.component.css']
})
export class RegistroTasasComponent implements OnInit {
  public loading = false;

  usuario: Usuario;
  busquedaParametros: BusquedaParametros = new BusquedaParametros;
  campoList: SelectItem[] = [];
  campo: Campo;
  pozoList: SelectItem[] = [];
  pozo: Pozo;




  constructor(public loginService: LoginService, public router: Router, private busquedaService: BusquedaService) { }

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

  openModalTasa() {

  }

  closeModalTasa() {

  }


}
