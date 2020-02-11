import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'JustificadoBitacora'
})
export class JustificadoBitacoraPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        if (value == 1) {
            return "SI"
        }
        if (value == 2) {
            return "NO"
        }
    }
} 