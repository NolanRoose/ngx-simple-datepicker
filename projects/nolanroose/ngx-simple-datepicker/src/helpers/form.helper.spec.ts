import {FormHelper} from './form.helper';
import {FormControl, FormGroup} from '@angular/forms';

describe('FormHelper', () => {
  let formGroup: FormGroup;
  const controlName = 'test';
  let formGlobalError = false;

  beforeAll(() => {
    formGroup = new FormGroup({test: new FormControl()});
  });

  beforeEach(() => {
    formGlobalError = false;
    formGroup.get(controlName)?.reset();
  });

  it('inputClasses should be return empty classe', () => {
    const classe = FormHelper.inputClasses(formGroup, controlName, formGlobalError);
    expect(classe).toBe('');
  });

  it('inputClasses should be return input-in-form-invalid classe ', () => {
    formGlobalError = true;

    const classe = FormHelper.inputClasses(formGroup, controlName, formGlobalError);
    expect(classe).toBe('input-in-form-invalid');
  });

  it('inputClasses should be return input-valid classe when has value', () => {
    formGroup.get(controlName)?.setValue('test');
    formGroup.get(controlName)?.markAsTouched();

    const classe = FormHelper.inputClasses(formGroup, controlName, formGlobalError);
    expect(classe).toBe('input-valid');
  });

  it('inputClasses should be return input-invalid classe when has errors', () => {
    formGroup.get(controlName)?.setValue('test');
    formGroup.get(controlName)?.setErrors({invalid: true});
    formGroup.get(controlName)?.markAsTouched();

    const classe = FormHelper.inputClasses(formGroup, controlName, formGlobalError);
    expect(classe).toBe('input-invalid');
  });

  it('inputClasses should be return input-in-form-invalid classe when has errors and Form was in global error', () => {
    formGroup.get(controlName)?.setValue('test');
    formGroup.get(controlName)?.setErrors({invalid: true});
    formGroup.get(controlName)?.markAsTouched();
    formGlobalError = true;

    const classe = FormHelper.inputClasses(formGroup, controlName, formGlobalError);
    expect(classe).toBe('input-in-form-invalid');
  });

  it('inputClasses should be throw error when control was not found', () => {
    expect(() => FormHelper.inputClasses(formGroup, 'fake', formGlobalError)).toThrow(new Error('Not found: fake'));
  });
});
