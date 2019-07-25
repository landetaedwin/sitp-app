import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from "primeng/api";
import { LoginService } from 'src/app/m-login/servicios/login.service';
import {InformeOperadora} from 'src/app/entidades/informe-operadora';
import {Portafolio} from 'src/app/entidades/portafolio';

import { Usuario } from 'src/app/m-login/entidades/usuario';
import { InformeTrabajoOperadoraService } from 'src/app/m-trabajo-bitacora/servicios/informe-trabajo-operadora.service';
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
  selectedEstado: string = 'Registrado';



  constructor(public informeTrabajoOperadoraService: InformeTrabajoOperadoraService, private messageService: MessageService, public loginService: LoginService, public router: Router) {
    this.portafolio = this.informeTrabajoOperadoraService.portafolio;
    this.informeOperadora.codPortafolio= this.portafolio.codigoPortafolio;

    this.estadolist= [
                      { label: "Registrado", value: 1, disabled: false },

  ];
    this.informeOperadora.fecha_actualizacion = this.today;
  //  this.informeOperadora.codPortafolio = this.portafolio.codigoPortafolio;

  }

  ngOnInit() {
    //this.loading = true;
    //  this.portafolio = this.informeTrabajoOperadoraService.portafolio;
   //this.informeOperadora.codPortafolio= this.portafolio.codigoPortafolio;
    //this.informeOperadora.codPortafolio = this.portafolio.codigoPortafolio;
    this.usuario = this.loginService.sessionValue;

    //this.informeOperadora= this.informeOperadora.cod_informe_operadora;

    if(!this.usuario){
      this.router.navigate(['/login'])
    }
    this.informeTrabajoOperadoraService.findDocument;
    this.informeTrabajoOperadoraService.buscarporId(this.informeOperadora.codPortafolio).subscribe(
      (data: InformeOperadora[]) => {
      if (data) {
        this.informelist = data;
        this.informeOperadora.numeroOficio= null;
        this.informeOperadora.estado=1;
        this.informeOperadora.fechaArch=null;
        this.informeOperadora.fechaOficio=null;
        this.informeOperadora.rig=null;
        this.informeOperadora.numeroSgc=null;
        this.informeOperadora.costo_real=null;
        this.informeOperadora.anexoDocumento=null;
         this.informeOperadora.anexo_Oficio=null;
         this.informeOperadora.codPortafolio;
         this.informeOperadora.costo_real=null;
      //   this.informeOperadora.cod_informe_operadora= t
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

  });

  this.informeTrabajoOperadoraService.buscarporId(9).subscribe(

    (data: InformeOperadora[]) => {


    if (data) {
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




}
}



                                                    //this.informeTrabajoOperadoraService.findDocument(this.informeOperadora.cod_informe_operadora).subscribe(

                                                    //  (data: InformeOperadora[]) => {


                                                    //  if (data) {
                                                      // this.informelist = data;
                                                        //this.informeOperadora.anexoDocumento
                                                        //this.informeOperadora.cod_porafolio=null;
                                                        //  this.informeOperadora.costo_real=null
                                                          //this.informeOperadora.estado=null;
                                                          //this.informeOperadora.fecha_actualizacion=null;
                                                        //}
                                                        //this.loading = false;

                                                      //});
                                                  //}

                                                  //this.informeTrabajoOperadoraService.findDocument(this.informeOperadora.cod_informe_operadora).subscribe(

                                                  //  (data: InformeOperadora[]) => {
