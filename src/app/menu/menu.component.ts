import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  constructor() { }

  ngOnInit() {

    this.items = [
      {
        label: 'Portafolio',
        items: [
          { label: 'Crear portafolio', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Editar portafolio', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Anular portafolio', command: () => this.imprimirMensaje(), visible: true },
        ]
      },
      {
        label: 'Busqueda de portafolio anexo información',
        items: [
          { label: 'Reportes diarios', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Registro de Documentos Operadora', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Registro de Documentos Ministerio', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Infome de resultados', command: () => this.imprimirMensaje(), visible: true },
        ]
      },
      {
        label: 'Busqueda de portafolio para verificación',
        items: [
          { label: 'Verrificación de fechas', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Verificación de cumplimiento de tasas', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Verificación de producción', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Verificación de Inyección/Reinyección', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Verificación de Observaciones', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Seguimiento de observaciones', command: () => this.imprimirMensaje(), visible: true },
        ]
      },
      {
        label: 'Registro de tasas',
        items: [
          { label: 'Buscar registro de tasas', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Agregar registro de tasa', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Actualizar registro de tasa', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Editar registro de tasa', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Anular registro de tasa', command: () => this.imprimirMensaje(), visible: true },
        ]
      },
      {
        label: 'Pagos',
        items: [
          { label: 'Verificación de pagos', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Busqueda de pagos registrados', command: () => this.imprimirMensaje(), visible: true },
        ]
      },
      {
        label: 'Bitacora',
        items: [
          { label: 'Registro de novedad', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Seguimiento de la novedad', command: () => this.imprimirMensaje(), visible: true },
        ]
      },
      { label: 'Editar datos', command: () => this.imprimirMensaje(), visible: true },
      { label: 'Anular datos', command: () => this.imprimirMensaje(), visible: true },
      { label: 'Asignación de Campos', command: () => this.imprimirMensaje(), visible: true },
      {
        label: 'Catálogos',
        items: [
          { label: 'Tipo de trabajo', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Número de trabajo', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Categorización de trabajo', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Tipo de pozo', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Asunto de documento Operadora', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Asunto de documento Ministerio', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Yacimiento', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Número de registros de producción', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Número de registros de inyección', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Acción Diaria', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Estado de Tasas', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Estado de asignación', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Estado del pago', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Valoración de cumplimiento', command: () => this.imprimirMensaje(), visible: true },
          { label: 'Consorsio', command: () => this.imprimirMensaje(), visible: true }
        ]
      }

    ];

  }


  imprimirMensaje() {
    console.log("Hola");

  }

}
