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
        
        if (value != 3 && value != 2 && value != 1 && value != 0) {
            return "No se ha registrado Datos"
        }
    }
} 

@Pipe({
    name: 'ValoracionNovedades'
})
export class ValoracionNovedadesPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        if (value == 1) {
            return "Cumple"
        }
        if (value == 2) {
            return "No Cumple"
        }
        if (value != 2 && value != 1 ) {
            return "No se han reh]gitrado Datos"
        }

    }
} 