import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Customer, iCustomer } from '../models/customer.model';
import { CustomerService } from '../interfaces/customer.service';
import { CustomerServiceImpl } from './customer-service-impl.service';
import { LocalStorageService } from './local-storage.service';
import { ResponseCode } from 'src/app/models/response-code.enum';

function createCustomer(customer?: iCustomer): Customer {
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#fetchAll customer list at the beginning is empty', () => {
    let customerList = service.fetchAll().data;

    expect(customerList.length).toEqual(0);
  });

  describe('#insert', () => {
    beforeEach(() => {
      localStorageService.resetStorage();
    });

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

      expect(response.statusCode).toEqual(ResponseCode.BAD_REQUEST);
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
