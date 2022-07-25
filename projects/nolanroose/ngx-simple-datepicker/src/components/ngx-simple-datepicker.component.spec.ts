import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxSimpleDatepickerComponent} from './ngx-simple-datepicker.component';
import {MaskPipe, NgxMaskModule} from 'ngx-mask';
import {FormHelper} from '../helpers/form.helper';
import {DateHelper} from '../helpers/date.helper';

describe('NgSimpleDatepickerComponent', () => {
  let component: NgxSimpleDatepickerComponent;
  let fixture: ComponentFixture<NgxSimpleDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxSimpleDatepickerComponent],
      imports: [NgxMaskModule],
      providers: [DateHelper, FormHelper, MaskPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(NgxSimpleDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
