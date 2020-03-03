import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Router } from '@angular/router';
import { SessionStorage } from 'angular-web-storage';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  usuario: Usuario = new Usuario;
  display: boolean = true;
  userNom: string = '';
  userCI: string;

  /**
   * Variables para menu dinamico.
   */

  m1: boolean = false;
  m2: boolean = false;
  m3: boolean = false;
  m4: boolean = false;
  m5: boolean = false;
  m6: boolean = false;
  m7: boolean = false;
  m8: boolean = false;
  i0: boolean = false;
  i1: boolean = false;
  i2: boolean = false;
  i3: boolean = false;
  i4: boolean = false;
  i5: boolean = false;
  i6: boolean = false;
  i7: boolean = false;
  i8: boolean = false;
  i9: boolean = false;
  i10: boolean = false;
  i11: boolean = false;
  i12: boolean = false;
  i13: boolean = false;
  i14: boolean = false;
  i15: boolean = false;
  i16: boolean = false;
  i17: boolean = false;
  i18: boolean = false;
  i19: boolean = false;
  i20: boolean = false;
  i21: boolean = false;
  i22: boolean = false;
  i23: boolean = false;


  constructor(public loginService: LoginService, public router: Router) {

  }

  ngOnInit() {

    this.usuario = this.loginService.sessionValue;

    if (!this.usuario) {
      this.router.navigate(['/login'])
    }


    if (this.usuario.nombres) {
      this.userNom = this.usuario.nombres;
    }
    if (this.usuario.apellidos) {
      this.userNom = this.userNom + " " + this.usuario.apellidos;
    }

    this.userCI = this.usuario.usuarioLogin;

    //ADMINISTRADOR

    console.log(this.usuario.perfil.codigoPerfil)
    if (this.usuario.perfil.codigoPerfil == '3') {
      this.m1 = true;
      this.m2 = true;
      this.m3 = true;
      this.m4 = true;
      this.m5 = true;
      this.m6 = true;
      this.m7 = true;
      this.m8 = true;
      this.i0 = true;
      this.i1 = true;
      this.i2 = true;
      this.i3 = true;
      this.i4 = true;
      this.i5 = true;
      this.i6 = true;
      this.i7 = true;
      this.i8 = true;
      this.i9 = true;
      this.i10 = true;
      this.i11 = true;
      this.i12 = true;
      this.i13 = true;
      this.i14 = true;
      this.i15 = true;
      this.i16 = true;
      this.i17 = true;
      this.i18 = true;
      this.i19 = true;
      this.i20 = true;
      this.i21 = true;
      this.i22 = true;
      this.i23 = true;
      this.i2 = true;

    }
    //matriz
    if (this.usuario.perfil.codigoPerfil == '1') {
      this.m1 = true;
      this.m3 = true;
      this.m6 = true;
      this.i0 = true;
      this.i1 = true;
      this.i5 = true;
      this.i6 = true;
      this.i9 = true;
      this.i11 = true;
      this.i12 = true;
      this.i13 = true;
      this.i21 = true;
      this.i22 = true;

    }
    //regional
    if (this.usuario.perfil.codigoPerfil == '1') {
      this.m1 = true;
      this.m6 = true;
      this.i0 = true;
      this.i1 = true;
      this.i4 = true;
      this.i21 = true;
      this.i22 = true;

    }
    //pagos
    if (this.usuario.perfil.codigoPerfil == '18') {
      this.m5 = true;
      this.i19 = true;
      this.i20 = true;
    }
    //tazas
    if (this.usuario.perfil.codigoPerfil == '19') {
      this.m4 = true;
      this.m6 = true;
      this.i14 = true;
      this.i15 = true;
      this.i16 = true;
      this.i17 = true;
      this.i18 = true;
      this.i21 = true;
      this.i22 = true;

    }
 

    this.items = [
      {
        label: 'Portafolio',
        visible: this.m1,
        items: [
          { label: 'Crear portafolio', routerLink: [{ outlets: { sitp: ['crearPortafolio'] } }], visible: this.i1 },
          { label: 'Buscar portafolio', routerLink: [{ outlets: { sitp: ['buscarPortafolio'] } }], visible: this.i0 },

          { label: 'Historial de pozo', routerLink: [{ outlets: { sitp: ['historialPozo'] } }], visible: this.i0 },
        ]
      },
      {
        label: 'Busqueda de portafolio anexo información',
        visible: this.m2,
        items: [
          { label: 'Infome de resultados', command: () => this.imprimirMensaje(), visible: this.i7 },
        ]
      },
      {
        label: 'Registro de tasas',
        visible: this.m4,
        items: [
          { label: 'Buscar registro de tasas', routerLink: [{ outlets: { sitp: ['registroTasas'] } }], visible: this.i14 },
        ]
      },
      {
        label: 'Pagos',
        visible: this.m5,
        items: [
          { label: 'Verificación de pagos', routerLink: [{ outlets: { sitp: ['verificarPagos'] } }], visible: this.i19 },
          { label: 'Busqueda de pagos registrados', command: () => this.imprimirMensaje(), visible: this.i20 },
        ]
      },
      {
        label: 'Bitacora',
        visible: this.m6,
        items: [
          { label: 'Informes de Verificación', routerLink: [{ outlets: { sitp: ['buscarPortafolioBitacora'] } }], visible: this.i0 }
        ]
      },
      {
        label: 'Administrador',
        visible: this.m8,
        items: [
          { label: 'Asignación de Campos', routerLink: [{ outlets: { sitp: ['asignacionCampos'] } }], visible: true },
        ]
      },

      {
        label: 'Catálogos',
        visible: this.m7,
        items: [
          { label: 'Tipo de trabajo', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Número de trabajo', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Categorización de trabajo', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Tipo de pozo', routerLink: [{ outlets: { sitp: ['mantenimiento-tipo-pozo'] } }], visible: true },
          { label: 'Asunto de documento Operadora', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Asunto de documento Ministerio', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Yacimiento', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Número de registros de producción', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Número de registros de inyección', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Acción Diaria', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Estado de Tasas', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Estado de asignación', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Estado del pago', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Valoración de cumplimiento', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Consorsio', routerLink: [{ outlets: { sitp: ['consorcios'] } }], visible: true }
        ]
      }

    ];

  }


  closeSession() {

    this.loginService.clearSession();
    this.router.navigate(['/login'])
  }

  imprimirMensaje() {
    console.log("Hola");

  }

}
