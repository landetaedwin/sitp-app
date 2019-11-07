import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoPortafolio'
})
export class EstadoPortafolioPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value == 1) {
      return "Registrado"
    }
    if (value == 0) {
      return "Anulado"
    }

  }
}
