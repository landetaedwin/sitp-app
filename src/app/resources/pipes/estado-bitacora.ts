import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'estadoBitacora'
})
export class EstadoBitacoraPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        if (value == 1) {
            return "Registrado"
        }
        if (value == 2) {
            return "Anulado"
        }
        if (value == 3) {
            return "Cerrado"
        }
    }
} 