import { Response } from '../../models/response.model';
import { Customer } from '../models/customer.model';

export abstract class CustomerService {
  abstract insert(customer: Customer): Response<string>;
  abstract fetchById(id: string): Response<Customer | null>;
  abstract fetchAll(): Response<Customer[]>;
  abstract update(customer: Customer): Response<string>;
  abstract delete(id: string): Response<string>;
}
