import { Customer } from '../customer/models/customer.model';

export interface CustomerAPI {
  insert(customer: Customer): string;
  fetchById(id: string): Customer[];
  fetchAll(): Customer[];
  update(customer: Customer): string;
  delete(id: string): string;
}
