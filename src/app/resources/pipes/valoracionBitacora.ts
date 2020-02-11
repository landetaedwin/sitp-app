import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'valoracionBitacora'
})
export class ValoracionBitacoraPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        if (value == 0) {
            return "Cumple Requisitos"
        }


        if (value == 1) {
            return "No Cumple fecha de Registro"
        }

        if (value == 2) {
            return "No cumple fecha de Presentación"
        }

        if (value == 3) {
            return "No cumple fecha de Presentación ni fecha de Registro"
        }
      
    }
} 