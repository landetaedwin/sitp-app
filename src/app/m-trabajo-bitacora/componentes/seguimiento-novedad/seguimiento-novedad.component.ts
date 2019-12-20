import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from "primeng/api";
import { LoginService } from 'src/app/m-login/servicios/login.service';
import {SeguimientoNovedad} from 'src/app/entidades/seguimiento-novedad';
import {VerificacionNovedad} from 'src/app/entidades/verificacion-novedad';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from 'src/app/m-login/entidades/usuario';
import { SeguimientoNovedadesService } from 'src/app/m-trabajo-bitacora/servicios/seguimiento-novedades';
import { Router, RouterLink } from '@angular/router';
import { Archivo } from 'src/app/entidades/archivo';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Portafolio } from 'src/app/entidades/portafolio';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-seguimiento-novedad',
  templateUrl: './seguimiento-novedad.component.html',
  styleUrls: ['./seguimiento-novedad.component.css']
})
export class SeguimientoNovedadComponent implements OnInit {
  public loading = false;
  estadolist: SelectItem[]=[];
  entradaSalida: SelectItem[]=[];
  asuntoList: SelectItem[]=[];
  novedadList: SelectItem[]=[];
  seguimientoList: SeguimientoNovedad[]=[];
  anexolist: SeguimientoNovedad[]=[];
  usuario: Usuario;
  verificacionNovedad: VerificacionNovedad;
  seguimientoNovedad:SeguimientoNovedad= new SeguimientoNovedad();
  portafolio: Portafolio
  today: Date
  editarSeguimiento: SeguimientoNovedad = new SeguimientoNovedad();
  anularSeguimiento: SeguimientoNovedad = new SeguimientoNovedad();
  registroInfomreModalRef: BsModalRef;
  Disabled: number = 0;
  anexo1: Archivo = new Archivo;
  anexo2: Archivo = new Archivo;

  constructor(private seguimientoNovedadService: SeguimientoNovedadesService,   public http:HttpClient,  private messageService: MessageService, public loginService: LoginService, public router: Router) {
    this.seguimientoNovedad.estado=1
    this.verificacionNovedad = this.seguimientoNovedadService.verificacioNovedad;
    this.portafolio = this.seguimientoNovedadService.portafolio
    this.today= new Date();
    this.estadolist= [
                      { label: "Registrado", value: 1, disabled: false },
                      { label: "Enviado", value: 2, disabled: false },
                      { label: "Corregido", value: 3, disabled: false },
                      { label: "Enviado", value: 4, disabled: false }
  ];

  this.estadolist= [
    { label: "Registrado", value: 1, disabled: false },
    { label: "Enviado", value: 2, disabled: false },
    { label: "Corregido", value: 3, disabled: false },
    { label: "Enviado", value: 4, disabled: false }
];

this.novedadList= [
  { label: "Fechas", value: "Fechas", disabled: false },
  { label: "Tasa", value: "Tasa", disabled: false },
  { label: "Bitácora", value: "Bitácora", disabled: false },
  { label: "Objetivo", value: "Objetivo", disabled: false },
  { label: "Producción", value: "Producción", disabled: false },
  { label: "Otros", value: "Otros", disabled: false }
];

  this.asuntoList= [
    { label: "Soliciud de Información", value: "Soliciud de Información", disabled: false },
    { label: "Justificativo Técnico", value: "Justificativo Técnico", disabled: false },
    { label: "Informe para expediente", value: "Informe para expediente", disabled: false },
    { label: "Acta de reunión de Trabajo", value: "Acta de reunión de Trabajo", disabled: false }
];


  this.entradaSalida= [
    { label: "Recibido", value: "Entrada", disabled: false },
    { label: "Enviado", value: "Salida", disabled: false },
];

  

    this.seguimientoNovedad.fechaActualizacion = this.today;
  
   }

  ngOnInit() {

    this.usuario = this.loginService.sessionValue;
    if(!this.usuario){
      this.router.navigate(['/login'])
    }
    if (!this.seguimientoNovedadService.verificacioNovedad) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
    }
    this.seguimientoNovedad.entradaSalida="Entrada";
    this.seguimientoNovedad.asunto="Soliciud de Información"
    this.seguimientoNovedad.tipoNovedad="Fechas"



