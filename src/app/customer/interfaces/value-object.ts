import { ValidatorFn } from '@angular/forms';

export interface ValueObject<T> {
  value: T;

  validate(): ValidatorFn;
}
