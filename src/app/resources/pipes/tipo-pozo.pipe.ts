import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tipoPozoPipe'
})
export class TipoPozoPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        if (value == 1) {
            return "Productor"
        }
        if (value == 2) {
            return "Inyector"
        }
        if (value == 3) {
            return "Reinyector"
        }
        if (value > 3) {
            return "N/E"
        }
    }
} 