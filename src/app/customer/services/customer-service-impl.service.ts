import { Injectable } from '@angular/core';
import { CustomerService } from 'src/app/customer/interfaces/customer.service';
import { Customer } from '../models/customer.model';

const LOCAL_STORAGE_KEY = '$CUSTOMERS$';

@Injectable()
export class CustomerServiceImpl implements CustomerService {
  private customers: Customer[] = [];
  private outdated: boolean = false;

  constructor() {}

  insert(customer: Customer): string {
    this.customers.push(customer);
    this.saveCustomers();
    return customer.id;
  }

  fetchById(id: string): Customer | undefined {
    let customers: Customer[] = this.fetchAll();

    return customers.find((customer) => customer.id == id);
  }

  fetchAll(): Customer[] {
    if (!this.outdated) return this.customers;

    this.customers = this.getCustomers();
    return [...this.customers];
  }

  update(customer: Customer): string {
    throw new Error('Method not implemented.');
  }
  delete(id: string): string {
    throw new Error('Method not implemented.');
  }

  private saveCustomers() {
    const stringifiedData = JSON.stringify(this.customers);
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedData);
    this.outdated = true;
  }

  private getCustomers(): Customer[] {
    const stringifiedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stringifiedData) return [];

    return this.parseCustomers(stringifiedData);
  }

  private parseCustomers(stringifiedData: string): Customer[] {
    const items = JSON.parse(stringifiedData);
    if (!Array.isArray(items)) throw new Error('Saved customers are invalid.');

    return items.map((item) => new Customer(item));
  }
}