    this.verificacionNovedad=this.seguimientoNovedadService.verificacioNovedad
    this.verificacionNovedad.codVerfTrabajo=this.seguimientoNovedadService.verificacioNovedad.codVerfTrabajo
    this.verificacionNovedad.codVerfNov= this.seguimientoNovedadService.verificacioNovedad.codVerfNov

    console.log(this.verificacionNovedad.codVerfNov)
    this.seguimientoNovedad.codVerfTrabajo= this.verificacionNovedad.codVerfTrabajo;

    

    if (!this.portafolio) {
      this.router.navigate(['/menu', { outlets: { sitp: ['buscarPortafolioBitacora'] } }]);
    }

   this.seguimientoList= [];
   this.obtenerDatos();

  }


  guardar(){

    let errores: string[] = [];

    if (!this.seguimientoNovedad.numDoc) {
      errores.push("El campo Número de Documento es requerido");
    }
    if (!this.seguimientoNovedad.observacion) {
      errores.push("El campo Conclusión es requerido");
    }

    if (errores.length <= 0) {

    this.seguimientoNovedad.archivoInforme = new Archivo;
    this.seguimientoNovedad.idUsuario= this.usuario.idUsuario;


    if (this.anexo1.base64) {
      this.seguimientoNovedad.archivoInforme.nombre = this.anexo1.nombre;
      this.seguimientoNovedad.archivoInforme.base64 = this.anexo1.base64.substring(28);
      console.log(this.seguimientoNovedad.archivoInforme.nombre)
      console.log(this.seguimientoNovedad.archivoInforme.base64)
    }


    this.seguimientoNovedadService.transCrearSeguimientoNovedades(this.seguimientoNovedad).subscribe(data =>{
      if (data) {
        this.loading = false;
        this.messageService.add({ severity: 'success', detail: 'Se registró el Seguimiento de Novedad' });
        this.obtenerDatos();
         this.seguimientoNovedad.observacion=null;
         this.seguimientoNovedad.numDoc=null;
         this.seguimientoNovedad.documento=null;
      } else {
        this.loading = false;
        this.messageService.add({ severity: 'info', detail: 'No se puede registrar el seguimiento de Novedad' });
  
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
    this.seguimientoNovedadService.ObtenerDatos(this.seguimientoNovedad.codVerfTrabajo).subscribe(
      (data: SeguimientoNovedad[]) => {   
      if (data) {
            this.seguimientoList=data
     
  
          }   
        this.loading = false;
  
      });
  }

  showPdf(doc: string, name: string) {
    const linkSource = 'data:application/pdf;base64,' + doc;
    const downloadLink = document.createElement("a");
    const fileName = name + ".pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
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


  editSeguimiento() {
    this.loading = true;
    this.editarSeguimiento.codVerfNov= this.seguimientoNovedad.codVerfNov
    this.editarSeguimiento.documento= this.seguimientoNovedad.documento
    this.editarSeguimiento.idUsuario= this.seguimientoNovedad.idUsuario
    this.editarSeguimiento.codSegNov= this.seguimientoNovedad.codSegNov
    this.editarSeguimiento.codVerfTrabajo= this.seguimientoNovedad.codVerfTrabajo
    this.editarSeguimiento.entradaSalida= this.seguimientoNovedad.entradaSalida
    this.editarSeguimiento.estado= this.seguimientoNovedad.estado
    this.editarSeguimiento.fechaActualizacion= new Date();
    this.editarSeguimiento.numDoc= this.seguimientoNovedad.numDoc
    this.editarSeguimiento.observacion= this.seguimientoNovedad.observacion
    this.editarSeguimiento.tipoNovedad= this.seguimientoNovedad.tipoNovedad

    this.seguimientoNovedadService.transUpdateSeguimientoNovedades(this.editarSeguimiento).subscribe(data=> {
  
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

  volver(portafolio: Portafolio) {
    console.log("click");
    this.seguimientoNovedadService.portafolio = portafolio;
    this.router.navigate(['/menu', { outlets: { sitp: ['verificarNovedad'] } }]);
  }




}
