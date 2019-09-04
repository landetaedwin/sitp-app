import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from "primeng/api";
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { VerificacionNovedad } from 'src/app/entidades/verificacion-novedad';
import { Portafolio } from 'src/app/entidades/portafolio';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from 'src/app/m-login/entidades/usuario';

import { VerificarNovedadService } from 'src/app/m-trabajo-bitacora/servicios/verificarNovedad.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-verificacion-novedad',
  templateUrl: './verificacion-novedad.component.html',
  styleUrls: ['./verificacion-novedad.component.css']
})
export class VerificacionNovedadComponent implements OnInit {
  portafolio: Portafolio;
  estadolist: SelectItem[] = [];
  verificacioNovedad = new VerificacionNovedad();
  novedadList: VerificacionNovedad[] = [];
  usuario: Usuario;
  hoy: Date;
  public loading = false;
  justificadoList: SelectItem[]=[];
  novedad: SelectItem[]=[];


  constructor(http: HttpClient,public verificarNovedadService: VerificarNovedadService, private messageService: MessageService, public loginService: LoginService, public router: Router) {
    this.portafolio = this.verificarNovedadService.portafolio;
    
    this.hoy = new Date();
    this.verificacioNovedad.estado=1;
    this.verificacioNovedad.justificado=1;
    this.verificacioNovedad.valoracion=1;
    
    this.estadolist = [
      { label: "Registrado", value: 1, disabled: false },
      { label: "Anulado", value: 2, disabled: false },
      { label: "Cerrado", value: 3, disabled: false }
    ];

    
    this.justificadoList= [
      { label: "Si", value: 1, disabled: false },
      { label: "No", value: 2, disabled: false }
  
  ];

  this.novedad= [
    { label: "Si", value: 1, disabled: false },
    { label: "No", value: 2, disabled: false }

];
  
  }



  ngOnInit() {
    this.verificacioNovedad.fecha_actualizacion = this.hoy;
    this.usuario = this.loginService.sessionValue;
    this.novedadList = [];

    
    if (!this.verificarNovedadService.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
    }
    
    this.verificacioNovedad.codPortafolio = this.portafolio.codigoPortafolio;
  

    // verificar si esta la sesion activa
    if (!this.usuario) {
      this.router.navigate(['/login'])
    }
    this.obtenerTodo();
    this.buscarpoId();
  }

  buscarpoId() {
    this.verificarNovedadService.buscarporId(this.verificacioNovedad.codPortafolio).subscribe(
      (data: VerificacionNovedad[]) => {
        if (data) {
          console.log(data.length);
          this.novedadList = data;

          this.verificacioNovedad.justificado = null;
          this.verificacioNovedad.observacion = null;

        }
        this.loading = false;

      });
  }


  obtenerTodo() {
    this.verificarNovedadService.buscarporId(this.portafolio.codigoPortafolio).subscribe(
      (data: VerificacionNovedad[]) => {
        if (data) {
          this.novedadList = [];
          this.novedadList = data;
          this.verificacioNovedad.justificado = null;
          this.verificacioNovedad.observacion = null;
        }
        this.loading = false;

      });
  }

  guardar(){
    this.verificacioNovedad.idUsu= this.usuario.idUsuario;
    this.verificarNovedadService.transCrearVerificacionNovedad(this.verificacioNovedad).subscribe(data =>{
      if (data) {
     //   this.fechasList = data; 
     if(this.verificacioNovedad.estado===1){
      this.verificacioNovedad.visualizar_estado="Registrado"
    }
    if(this.verificacioNovedad.estado==2){
      this.verificacioNovedad.visualizar_estado="Anulado"
      }
      if(this.verificacioNovedad.estado==3){
      this.verificacioNovedad.visualizar_estado="Cerrado"
      }

        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se creo el Informe de Verificación de Novedad' });
        this.obtenerTodo();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se pudo crear el informe de Verificación de Novedad' });
  
      }
    });
    


}
}
