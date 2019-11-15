import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'estadoOperadora'
})
export class EstadoInforme implements PipeTransform {

    transform(value: any, args?: any): any {

        if (value == 1) {
            return "Registrado"
        }
        if (value == 2) {
            return "Activo"
        }
        if (value == 3) {
            return "Inactivo"
        }

        if (value == 4) {
            return "Suspendido"
        }
    }
} 