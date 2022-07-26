import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {Datepicker} from 'vanillajs-datepicker';
import {AbstractControl, ControlValueAccessor, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {DateHelper} from '../helpers/date.helper';
import {FormHelper} from '../helpers/form.helper';
import fr from '../locale/fr';
import {MaskPipe} from 'ngx-mask';
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

  public mask = 'd0/M0/0000';

  public datepicker?: Datepicker;
  public value?: Date;
  public displayedValue?: string;
  public disabled = false;
  public touched = false;

  public onChange!: (date: string) => void;
  public onTouched!: () => void;

  public dateH = DateHelper;
  public formH = FormHelper;
  public hasFocus = false;

  constructor(private readonly maskPipe: MaskPipe) {
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
    this.onChange = (date: string) => {
      this.writeValue(date);
      if (date) {
        this.value = this.dateH.stringToDate(date);
        fn(this.value);
      }
    };
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public inputEvent(event: any): void {
    this.onChange(event.target.value);
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(date: string): void {
    this.displayedValue = this.maskPipe.transform(date, this.mask);
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
    this.datepicker?.setDate(this.value);
    this.datepicker?.show();
  }

  public onDateChange(date: CustomEvent): void {
    const dateString = this.dateH.formatDateToShortDate(date.detail.date);
    this.onChange(dateString);
  }

  public onFocus(value: boolean): void {
    if (value) {
      this.markAsTouched();
    }

    this.hasFocus = value;
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
        format: 'dd/mm/yyyy',
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
