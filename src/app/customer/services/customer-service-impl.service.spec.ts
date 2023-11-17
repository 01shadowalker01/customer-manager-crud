import { TestBed } from '@angular/core/testing';

import { CustomerServiceImpl } from './customer-service-impl.service';
import { CustomerService } from 'src/app/api/customer.service';

describe('CustomerService', () => {
  let service: CustomerServiceImpl;

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
});
