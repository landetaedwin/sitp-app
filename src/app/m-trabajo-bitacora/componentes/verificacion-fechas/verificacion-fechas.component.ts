import { Component, OnInit } from '@angular/core';
import {Portafolio} from 'src/app/entidades/portafolio';
import { MessageService, SelectItem } from "primeng/api";
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { VerificacionFechas } from 'src/app/entidades/verificacionFechas';
import { VerificarFechasService } from 'src/app/m-trabajo-bitacora/servicios/verificar-fechas.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-verificacion-fechas',
  templateUrl: './verificacion-fechas.component.html',
  styleUrls: ['./verificacion-fechas.component.css']
})
export class VerificacionFechasComponent implements OnInit {
  portafolio: Portafolio;
  

  constructor(public http:HttpClient, public verificacionFechaService: VerificarFechasService, private messageService: MessageService, public loginService: LoginService, public router: Router) {
  // this.portafolio = this.verificacionFechaService.portafolio;
    //this.verificarFechas.codPortafolio= this.portafolio.codigoPortafolio;
    //this.verificarFechas.fecha_inicio_trabajo = this.portafolio.fechaInicio;
    //this.verificarFechas.fecha_fin_trabajo= this.portafolio.fechaFin;

    this.estadolist= [
                      { label: "Registrado", value: 1, disabled: false },

  ];
    this.verificarFechas.fecha_actualizacion = this.today;
  //  this.informeOperadora.codPortafolio = this.portafolio.codigoPortafolio;

  }


  public loading = false;
  estadolist: SelectItem[]=[];
  today= new Date();
  verificarFechas = new VerificacionFechas();
  usuario: Usuario;
  fechasList: VerificacionFechas[]=[];

  ngOnInit() {

     //this.loading = true;
    //  this.portafolio = this.informeTrabajoOperadoraService.portafolio;
   //this.informeOperadora.codPortafolio= this.portafolio.codigoPortafolio;
    //this.informeOperadora.codPortafolio = this.portafolio.codigoPortafolio;
    this.usuario = this.loginService.sessionValue;
   this.fechasList= [];
    //this.informeOperadora= this.informeOperadora.cod_informe_operadora;

    if(!this.usuario){
      this.router.navigate(['/login'])
    }
    
   // this.verificacionFechaService.buscarporId;
    this.verificacionFechaService.buscarporId(this.verificarFechas.codPortafolio).subscribe(
      (data: VerificacionFechas[]) => {   
      if (data) {
            console.log(data.length);
    
        this.fechasList = data;
        this.verificarFechas.estado=1;
        this.verificarFechas.justificado=null;
        this.verificarFechas.observacion= null;
        this.verificarFechas.valoracion= null;
      }

         
         
        this.loading = false;

      });
      
  }

}
