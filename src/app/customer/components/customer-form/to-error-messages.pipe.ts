import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'toErrorMessages',
})
export class ToErrorMessagesPipe implements PipeTransform {
  transform(errors: ValidationErrors | null | undefined): string[] {
    if (!errors) return [];
    return Object.keys(errors).map(
      (err) => errorMessages[err] || 'Invalid input'
    );
  }
}

const errorMessages: { [key: string]: string } = {
  required: 'This field is required.',
  minlength: 'The input is too short.',
  invalidEmail: 'The email is invalid.',
};
