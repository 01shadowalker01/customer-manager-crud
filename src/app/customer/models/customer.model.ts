import { Email } from './email.model';
import { PhoneNumber } from './phone-number.model';

export class Customer {
  private _id!: string;
  private _firstName!: string;
  private _lastName!: string;
  private _dateOfBirth!: Date;
  private _phoneNumber!: PhoneNumber;
  private _email!: Email;
  private _bankAccountNumber!: number;

  constructor(customer: iCustomer) {
    this.setProperties(customer);
  }

  public get id(): string {
    return this._id;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  public get phoneNumber(): PhoneNumber {
    return this._phoneNumber;
  }

  public get email(): Email {
    return this._email;
  }

  public get bankAccountNumber(): number {
    return this._bankAccountNumber;
  }

  private setProperties(customer: iCustomer) {
    this._id = this.generateId(customer);
    this._firstName = customer.firstName;
    this._lastName = customer.lastName;
    this._dateOfBirth = customer.dateOfBirth;
    try {
      this._phoneNumber = new PhoneNumber(customer.phoneNumber);
      this._email = new Email(customer.email);
    } catch (error) {
      throw new Error('Error while creating customer object: ' + error);
    }
    this._bankAccountNumber = customer.bankAccountNumber;
  }

  toJSON() {
    const customer: iCustomer & { id: string } = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      phoneNumber: this.phoneNumber.toString(),
      email: this.email.toString(),
      bankAccountNumber: this.bankAccountNumber,
    };
    return customer;
  }

  private generateId(customer: iCustomer): string {
    return customer.firstName + customer.lastName;
  }
}

export interface iCustomer {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  bankAccountNumber: number;
}
