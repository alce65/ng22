import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";

const INVALID_NAME = ["lovelace", "hopper", "ritchie", "hamilton", "knuth"];

  export const heroNameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const forbidden = INVALID_NAME.includes(control.value.toLowerCase());
    return forbidden ? { heroNameValid: { value: control.value } }: null;
  };

  export const heroNameAsyncValidator: AsyncValidatorFn = async (control: AbstractControl): Promise<ValidationErrors | null> => {
    const forbidden = INVALID_NAME.includes(control.value.toLowerCase());
    return forbidden ? { heroNameValid: { value: control.value } }: null;
  };