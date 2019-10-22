import { Directive, ElementRef } from '@angular/core';
const REGEXP = new RegExp(' ');

@Directive({
  selector: '[numeros-doc]'
})
export class NumerosDocDirective {

  constructor(public el: ElementRef) {
    this.el.nativeElement.onkeypress = (evt) => {
      if (REGEXP.test(evt.key)) {
        evt.preventDefault();
      }
    };
  }
}
