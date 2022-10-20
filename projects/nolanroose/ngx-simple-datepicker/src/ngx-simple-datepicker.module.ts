import {NgModule} from '@angular/core';
import {NgxSimpleDatepickerComponent} from './components/ngx-simple-datepicker.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OnlyNumberDirective} from './directives/only-number.directive';
import {DateHelper} from './helpers/date.helper';
import {FormHelper} from './helpers/form.helper';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
  declarations: [NgxSimpleDatepickerComponent, OnlyNumberDirective],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TextMaskModule],
  exports: [NgxSimpleDatepickerComponent],
  providers: [DateHelper, FormHelper]
})
export class NgxSimpleDatepickerModule {}
