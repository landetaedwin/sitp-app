import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoCAT'
})
export class EstadoCatalogo implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value == 1) {
      return "Registrado"
    }
    if (value == 0) {
      return "Anulado"
    }

  }
}


@Pipe({
  name: 'estadoPago'
})
export class EstadoPago implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value == 1) {
      return "Registrado"
    }
    if (value == 2) {
      return "Verificado"
    }
    if (value == 0) {
      return "Anulado"
    }

  }
}
