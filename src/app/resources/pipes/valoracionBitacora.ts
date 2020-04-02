import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'valoracionBitacora'
})
export class ValoracionBitacoraPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        if (value == 0) {
            return "CUMPLE con fecha de Presentación de Informe de Resultados y CUMPLE con Notificacion o Solicitud de Aprobación"
        }


        if (value == 1) {
            return "CUMPLE con fecha de Presentación de Informe  de Resultados y  NO CUMPLE CON Notificación o Solicitud de Aprobación."
        }

        if (value == 2) {
            return "NO CUMPLE con fecha de Presentación de Informe  de Resultados y  CUMPLE CON Notificación o Solicitud de Aprobación."
        }

        if (value == 3) {
            return "NO CUMPLE con fecha de Presentación de Informe de Resultados y NO CUMPLE con Notificacion o Solicitud de Aprobación"
        }
        
        if (value != 3 && value != 2 && value != 1 && value != 0) {
            return "No se ha registrado Datos"
        }
    }
} 