import { ValueObject } from '../interfaces/value-object';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PhoneNumberUtil, PhoneNumberType } from 'google-libphonenumber';

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
    if (!value) {
      return false;
    }

    const phoneNumberUtil = PhoneNumberUtil.getInstance();
    let phoneNumber;
    try {
      phoneNumber = phoneNumberUtil.parseAndKeepRawInput(value, 'US');
    } catch (e) {
      return false;
    }

    if (!phoneNumberUtil.isValidNumber(phoneNumber)) {
      return false;
    }

    if (phoneNumberUtil.getNumberType(phoneNumber) !== PhoneNumberType.MOBILE) {
      return false;
    }

    return true;
  }

  toString(): string {
    return this.value;
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
