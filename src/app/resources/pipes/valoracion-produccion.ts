import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ValoracionProduccion'
})
export class ValoracionProduccionPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        if (value == 0) {
            return "Exitoso"
        }
        if (value == 1) {
            return "Medianamente Exitoso"
        }
        if (value == 2) {
            return "No Exitoso"
        }
    }
} 