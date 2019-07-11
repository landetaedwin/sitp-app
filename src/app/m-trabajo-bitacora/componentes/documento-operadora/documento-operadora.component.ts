import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from "primeng/api";
import { DocumentoOperadora} from "src/app/entidades/documentoOperadora";
import {Usuario} from "src/app/m-login/entidades/usuario";
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/m-login/servicios/login.service';
import { DocumentoOperadoraService } from "../../servicios/documento-operadora-service";

@Component({
  selector: 'app-documento-operadora',
  templateUrl: './documento-operadora.component.html',
  styleUrls: ['./documento-operadora.component.css']
})
export class DocumentoOperadoraComponent implements OnInit {
  public loading = false;
  estadoList: SelectItem[] = [];
  documentoOperadora = new DocumentoOperadora;
  today = new Date();
  usuario: Usuario;
  
  
  constructor(documentoOperadoraService: DocumentoOperadoraService, private messageService: MessageService, public loginService: LoginService, public router: Router) {
    this.estadoList = [{ label: "Seleccione", value: null, disabled: true }];
   }
  ngOnInit() {
    this.loading = true;

    this.usuario = this.loginService.sessionValue;
        if (!this.usuario) {
      this.router.navigate(['/login']);
    }
  }

  guardarDocumentoOperadora(){
    debugger;
    this.loading = true;
   // this.documentoOperadora.asunto= this.as
  }

}
