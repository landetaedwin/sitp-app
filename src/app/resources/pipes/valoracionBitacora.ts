import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'valoracionBitacora'
})
export class ValoracionBitacoraPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        if (value == 1) {
            return "No"
        }
        if (value == 0) {
            return "Si"
        }
      
    }
} 