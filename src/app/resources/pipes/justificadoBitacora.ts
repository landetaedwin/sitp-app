import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'JustificadoBitacora'
})
export class JustificadoBitacoraPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        if (value == 1) {
            return "Si"
        }
        if (value == 2) {
            return "No"
        }
        if (value != 1 && value != 2 ) {
            return "No se Han registrado Datos"
        }
    }
} 


@Pipe({
    name: 'TipoNovedad'
})
export class TipoNovedadPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        if (value == '0') {
            return "Falla de Registro"
        }
        if (value == '1') {
            return "Suspensión Indefinida"
        }
        if (value == '2') {
            return "Suspensión Temporal"
        }
        if (value == '3') {
            return "Falla Operativa"
        }
   
    }
}