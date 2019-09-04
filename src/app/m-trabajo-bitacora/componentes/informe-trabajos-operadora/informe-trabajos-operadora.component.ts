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
  buttonDisabled: boolean = false;
  private archivoSeleccioando: File;



  constructor(public editarInformeOperadoraService: EditarInformeOperadoraService,  public http:HttpClient, public informeTrabajoOperadoraService: InformeTrabajoOperadoraService, private messageService: MessageService, public loginService: LoginService, public router: Router) {
    
    this.estadolist= [
                      { label: "Registrado", value: 1, disabled: false },
                      { label: "Creado", value: 1, disabled: false },

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

    this.portafolio = this.informeTrabajoOperadoraService.portafolio;
    this.informeOperadora.codPortafolio= this.portafolio.codigoPortafolio;

    //this.loading = true;
    //  this.portafolio = this.informeTrabajoOperadoraService.portafolio;
   //this.informeOperadora.codPortafolio= this.portafolio.codigoPortafolio;
    //this.informeOperadora.codPortafolio = this.portafolio.codigoPortafolio;

   this.informelist= [];
    //this.informeOperadora= this.informeOperadora.cod_informe_operadora;

   

    this.informeTrabajoOperadoraService.findDocument;
    this.informeTrabajoOperadoraService.buscarporId(this.informeOperadora.codPortafolio).subscribe(
      (data: InformeOperadora[]) => {   
      if (data) {
            console.log(data.length);
           
           if (data.length!==0) {
            this.messageService.add({ severity: 'warn', detail: 'Ya existe un informe asignado en este pozo' });
            this.buttonDisabled = true;
          }

        this.informelist = data;
        this.informeOperadora.numeroOficio= null;
       
        this.informeOperadora.fechaArch=null;
        this.informeOperadora.fechaOficio=null;
        this.informeOperadora.rig=null;
        this.informeOperadora.numeroSgc=null;
        this.informeOperadora.costo_real=null;
        this.informeOperadora.anexoDocumento=null;
         this.informeOperadora.anexo_Oficio=null;
         this.informeOperadora.codPortafolio;
         this.informeOperadora.costo_real=null;
          }

         
         
        this.loading = false;

      });


  }

  

guardarInformeTrabajo(){


  //debugger;
  this.loading= true;
  this.informeOperadora.id_usuario= this.usuario.idUsuario;
  this.portafolio = this.informeTrabajoOperadoraService.portafolio;
  this.informeOperadora.codPortafolio= this.portafolio.codigoPortafolio;
  console.log("Clicked");
  console.log(this.informeOperadora);
  //this.buttonDisabled = true;
  this.informeTrabajoOperadoraService.transCrearTrabajoOperdora(this.informeOperadora).subscribe(data =>{
    if (data) {
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Se creo el Informe' });
    //  this.router.navigate(['/menu',{outlets: {sitp: ['BuscarinformeTrabajoOperadora']}}]);
    } else {
      this.loading = false;
      this.messageService.add({ severity: 'info', detail: 'No se pudo crear el informe' });

    }

//this.informeOperadora2.anexoDocumento=" 4488";

this.informeTrabajoOperadoraService.buscarporId(this.informeOperadora.codPortafolio).subscribe(

  (data: InformeOperadora[]) => {
  if (data) {
  this.subirArchivo();
   this.informelist = data;
   this.informeOperadora.numeroOficio= null;
   this.informeOperadora.fechaArch=null;
   this.informeOperadora.rig=null;
   this.informeOperadora.numeroSgc=null;
   this.informeOperadora.costo_real=null;
   this.informeOperadora.anexoDocumento=null;
    this.informeOperadora.anexo_Oficio=null;
    this.informeOperadora.codPortafolio;
    this.informeOperadora.costo_real=null;
    }
    this.loading = false;
  });
  });

  



}

subirArchivo(){
  this.informeTrabajoOperadoraService.subirArchivo(this.archivoSeleccioando, this.informeOperadora.codPortafolio).subscribe(informeOperadora=>{
    this.informeOperadora = this.informeOperadora;
    console.log("Se ha subido el archivo exitosamente");
  }
    
    )
} 

seleccionarArchivo(event){
this.archivoSeleccioando = event.target.files[0];
}


editarInformeOperadora(informeOperadora: InformeOperadora) {
  console.log("click");
  this.editarInformeOperadoraService.informeOperadora = informeOperadora;
  this.router.navigate(['/menu', { outlets: { sitp: ['editarInformeOperadora'] } }]);
}


}