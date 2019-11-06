import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from "primeng/api";
import { LoginService } from 'src/app/m-login/servicios/login.service';
import {InformeOperadora} from 'src/app/entidades/informe-operadora';
import {Portafolio} from 'src/app/entidades/portafolio';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { InformeTrabajoOperadoraService } from 'src/app/m-trabajo-bitacora/servicios/informe-trabajo-operadora.service';
import { EditarInformeOperadoraService } from 'src/app/m-trabajo-bitacora/servicios/editar-InformeOperadora.service';
import { Router, RouterLink } from '@angular/router';
import { VerificarFechasService } from 'src/app/m-trabajo-bitacora/servicios/verificar-fechas.service';
import { Archivo } from 'src/app/entidades/archivo';

@Component({
  selector: 'app-informe-trabajos-operadora',
  templateUrl: './informe-trabajos-operadora.component.html',
  styleUrls: ['./informe-trabajos-operadora.component.css']
})
export class InformeTrabajosOperadoraComponent implements OnInit {
  public loading = false;
  estadolist: SelectItem[]=[];
  informelist: InformeOperadora[]=[];
  anexolist: InformeOperadora[]=[];
  usuario: Usuario;
  portafolio: Portafolio;
  informeOperadora2 : InformeOperadora;
  today= new Date();


  informeOperadora = new InformeOperadora();
  fechaArch= this.informeOperadora.fechaOficio;
  buttonDisabled: boolean = false;
  anexo1: Archivo = new Archivo;
  anexo2: Archivo = new Archivo;
 
  constructor(public verificarFechasService: VerificarFechasService, public editarInformeOperadoraService: EditarInformeOperadoraService,  public http:HttpClient, public informeTrabajoOperadoraService: InformeTrabajoOperadoraService, private messageService: MessageService, public loginService: LoginService, public router: Router) {
    this.portafolio = this.informeTrabajoOperadoraService.portafolio;
    this.estadolist= [
                      { label: "Seleccione...", value: 0, disabled: false },                
                      { label: "Registrado", value: 1, disabled: false },
                      { label: "Activo", value: 2, disabled: false },
                      { label: "Inactivo", value: 3, disabled: false },
                      { label: "Suspendido", value: 4, disabled: false }

  ];
    this.informeOperadora.fecha_actualizacion = this.today;
  //  this.informeOperadora.codPortafolio = this.portafolio.codigoPortafolio;

  }

  ngOnInit() {
    this.usuario = this.loginService.sessionValue;
    if(!this.usuario){
      this.router.navigate(['/login'])
    }
    
    if (!this.informeTrabajoOperadoraService.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
    }

  
    this.informeOperadora.codPortafolio= this.portafolio.codigoPortafolio;

    //this.loading = true;
    //  this.portafolio = this.informeTrabajoOperadoraService.portafolio;
   //this.informeOperadora.codPortafolio= this.portafolio.codigoPortafolio;
    //this.informeOperadora.codPortafolio = this.portafolio.codigoPortafolio;

   this.informelist= [];
    //this.informeOperadora= this.informeOperadora.cod_informe_operadora;

   


    this.informeTrabajoOperadoraService.ObtenerDatos(this.informeOperadora.codPortafolio).subscribe(
      (data: InformeOperadora[]) => {   
      if (data) {
        this.informelist=data
            console.log(data.length);
           
           if (data.length!==0) {
            this.messageService.add({ severity: 'warn', detail: 'Ya existe un informe asignado en este pozo' });
            this.buttonDisabled = true;
          }

          }

         
         
        this.loading = false;

      });


  }

  


  
guardarInformeTrabajo(){


  this.loading= true;
  this.informeOperadora.id_usuario= this.usuario.idUsuario;
  this.portafolio = this.informeTrabajoOperadoraService.portafolio;
  this.informeOperadora.codPortafolio= this.portafolio.codigoPortafolio;
  this.informeOperadora.fecha_actualizacion = new Date();

  this.informeOperadora.archivoAnexo = new Archivo;
  this.informeOperadora.archivoInforme = new Archivo;

  if (this.anexo1.base64) {
    this.informeOperadora.archivoInforme.nombre = this.anexo1.nombre;
    this.informeOperadora.archivoInforme.base64 = this.anexo1.base64.substring(28);
  }
  if (this.anexo2.base64) {
    this.informeOperadora.archivoAnexo.nombre = this.anexo2.nombre;
    this.informeOperadora.archivoAnexo.base64 = this.anexo2.base64.substring(28);
  }
  
  //this.buttonDisabled = true;
  this.informeTrabajoOperadoraService.transCrearInformeOperadora(this.informeOperadora).subscribe(data =>{
    if (data) {

      this.obtenerDatos();
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se creo el Informe' });
    //  this.router.navigate(['/menu',{outlets: {sitp: ['BuscarinformeTrabajoOperadora']}}]);
    } else {
      this.loading = false;
      this.messageService.add({ severity: 'info', detail: 'No se pudo crear el informe' });

    }

  });

}

obtenerDatos(){
  this.informeTrabajoOperadoraService.ObtenerDatos(this.informeOperadora.codPortafolio).subscribe(
    (data: InformeOperadora[]) => {   
    if (data) {
          
          this.informelist=data
         if (data.length!==0) {
          this.messageService.add({ severity: 'warn', detail: 'Ya existe un informe asignado en este pozo' });
          this.buttonDisabled = true;
        }

        }

       
       
      this.loading = false;

    });
}




onChangeAnexo1(e) {
  var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
  var reader = new FileReader();
  reader.onload = this._onChangeAnexo1.bind(this);
  reader.readAsDataURL(file);
  this.anexo1.nombre = file.name;
}

_onChangeAnexo1(e) {
  let reader = e.target;
  this.anexo1.base64 = reader.result;
}

onChangeAnexo2(e) {
  var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
  var reader = new FileReader();
  reader.onload = this._onChangeAnexo2.bind(this);
  reader.readAsDataURL(file);
  this.anexo2.nombre = file.name;
}

_onChangeAnexo2(e) {
  let reader = e.target;
  this.anexo2.base64 = reader.result;
}




volver(portafolio: Portafolio) {
  console.log("click");
//this.busquedaService.portafolio = portafolio;
//  this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
this.informeTrabajoOperadoraService.portafolio=portafolio;
this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
}


siguiente(portafolio: Portafolio) {
  console.log("click");
  this.verificarFechasService.portafolio = portafolio;
  this.router.navigate(['/menu', { outlets: { sitp: ['verificacionFechas'] } }]);
}

editarInformeOperadora(informeOperadora: InformeOperadora) {
  console.log("click");
  this.editarInformeOperadoraService.informeOperadora = informeOperadora;
  this.router.navigate(['/menu', { outlets: { sitp: ['editarInformeOperadora'] } }]);
}




}