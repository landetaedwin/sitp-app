import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reducirDecimales'
})
export class ReducirDecimaales implements PipeTransform {

    transform(value: any, args?: any): any {

       value= value.toFixed(2);

    }
} 