import { Injectable } from '@angular/core';
import { CustomerService } from 'src/app/customer/interfaces/customer.service';
import { Customer } from '../models/customer.model';
import { LocalStorageService } from './local-storage.service';
import { Response } from '../../models/response.model';
import { ResponseCode } from 'src/app/models/response-code.enum';

const LOCAL_STORAGE_KEY = '$CUSTOMERS$';

@Injectable()
export class CustomerServiceImpl implements CustomerService {
  private customers: Customer[] = [];
  private outdated: boolean = false;

  constructor(private localStorageService: LocalStorageService) {
    this.customers = this.getCustomers();
  }

  insert(customer: Customer): Response<string> {
    if (this.isCustomerDuplicate(customer.id))
      return {
        statusCode: ResponseCode.BAD_REQUEST,
        data: '',
      };

    this.customers.push(customer);
    this.saveCustomers();
    return {
      statusCode: ResponseCode.SUCCESS,
      data: customer.id,
    };
  }

  private isCustomerDuplicate(id: string): boolean {
    const resp = this.fetchById(id);
    return resp.statusCode === ResponseCode.SUCCESS ? true : false;
  }

  fetchById(id: string): Response<Customer | null> {
    if (!id)
      return {
        statusCode: ResponseCode.BAD_REQUEST,
        data: null,
      };

    let customers: Customer[] = this.customers;
    if (!this.outdated) customers = this.fetchAll().data;

    const customer = customers.find((customer) => customer.id == id);
    if (!customer) return { statusCode: ResponseCode.NOT_FOUND, data: null };

    return { statusCode: ResponseCode.SUCCESS, data: customer };
  }

  fetchAll(): Response<Customer[]> {
    if (!this.outdated)
      return { statusCode: ResponseCode.SUCCESS, data: this.customers };

    this.customers = this.getCustomers();
    return { statusCode: ResponseCode.SUCCESS, data: [...this.customers] };
  }

  update(updatedCustomer: Customer): Response<string> {
    let customerIndex: number = -1;
    const customer = this.customers.find((customer, i) => {
      customerIndex = i;
      return customer.id == updatedCustomer.id;
    });
    if (!customer)
      return {
        statusCode: ResponseCode.BAD_REQUEST,
        data: '',
      };

    this.customers[customerIndex] = updatedCustomer;
    this.saveCustomers();
    return {
      statusCode: ResponseCode.SUCCESS,
      data: updatedCustomer.id,
    };
  }

  delete(id: string): Response<string> {
    let customerIndex: number = -1;
    const customer = this.customers.find((customer, i) => {
      customerIndex = i;
      return customer.id == id;
    });
    if (!customer)
      return {
        statusCode: ResponseCode.BAD_REQUEST,
        data: '',
      };

    this.customers.splice(customerIndex, 1);
    this.saveCustomers();
    return {
      statusCode: ResponseCode.SUCCESS,
      data: id,
    };
  }

  private saveCustomers() {
    const stringifiedData = JSON.stringify(this.customers);
    this.localStorageService.setItem(LOCAL_STORAGE_KEY, stringifiedData);
    this.outdated = true;
  }

  private getCustomers(): Customer[] {
    const stringifiedData = this.localStorageService.getItem(LOCAL_STORAGE_KEY);
    if (!stringifiedData) return [];

    return this.parseCustomers(stringifiedData);
  }

  private parseCustomers(stringifiedData: string): Customer[] {
    const items = JSON.parse(stringifiedData);
    if (!Array.isArray(items)) throw new Error('Saved customers are invalid.');

    return items.map((item) => new Customer(item));
  }
}
