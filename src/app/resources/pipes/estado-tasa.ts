import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'estadoTasa'
})
export class EstadoTasaPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        if (value == 1) {
            return "Activo"
        }
        if (value == 0) {
            return "Derogado"
        }

    }
}
