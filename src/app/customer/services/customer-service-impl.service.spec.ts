import { TestBed } from '@angular/core/testing';

import { Customer, iCustomer } from '../models/customer.model';
import { CustomerService } from '../interfaces/customer.service';
import { CustomerServiceImpl } from './customer-service-impl.service';

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

describe('#CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CustomerService,
          useClass: CustomerServiceImpl,
        },
      ],
    });
    service = TestBed.inject(CustomerService);
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
