import { Component, OnInit } from '@angular/core';
import {Portafolio} from 'src/app/entidades/portafolio';
import { MessageService, SelectItem } from "primeng/api";
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { VerificacionFechas } from 'src/app/entidades/verificacionFechas';
import { VerificarFechasService } from 'src/app/m-trabajo-bitacora/servicios/verificar-fechas.service';
import { Router, RouterLink } from '@angular/router';
import { InformeTrabajoOperadoraService } from '../../servicios/informe-trabajo-operadora.service';

@Component({
  selector: 'app-verificacion-fechas',
  templateUrl: './verificacion-fechas.component.html',
  styleUrls: ['./verificacion-fechas.component.css']
})
export class VerificacionFechasComponent implements OnInit {
  portafolio: Portafolio;
  estadolist: SelectItem[]=[];
  justificadoList: SelectItem[]=[];
  novedadList: SelectItem[]=[];
  constructor(public informeTrabajoOperadoraService: InformeTrabajoOperadoraService, http:HttpClient, public verificacionFechaService: VerificarFechasService, private messageService: MessageService, public loginService: LoginService, public router: Router) {
  // this.portafolio = this.verificacionFechaService.portafolio;
    //this.verificarFechas.codPortafolio= this.portafolio.codigoPortafolio;
    //this.verificarFechas.fecha_inicio_trabajo = this.portafolio.fechaInicio;
    //this.verificarFechas.fecha_fin_trabajo= this.portafolio.fechaFin;

    this.portafolio = this.verificacionFechaService.portafolio;
    this.verificarFechas.valoracion=0;
    this.verificarFechas.visualizar_valoraciom="Si"

    this.estadolist= [
                      { label: "Registrado", value: 1, disabled: false },
                      { label: "Anulado", value: 2, disabled: false },
                      { label: "Cerrado", value: 3, disabled: false }
  ];

  this.justificadoList= [
    { label: "Si", value: 1, disabled: false },
    { label: "No", value: 2, disabled: false }

];
   

this.novedadList= [
  { label: "Si", value: 1, disabled: false },
  { label: "No", value: 2, disabled: false }

];

  //  this.informeOperadora.codPortafolio = this.portafolio.codigoPortafolio;

  }


  public loading = false;
  today= new Date();
  verificarFechas = new VerificacionFechas();
  usuario: Usuario;
  fechasList: VerificacionFechas[]=[];
  sumafecha : Date;

  ngOnInit() {
  

    this.verificarFechas.fecha_actualizacion = this.today
     this.loading = true;  
     
  

     if (!this.verificacionFechaService.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
    }

    this.verificarFechas.codPortafolio= this.portafolio.codigoPortafolio;
    this.obtenerTodo();
    this.verificarFechas.fecha_inicio_trabajo = this.portafolio.fechaInicio;
    this.verificarFechas.fecha_fin_trabajo= this.portafolio.fechaFin;
    this.sumafecha =new Date(this.verificarFechas.fecha_fin_trabajo);
    	
    let dieciseisDias = 1000 * 60 * 60 * 24 * 30;
    let resta = this.sumafecha.getTime() + dieciseisDias;
    this.verificarFechas.fechaPresentacion = new Date(resta)

    if (this.verificarFechas.fechaPresentacion<this.today){
      this.verificarFechas.valoracion=1;
      this.verificarFechas.visualizar_valoraciom="No"
    }

    console.log(this.verificarFechas.fechaPresentacion);

    this.usuario = this.loginService.sessionValue;
    this.fechasList= [];

    if(!this.usuario){
      this.router.navigate(['/login'])
    }
    
    this.buscarpoId();


      
  }

  buscarpoId(){
    this.verificacionFechaService.buscarporId(this.verificarFechas.codPortafolio).subscribe(
      (data: VerificacionFechas[]) => {   
      if (data) {
            console.log(data.length);
        this.fechasList = data;
        
        this.verificarFechas.justificado=null;
      
      }
        this.loading = false;

      });
  }

  
  guardarVerificarFechas(){
    this.verificarFechas.id_usuario= this.usuario.idUsuario;
    this.verificacionFechaService.transCrearVerificacionFechas(this.verificarFechas).subscribe(data =>{
      if (data) {
     //   this.fechasList = data; 
     if(this.verificarFechas.estado===1){
      this.verificarFechas.visualizar_estado="Registrado"
      console.log('x is equal to y');
    }
    if(this.verificarFechas.estado==2){
      this.verificarFechas.visualizar_estado="Anulado"
      }
      if(this.verificarFechas.estado==3){
      this.verificarFechas.visualizar_estado="Cerrado"
      }
      if(this.verificarFechas.justificado==1){
      this.verificarFechas.visualizar_justificado="Si"
      }
      if(this.verificarFechas.justificado==2){
      this.verificarFechas.visualizar_justificado="No"
      }
      if(this.verificarFechas.valoracion===0){
      this.verificarFechas.visualizar_valoraciom="Si"
      }
      if(this.verificarFechas.valoracion===1){
      this.verificarFechas.visualizar_valoraciom="No"
      }
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se creo el Informe de Verificación de Fechas' });
        this.obtenerTodo();

      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se pudo crear el informe de Verificación de Fechas' });
  
      }
    });
    }

    
    obtenerTodo(){
      this.verificacionFechaService.buscarporId(this.portafolio.codigoPortafolio).subscribe(
        (data: VerificacionFechas[]) => {   
        if (data) {
          this.fechasList = data;
          this.verificarFechas.justificado=null;
        }   
          this.loading = false;
  
        });
      }
}
