import {FormGroup} from '@angular/forms';

export class FormHelper {
  public static inputClasses(formGroup: FormGroup, controlName: string, formGlobalError?: boolean): string {
    const control = formGroup.get(controlName);
    if (!control) {
      throw new Error(`Not found: ${controlName}`);
    }

    if ((control.dirty || control.touched) && !formGlobalError && control.value) {
      return control.valid ? 'input-valid' : 'input-invalid';
    }

    if (formGlobalError) {
      return 'input-in-form-invalid';
    }

    // control has not been touched, so it must not have a border
    return '';
  }
}
