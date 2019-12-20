import { Component, OnInit, TemplateRef } from '@angular/core';
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
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BusquedaService } from 'src/app/m-trabajo-pozo/servicios/buscar-portafolio.service';
import { DocumentoOperadora } from 'src/app/entidades/documentoOperadora';

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
  editarInforme: InformeOperadora = new InformeOperadora();
  anularInforme: InformeOperadora = new InformeOperadora();
  
  registroInfomreModalRef: BsModalRef;
  informeOperadora = new InformeOperadora();
  fechaArch= this.informeOperadora.fechaOficio;
  Disabled: number = 0;
  anexo1: Archivo = new Archivo;
  anexo2: Archivo = new Archivo;
 
  constructor(private modalService: BsModalService,public busquedaService:BusquedaService, public verificarFechasService: VerificarFechasService, public editarInformeOperadoraService: EditarInformeOperadoraService,  public http:HttpClient, public informeTrabajoOperadoraService: InformeTrabajoOperadoraService, private messageService: MessageService, public loginService: LoginService, public router: Router) {
  this.informeOperadora.estado=1
    this.portafolio = this.informeTrabajoOperadoraService.portafolio;
    this.estadolist= [
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

    
    if(!this.portafolio.fechaFin || !this.portafolio.fechaInicio){
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
      this.messageService.add({ severity: 'warn', detail: 'No se ha establecido una fecha de inicio o fin de actividades' });
    }

  
    this.informeOperadora.codPortafolio= this.portafolio.codigoPortafolio;

   this.informelist= [];
   this.informeTrabajoOperadoraService.ObtenerDatos(this.informeOperadora.codPortafolio).subscribe(
      (data: InformeOperadora[]) => {   
      if (data) {
        this.informelist=data
            console.log(this.informeOperadora.fecha_actualizacion);
           
           if (data.length!==0) {
            this.messageService.add({ severity: 'warn', detail: 'Ya existe un informe asignado en este pozo' });
            this.Disabled = 1;
          }

          }       
        this.loading = false;

      });


  }

  


  
guardarInformeTrabajo(){

  let errores: string[] = [];

    if (!this.informeOperadora.costo_real) {
      errores.push("El campo Costo Real es requerido");
    }
    if (!this.informeOperadora.fechaArch) {
      errores.push("El campo Fecha Arch es requeido");
    }

    if (!this.informeOperadora.fechaOficio) {
      errores.push("El campo fecha oficio es requerido");
    }
    if (!this.informeOperadora.numeroOficio) {
      errores.push("El campo numero de Oficio es requerido");
    }

    if (!this.informeOperadora.numeroSgc) {
      errores.push("El campo No. SGC es requerido");
    }

    if (!this.informeOperadora.rig) {
      errores.push("El campo Rig es requerido");
    }

  
  

    
    if (errores.length <= 0) {

  this.loading= true;
  this.informeOperadora.id_usuario= this.usuario.idUsuario;
  this.portafolio = this.informeTrabajoOperadoraService.portafolio;
  this.informeOperadora.codPortafolio= this.portafolio.codigoPortafolio;
  this.informeOperadora.fecha_actualizacion = new Date(this.today);
  this.informeOperadora.estado=1
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
    else {

      for (let i: number = 0; i < errores.length; i++) {
        this.messageService.add({ severity: 'error', detail: errores[i] });
      }

    }

}

obtenerDatos(){   
  this.Disabled = 0;
  this.informeTrabajoOperadoraService.ObtenerDatos(this.informeOperadora.codPortafolio).subscribe(
    (data: InformeOperadora[]) => {   
    if (data) {
          this.informelist=data
         if (data.length!==0) {
          this.messageService.add({ severity: 'warn', detail: 'Ya existe un informe asignado en este pozo' });
          this.Disabled = 1;
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



showPdf(doc: string, name: string) {
  const linkSource = 'data:application/pdf;base64,' + doc;
  const downloadLink = document.createElement("a");
  const fileName = name + ".pdf";
  console.log(downloadLink);
  console.log(linkSource);
  console.log(linkSource);

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

editInforme() {
  this.loading = true;
  this.editarInforme.anexoDocumento = this.informeOperadora.anexoDocumento;
  this.editarInforme.archivoAnexo = this.informeOperadora.archivoAnexo;
  this.editarInforme.codInformeOperadora= this.informeOperadora.codInformeOperadora;
  this.editarInforme.costo_real= this.informeOperadora.costo_real;
  this.editarInforme.estado= this.informeOperadora.estado
  this.editarInforme.fechaArch= new Date(this.informeOperadora.fechaArch)
  this.editarInforme.fechaOficio= new Date (this.informeOperadora.fechaOficio)
  this.editarInforme.fecha_actualizacion= new Date();
  this.editarInforme.id_usuario= this.usuario.idUsuario;
  this.editarInforme.numeroOficio=this.informeOperadora.numeroOficio
  this.editarInforme.numeroSgc= this.informeOperadora.numeroSgc
  this.editarInforme.resultado= this.informeOperadora.resultado
  this.editarInforme.rig= this.informeOperadora.rig
  this.informeTrabajoOperadoraService.transUpdateInformeOperadora(this.editarInforme).subscribe(data=> {

    if (data == "El informe ha sido actualizado correctamente") {
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: '' + data });
     // this.closeModalNovedadAnular();
      this.obtenerDatos();

    } else {
      this.loading = false;
      this.messageService.add({ severity: 'info', detail: '' + data });
    }
  });
}

AnularInforme() {
  this.informeOperadora.anexoDocumento= this.anularInforme.anexoDocumento
  this.informeOperadora.anexo_Oficio= this.anularInforme.anexo_Oficio
  this.informeOperadora.archivoInforme= this.anularInforme.archivoInforme
  this.informeOperadora.archivoAnexo=this.anularInforme.archivoAnexo
  this.informeOperadora.codInformeOperadora=this.anularInforme.codInformeOperadora
  this.informeOperadora.codPortafolio= this.anularInforme.codPortafolio
  this.informeOperadora.costo_real= this.anularInforme.costo_real
  this.informeOperadora.estado= 4
  this.informeOperadora.fecha_actualizacion= new Date();
  this.informeOperadora.id_usuario= this.anularInforme.id_usuario
  this.informeOperadora.numeroOficio= this.anularInforme.numeroOficio
  this.informeOperadora.numeroSgc= this.anularInforme.numeroSgc
  this.informeOperadora.resultado= this.anularInforme.resultado
  this.informeOperadora.rig= this.anularInforme.rig
  this.informeOperadora.fechaArch= new Date(this.anularInforme.fechaArch)
  this.informeOperadora.fechaOficio=new Date(this.anularInforme.fechaOficio)
  this.loading = true;

  console.log(this.informeOperadora)
  this.informeTrabajoOperadoraService.transUpdateInformeOperadora(this.informeOperadora)
  .subscribe(data => {
    if (data ) {
      this.loading = false;
      this.messageService.add({ severity: 'success', detail: 'Novedad Anulada' });
      this.informeOperadora.anexoDocumento= null
      this.informeOperadora.anexo_Oficio= null
      this.informeOperadora.archivoInforme= null
      this.informeOperadora.archivoAnexo=null
      this.informeOperadora.costo_real= null
      this.informeOperadora.numeroOficio= null
      this.informeOperadora.numeroSgc= null
      this.informeOperadora.resultado= null
      this.informeOperadora.rig= null
      this.informeOperadora.fechaArch= null
      this.informeOperadora.fechaOficio=null
      this.closeModalInformeAnular();
      this.obtenerDatos();
    } else {
      this.loading = false;
      this.messageService.add({ severity: 'Error', detail: 'No se ha podido anular'});
   //   this.closeModalNovedadAnular();
    }
  });
}


openModalInformeAnular(template: TemplateRef<any>,eInforme:InformeOperadora) {
  this.anularInforme = this.cloneJSON(eInforme);
  this.registroInfomreModalRef = this.modalService.show(template, { class: 'modal-sm', backdrop: 'static', keyboard: false });
  this.obtenerDatos();
}

closeModalInformeAnular() {
  this.registroInfomreModalRef.hide();
}


cloneJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
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