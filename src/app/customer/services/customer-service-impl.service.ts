import { Injectable } from '@angular/core';
import { CustomerService } from 'src/app/api/customer.service';
import { Customer } from '../models/customer.model';

@Injectable()
export class CustomerServiceImpl implements CustomerService {
  constructor() {}

  insert(customer: Customer): string {
    throw new Error('Method not implemented.');
  }
  fetchById(id: string): Customer | undefined {
    throw new Error('Method not implemented.');
  }
  fetchAll(): Customer[] {
    throw new Error('Method not implemented.');
  }
  update(customer: Customer): string {
    throw new Error('Method not implemented.');
  }
  delete(id: string): string {
    throw new Error('Method not implemented.');
  }
}
