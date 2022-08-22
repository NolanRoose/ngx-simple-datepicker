import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {Datepicker} from 'vanillajs-datepicker';
import {AbstractControl, ControlValueAccessor, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {DateHelper} from '../helpers/date.helper';
import {FormHelper} from '../helpers/form.helper';
import fr from '../locale/fr';
import es from '../locale/es';
import {Settings} from 'luxon';
import {MaskPipe} from 'ngx-mask';

@Component({
  selector: 'ngx-simple-datepicker',
  templateUrl: './ngx-simple-datepicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NgxSimpleDatepickerComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: NgxSimpleDatepickerComponent
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class NgxSimpleDatepickerComponent implements ControlValueAccessor, Validator, AfterViewInit, OnDestroy {
  @ViewChild('dpContainer')
  public dpContainer!: ElementRef;

  @Input()
  public form!: FormGroup; // FormGroup that contains the form controls

  @Input()
  public inputKey!: string; // Key for id and formControlName

  @Input()
  public placeholder?: string = '';

  @Input()
  public formGlobalError = false; // to handle the case in which the entire form is in error and apply a style accordingly

  @Input()
  public language = 'fr';

  public datepicker?: Datepicker;

  public value?: Date;
  public displayedValue = '';

  public hasFocus = false;
  public disabled = false;
  public touched = false;

  public onChange!: (date?: Date) => void;
  public onTouched!: () => void;

  public dateH = DateHelper;
  public formH = FormHelper;
  public mask = 'd0/M0/0000';
  private maskRegex = new RegExp('[0-9]{2}/[0-9]{2}/[0-9]{4}');

  constructor(private readonly maskPipe: MaskPipe) {
    Object.assign(Datepicker.locales, fr, es);

    // Set the zone to use another than French zone
    // Because => https://github.com/microsoft/TypeScript/issues/32265#issuecomment-509275445
    Settings.defaultZone = 'Europe/Berlin';
  }

  public ngAfterViewInit(): void {
    this.createDatepicker();
  }

  public ngOnDestroy(): void {
    if (this.datepicker) {
      this.datepicker.destroy();
    }

    try {
      // eslint-disable-next-line prefer-destructuring
      const dt = this.dpContainer.nativeElement.getElementsByTagName('input')[0];
      dt.removeEventListener('changeDate', this.onDateChange.bind(this));
    } catch (e) {
      console.error('Error: ', e);
    }
  }

  public onModelChange(dateStr: string) {
    if (!dateStr) {
      return;
    }

    const date = this.maskPipe.transform(dateStr, this.mask);
    const dateIso = this.maskRegex.test(date) ? this.dateH.formattedDateToIsoDate(date) : 'Invalid date';
    const currentDateIso = this.value ? this.dateH.jsDateToIsoDate(this.value) : 'Invalid date';

    if (this.dateH.isoDatesHasDiff(currentDateIso, dateIso)) {
      this.markAsTouched();
      this.value = this.dateH.isoDateStringToJSDate(dateIso);
      this.onChange(this.value);
    }
  }

  public onDateChange(event: CustomEvent): void {
    if (!event.detail || !event.detail.date) {
      return;
    }

    const isoDate = this.dateH.jsDateToIsoDate(event.detail.date);
    if (!this.value || this.dateH.isoDatesHasDiff(this.dateH.jsDateToIsoDate(this.value), isoDate)) {
      const jsDate = this.dateH.isoDateStringToJSDate(isoDate);

      this.value = jsDate;
      this.displayedValue = this.valueToDisplayedValue(jsDate);

      this.onChange(jsDate);
    }
  }

  public writeValue(date?: Date): void {
    this.value = date;
    this.displayedValue = this.valueToDisplayedValue(date);
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    const {value} = control;
    if (!this.dateH.isValidDate(value)) {
      return {
        invalidDate: true
      };
    }
    return null;
  }

  public openDatepicker(): void {
    if (this.disabled) {
      return;
    }

    if (this.value) {
      this.datepicker?.setDate(this.dateH.jsDateToFormattedDate(this.value, this.datepicker?.config.format as string));
    } else {
      this.datepicker?.setDate({clear: true});
      this.datepicker?.update();
    }

    this.datepicker?.show();
  }

  public registerOnChange(fn: (date?: Date) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onFocus(value: boolean): void {
    this.hasFocus = value;
  }

  private valueToDisplayedValue(value?: Date): string {
    if (!value) {
      return '';
    }

    if (!this.dateH.isValidDate(value)) {
      return this.displayedValue;
    }

    const isoDate = this.dateH.jsDateToIsoDate(value);
    return this.dateH.isoDateStringToFormattedDate(isoDate);
  }

  private markAsTouched() {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  private createDatepicker(): void {
    try {
      // eslint-disable-next-line prefer-destructuring
      const dt = this.dpContainer.nativeElement.getElementsByTagName('input')[0];

      dt.addEventListener('changeDate', this.onDateChange.bind(this));

      this.datepicker = new Datepicker(dt, {
        autohide: true,
        showOnClick: false,
        showOnFocus: false,
        language: this.language,
        orientation: 'bottom right',
        format: 'dd/MM/yyyy',
        daysOfWeekHighlighted: [0, 6],
        todayHighlight: true,
        updateOnBlur: false,
        nextArrow: '<i class="ngx-sdp ngx-sdp-angle-right"></i>',
        prevArrow: '<i class="ngx-sdp ngx-sdp-angle-left"></i>'
      });
    } catch (e) {
      console.error('Error: ', e);
    }
  }
}
