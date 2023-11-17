import { Customer } from '../customer/models/customer.model';

export abstract class CustomerService {
  abstract insert(customer: Customer): string;
  abstract fetchById(id: string): Customer | undefined;
  abstract fetchAll(): Customer[];
  abstract update(customer: Customer): string;
  abstract delete(id: string): string;
}
