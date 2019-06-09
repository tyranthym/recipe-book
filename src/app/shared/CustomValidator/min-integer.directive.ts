import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[appMinInteger][formControlName],[appMinInteger][formControl],[appMinInteger][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinIntegerDirective, multi: true }]
})
export class MinIntegerDirective {

  constructor() { }

  @Input() appMinInteger: string;

  validate(control: FormControl): { [key: string]: any } {
    const value = control.value;
    return (value < this.appMinInteger) ? { 'appMinInteger': true } : null;
  }

}
