
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService, SelectItem } from 'primeng/api';
import {Portafolio} from 'src/app/entidades/portafolio';
import { InformeTrabajoOperadoraService } from '../../servicios/informe-trabajo-operadora.service';
import { Archivo } from 'src/app/entidades/archivo';
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { InformeOperadora } from 'src/app/entidades/informe-operadora';
import { EditarInformeOperadoraService } from '../../servicios/editar-InformeOperadora.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
  minDate: Date;
  maxDate: Date;
  confirmModalRef: BsModalRef;
  
@Component({
  selector: 'app-editar-informe-operadora',
  templateUrl: './editar-informe-operadora.component.html',
  styleUrls: ['./editar-informe-operadora.component.css']
})
export class EditarInformeOperadoraComponent implements OnInit {
  public loading = false;
  estadolist: SelectItem[]=[];
  usuario: Usuario;
  today = new Date();
  informeOperadora: InformeOperadora = new InformeOperadora;
  codInformeOperadora: number;
  codPortafolio: number;
  numeroSgc: string;
  numeroOficio: string;
  anexoDocumento:string;
  anexo_Oficio: string;
  fechaOficio: Date;
  fechaArch: Date;
  resultado: number;
  costo_real: number;
  estado: number;
  fecha_actualizacion: Date;
  id_usuario: number;
  rig: string;
  editarInforme: InformeOperadora = new InformeOperadora();
  minDate: Date;
  maxDate: Date;
  confirmModalRef: BsModalRef;
  portafolio: Portafolio;
  anexo1: Archivo = new Archivo;
  anexo2: Archivo = new Archivo;

  constructor( public editarOperadora: EditarInformeOperadoraService,  private messageService: MessageService, private modalService: BsModalService, public editarInformeOperadora: InformeTrabajoOperadoraService, public loginService: LoginService, public router: Router) { 
  
    this.estadolist= [
      { label: "Registrado", value: 1, disabled: false },
      { label: "Activo", value: 2, disabled: false },
      { label: "Inactivo", value: 3, disabled: false },
      { label: "Suspendido", value: 4, disabled: false },
    ];
   

  }

  ngOnInit() {

    
    this.portafolio = this.editarInformeOperadora.portafolio;
    this.informeOperadora=this.editarOperadora.informeOperadora

    this.usuario = this.loginService.sessionValue;
    
    if (!this.usuario) {
      
      this.router.navigate(['/login']);
    }

  
   
    if (!this.editarOperadora.informeOperadora) {
      this.router.navigate(['/menu', { outlets: { sitp: ['informeOperadora'] } }]);
    }
     
  }

  guardarInformeTrabajo() {

  this.informeOperadora.archivoAnexo = new Archivo;
  this.informeOperadora.archivoInforme = new Archivo;


     
  this.loading = true;
  this.editarInforme.codPortafolio= this.portafolio.codigoPortafolio;
  this.editarInforme.archivoAnexo=this.informeOperadora.archivoAnexo
  this.editarInforme.archivoInforme=this.informeOperadora.archivoInforme
  this.editarInforme.anexoDocumento = this.informeOperadora.anexoDocumento;
  this.editarInforme.anexo_Oficio = this.informeOperadora.anexo_Oficio;
  this.editarInforme.codInformeOperadora= this.informeOperadora.codInformeOperadora
  this.editarInforme.costo_real= this.informeOperadora.costo_real;
  this.editarInforme.estado= this.informeOperadora.estado
  this.editarInforme.fecha_actualizacion= new Date();
  this.editarInforme.fechaArch= new Date(this.informeOperadora.fechaArch)
  this.editarInforme.fechaOficio= new Date (this.informeOperadora.fechaOficio)
  this.editarInforme.id_usuario= this.usuario.idUsuario;
  this.editarInforme.numeroOficio=this.informeOperadora.numeroOficio
  this.editarInforme.numeroSgc= this.informeOperadora.numeroSgc
  this.editarInforme.resultado= this.informeOperadora.resultado
  this.editarInforme.rig= this.informeOperadora.rig
  


  if (this.anexo1.base64) {
    this.informeOperadora.archivoInforme.nombre = this.anexo1.nombre;
    this.informeOperadora.archivoInforme.base64 = this.anexo1.base64.substring(28);
    this.editarInforme.archivoInforme.nombre=      this.informeOperadora.archivoInforme.nombre
    this.editarInforme.archivoInforme.base64=      this.informeOperadora.archivoInforme.base64

  if (this.anexo2.base64) {
    this.informeOperadora.archivoAnexo.nombre = this.anexo2.nombre;
    this.informeOperadora.archivoAnexo.base64 = this.anexo2.base64.substring(28);
    this.editarInforme.archivoAnexo.nombre=      this.informeOperadora.archivoAnexo.nombre
    this.editarInforme.archivoAnexo.base64=      this.informeOperadora.archivoAnexo.base64
  }
  //else{
   // this.editarInforme.archivoAnexo = this.informeOperadora.archivoAnexo;
  //}
}


    this.editarInformeOperadora.transUpdateInformeOperadora(this.editarInforme).subscribe(data=> {
  
      if (data) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Datos Actualizados'});
       // this.closeModalNovedadAnular();

  
      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'Error al Actualizar los datos' });
      }
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

volver(informeOperadora: InformeOperadora) {
  console.log("click");
  this.editarInformeOperadora.informeOperadora = informeOperadora;
  this.router.navigate(['/menu', { outlets: { sitp: ['informeOperadora'] } }]);
}

// metodo para llamar al componente
 

  }