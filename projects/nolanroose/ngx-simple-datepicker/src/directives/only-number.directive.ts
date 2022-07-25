import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[ngxOnlyNumber]'
})
export class OnlyNumberDirective {
  constructor() {}

  @HostListener('keypress', ['$event'])
  public onInput(event: any) {
    const pattern = /\d/;
    const inputChar = String(event.key);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
