import {NgModule} from '@angular/core';
import {NgxSimpleDatepickerComponent} from './components/ngx-simple-datepicker.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IConfig, MaskPipe, NgxMaskModule} from 'ngx-mask';
import {OnlyNumberDirective} from './directives/only-number.directive';
import {DateHelper} from './helpers/date.helper';
import {FormHelper} from './helpers/form.helper';

const maskConfig: Partial<IConfig> = {
  validation: false,
  placeHolderCharacter: '_',
  dropSpecialCharacters: true
};

@NgModule({
  declarations: [NgxSimpleDatepickerComponent, OnlyNumberDirective],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxMaskModule.forRoot(maskConfig)],
  exports: [NgxSimpleDatepickerComponent],
  providers: [DateHelper, FormHelper, MaskPipe]
})
export class NgxSimpleDatepickerModule {}
