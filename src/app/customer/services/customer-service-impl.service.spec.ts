import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Customer, iCustomer } from '../models/customer.model';
import { CustomerService } from '../interfaces/customer.service';
import { CustomerServiceImpl } from './customer-service-impl.service';
import { LocalStorageService } from './local-storage.service';
import { ResponseCode } from 'src/app/models/response-code.enum';

function createCustomer(customer?: Partial<iCustomer>): Customer {
  const newCustomer: iCustomer = {
    firstName: 'Jim',
    lastName: 'Halpert',
    dateOfBirth: new Date('1978-10-1'),
    phoneNumber: '+989192415566',
    email: 'jim@gmail.com',
    bankAccountNumber: 555,
    ...customer,
  };
  return new Customer(newCustomer);
}

describe('#CustomerService', () => {
  let service: CustomerService;
  let localStorageService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CustomerService,
          useClass: CustomerServiceImpl,
        },
        {
          provide: LocalStorageService,
          useClass: MockLocalStorageService,
        },
      ],
    });
    service = TestBed.inject(CustomerService);
    localStorageService = TestBed.inject(LocalStorageService);

    localStorageService.resetStorage();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#fetchAll', () => {
    it('customer list at the beginning is empty', () => {
      let customerList = service.fetchAll().data;

      expect(customerList.length).toEqual(0);
    });

    it(`given there are two customers in database, fetches them all`, () => {
      const customer = createCustomer();
      const customer2 = createCustomer({
        firstName: 'Michael',
        lastName: 'Scott',
        email: 'm@gmail.com',
      });
      service.insert(customer);
      service.insert(customer2);
      const ids = [customer.id, customer2.id];

      const customerList = service.fetchAll().data;

      expect(customerList.length).toEqual(2);
      expect(customerList.map((c) => c.id)).toEqual(ids);
    });
  });

  describe('#insert', () => {
    it('given a customer, inserts it to database', () => {
      const customer = createCustomer();

      service.insert(customer);
      const customerList = service.fetchAll().data;

      expect(customerList.length).toEqual(1);
      expect(customerList[0].id).toEqual(customer.id);
    });

    it(`given there is a customer in database, inserts the same customer to database,
        and receives an error`, () => {
      const customer = createCustomer();
      const customer2 = createCustomer();
      service.insert(customer);

      const response = service.insert(customer2);
      const customerList = service.fetchAll().data;

      expect(response.statusCode).toEqual(ResponseCode.BAD_REQUEST);
      expect(customerList.length).toEqual(1);
    });
  });

  describe('#update', () => {
    it('given there is a customer in database, updates the customer in the database', () => {
      const customer = createCustomer();
      service.insert(customer);
      const newEmail = 'test@gmail.com';
      const updatedCustomer: Customer = new Customer({
        firstName: customer.firstName,
        lastName: customer.lastName,
        dateOfBirth: customer.dateOfBirth,
        bankAccountNumber: customer.bankAccountNumber,
        phoneNumber: customer.phoneNumber.value,
        email: newEmail,
      });

      const updateResponse = service.update(updatedCustomer);
      const fetchResponse = service.fetchById(updateResponse.data);

      expect(updateResponse.statusCode).toEqual(ResponseCode.SUCCESS);
      expect(fetchResponse.data).not.toEqual(null);
      expect(fetchResponse.data?.email.value).toEqual(newEmail);
    });

    it(`given the customer is not in database, updates the customer,
        and receives an error`, () => {
      const customer = createCustomer();

      const updateResponse = service.update(customer);

      expect(updateResponse.statusCode).toEqual(ResponseCode.BAD_REQUEST);
    });
  });

  describe('#delete', () => {
    it('given there is a customer in database, deletes the customer from the database', () => {
      const customer = createCustomer();
      service.insert(customer);

      const updateResponse = service.delete(customer.id);
      const fetchResponse = service.fetchById(updateResponse.data);

      expect(updateResponse.statusCode).toEqual(ResponseCode.SUCCESS);
      expect(fetchResponse.statusCode).toEqual(ResponseCode.NOT_FOUND);
    });

    it(`given the customer is not in database, deletes the customer,
        and receives an error`, () => {
      const customer = createCustomer();

      const updateResponse = service.delete(customer.id);

      expect(updateResponse.statusCode).toEqual(ResponseCode.BAD_REQUEST);
    });
  });
});

@Injectable()
export class MockLocalStorageService {
  private items: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.items[key];
  }

  setItem(key: string, item: string) {
    this.items[key] = item;
  }

  resetStorage() {
    this.items = {};
  }
}
