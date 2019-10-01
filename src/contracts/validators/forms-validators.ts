import { validate } from 'class-validator';

export class FormValidators {
  static emailValidation(email: string): string {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regexp.test(email) ? '' : 'adresa de email este invalida';
  }

  static passwordValidation(minLength: number = 3, value: string): string {
    return value && value !== ''
      ? value.length >= minLength
        ? ''
        : 'parola trebuie sa contina minim ' + minLength.toString() + ' caractere'
      : '';
  }

  static maxLengthValidation(maxLength: number, value: string): string {
    return value.length <= maxLength
      ? '*acest camp trebuie sa contina maxim ' + maxLength.toString() + ' caractere'
      : '';
  }

  static matchPasswordsValidation(password: string, passwordConfirmation: string): string {
    return password === passwordConfirmation ? '' : '*parolele trebuie sa fie identice';
  }

  static fildIsEmpty(value: string) {
    return !value || value === '' ? '*acest camp este obligatoriu' : '';
  }

  static async checkSchema(model: any, schema: string) {
    let error = await validate(schema, model);
    return error.length === 0;
  }
}
