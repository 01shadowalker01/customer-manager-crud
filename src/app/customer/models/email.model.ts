import { ValueObject } from '../interfaces/value-object';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Email implements ValueObject<string> {
  private _value!: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Invalid Email.');
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  validate(value: string): boolean {
    const emailRegex = new RegExp(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    );
    return emailRegex.test(value);
  }

  toString(): string {
    return this.value;
  }
}

export function EmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    try {
      new Email(control.value);
      return null;
    } catch (error) {
      return { invalidEmail: true };
    }
  };
}
