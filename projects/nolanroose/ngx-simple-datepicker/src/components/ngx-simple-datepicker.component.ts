import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {Datepicker} from 'vanillajs-datepicker';
import {AbstractControl, ControlValueAccessor, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {DateHelper} from '../helpers/date.helper';
import {FormHelper} from '../helpers/form.helper';
import fr from '../locale/fr';
import es from '../locale/es';

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
  public displayedValue?: string;

  public hasFocus = false;
  public disabled = false;
  public touched = false;
  private maskFilled = false;

  public onChange!: (date: Date) => void;
  public onTouched!: () => void;

  public dateH = DateHelper;
  public formH = FormHelper;
  public mask = 'd0/M0/0000';
  private maskRegex = new RegExp('[0-9]{2}/[0-9]{2}/[0-9]{4}');

  constructor() {
    Object.assign(Datepicker.locales, fr, es);
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

  public registerOnChange(fn: (date?: Date) => void): void {
    this.onChange = (newDate: Date) => {
      this.writeValue(newDate);
      fn(this.value);
    };
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(date: Date): void {
    this.value = date;
    this.displayedValue = this.valueToDisplayedValue(date);
  }

  public inputEvent(event: any): void {
    const {value} = event.target;
    this.maskFilled = this.maskRegex.test(value);
    const isoDate = this.maskFilled ? this.dateH.formattedDateToIsoDate(value) : 'Invalid date';

    if (!this.value || this.dateH.isoDatesHasDiff(this.dateH.jsDateToIsoDate(this.value), isoDate)) {
      this.onChange(this.dateH.isoDateStringToJSDate(isoDate));
    }
  }

  public openDatepicker(): void {
    if (this.disabled) {
      return;
    }

    if (this.value) {
      this.datepicker?.setDate(this.dateH.jsDateToFormattedDate(this.value, this.datepicker?.config.format as string));
    }

    this.datepicker?.show();
  }

  public onDateChange(event: CustomEvent): void {
    const isoDate = this.dateH.jsDateToIsoDate(event.detail.date);
    if (!this.value || this.dateH.isoDatesHasDiff(this.dateH.jsDateToIsoDate(this.value), isoDate)) {
      this.onChange(this.dateH.isoDateStringToJSDate(isoDate));
    }
  }

  public onFocus(value: boolean): void {
    if (value) {
      this.markAsTouched();
    }

    this.hasFocus = value;
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

  private valueToDisplayedValue(value: Date): string | undefined {
    if (!this.dateH.isValidDate(value)) {
      return this.displayedValue;
    }

    const isoDate = this.dateH.jsDateToIsoDate(value);
    return this.dateH.isoDateStringToFormattedDate(isoDate);
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
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
