import { Directive, ElementRef } from '@angular/core';
const REGEXP = new RegExp('[0-9]');
@Directive({
  selector: '[solo-numeros]'
})
export class SoloNumerosDirective {

  constructor(public el: ElementRef) {
    this.el.nativeElement.onkeypress = (evt) => {
      if (!REGEXP.test(evt.key)) {
        evt.preventDefault();
      }
    };
  }
}
