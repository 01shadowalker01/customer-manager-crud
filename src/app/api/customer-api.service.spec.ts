import { TestBed } from '@angular/core/testing';

import { CustomerApiService } from './customer-api.service';
import { Customer, iCustomer } from '../customer/models/customer.model';

function createCustomer(): Customer {
  const newCustomer: iCustomer = {
    firstName: 'Jim',
    lastName: 'Halpert',
    dateOfBirth: new Date('1978-10-1'),
    phoneNumber: '+989192415566',
    email: 'jim@gmail.com',
    bankAccountNumber: 555,
  };
  return new Customer(newCustomer);
}

describe('CustomerApiService', () => {
  let service: CustomerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#fetchAll customer list at the beginning is empty', () => {
    let customerList = service.fetchAll();

    expect(customerList.length).toEqual(0);
  });

  describe('#insert', () => {
    it('given a customer, inserts it to database', () => {
      const customer = createCustomer();

      service.insert(customer);
      const customerList = service.fetchAll();

      expect(customerList.length).toEqual(1);
      expect(customerList[0].id).toEqual(customer.id);
    });
  });
});
