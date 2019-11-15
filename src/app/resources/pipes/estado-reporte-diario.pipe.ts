import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoReporteDiario'
})
export class EstadoReporteDiarioPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value == 1) {
      return "Registrado"
    }
    if (value == 0) {
      return "Anulado"
    }
    if (value == 2) {
      return "Cerradp"
    }

  }
}