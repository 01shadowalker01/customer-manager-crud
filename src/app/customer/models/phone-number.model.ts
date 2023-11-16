import { ValueObject } from '../interfaces/value-object';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PhoneNumber implements ValueObject<string> {
  private _value!: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Invalid PhoneNumber.');
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  validate(value: string): boolean {
    return true;
  }
}

export function PhoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    try {
      new PhoneNumber(control.value);
      return null;
    } catch (error) {
      return { invalidPhoneNumber: true };
    }
  };
}
