import { Component, OnInit } from '@angular/core';
import {Portafolio} from 'src/app/entidades/portafolio';
import { MessageService, SelectItem } from "primeng/api";
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { VerificacionFechas } from 'src/app/entidades/verificacionFechas';
import { VerificarFechasService } from 'src/app/m-trabajo-bitacora/servicios/verificar-fechas.service';
import { Router, RouterLink } from '@angular/router';
import { BusquedaService } from 'src/app/m-trabajo-pozo/servicios/buscar-portafolio.service';
import { InformeTrabajoOperadoraService } from '../../servicios/informe-trabajo-operadora.service';

@Component({
  selector: 'app-editar-verificacion-fechas',
  templateUrl: './editar-verificacion-fechas.component.html',
  styleUrls: ['./editar-verificacion-fechas.component.css']
})
export class EditarVerificacionFechasComponent implements OnInit {
  portafolio: Portafolio;
  estadolist: SelectItem[]=[];
  justificadoList: SelectItem[]=[];
  novedadList: SelectItem[]=[];


  constructor(public busquedaService:BusquedaService,  http:HttpClient, public verificacionFechaService: VerificarFechasService, private messageService: MessageService, public loginService: LoginService, public router: Router) {


    this.verificarFechas.valoracion=1;
    this.verificarFechas.visualizar_valoraciom="No Cumple"

    this.estadolist= [
                      { label: "Seleccione...", value: null, disabled: false },
                      { label: "Registrado", value: 1, disabled: false },
                      { label: "Anulado", value: 2, disabled: false },
                      { label: "Cerrado", value: 3, disabled: false }
  ];

  this.justificadoList= [
    { label: "Seleccione...", value: null, disabled: false },
    { label: "Si", value: 1, disabled: false },
    { label: "No", value: 2, disabled: false }

];
   

this.novedadList= [
  { label: "Seleccione...", value: null, disabled: false },
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

    if (!this.verificacionFechaService.verificarFechas) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
    }
    this.portafolio = this.verificacionFechaService.portafolio;
    this.verificarFechas=this.verificacionFechaService.verificarFechas
  

    this.verificarFechas.codPortafolio= this.portafolio.codigoPortafolio;
    this.obtenerTodo();
    this.verificarFechas.fecha_inicio_trabajo = this.portafolio.fechaInicio;
    this.verificarFechas.fecha_fin_trabajo= this.portafolio.fechaFin;
    this.sumafecha =new Date(this.verificarFechas.fecha_fin_trabajo);
    	
    let dieciseisDias = 1000 * 60 * 60 * 24 * 30;
    let resta = this.sumafecha.getTime() + dieciseisDias;
    this.verificarFechas.fechaPresentacion = new Date(resta)

    if (this.verificarFechas.fechaPresentacion<this.today){
      this.verificarFechas.valoracion=0;
    }

    console.log(this.verificarFechas);

    this.usuario = this.loginService.sessionValue;
    this.fechasList= [];

    if(!this.usuario){
      this.router.navigate(['/login'])
    }
    
      
  }



  guardarVerificarFechas(){
    this.verificarFechas.id_usuario= this.usuario.idUsuario;
    this.verificacionFechaService.transUpdateVerificacionFechas(this.verificarFechas).subscribe(data =>{
      if (data) {
     //   this.fechasList = data; 
     if(this.verificarFechas.estado===1){
      this.verificarFechas.visualizar_estado="Registrado"
      console.log('x is equal to y');
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
            }   
          this.loading = false;
  
        });
      }

      volver(verificacionFechas: VerificacionFechas) {
        console.log("click");
        this.verificacionFechaService.verificarFechas = verificacionFechas;
        this.router.navigate(['/menu', { outlets: { sitp: ['verificacionFechas'] } }]);
      }

  
}
