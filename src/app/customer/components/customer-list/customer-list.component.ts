import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../interfaces/customer.service';
import { Customer } from '../../models/customer.model';
import { ResponseCode } from 'src/app/models/response-code.enum';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit {
  showDeleteMessageOnRow!: string | null;
  loading = false;
  customerList: Customer[] = [];
  filteredCustomerList: Customer[] = [];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'phoneNumber',
    'email',
    'bankAccountNumber',
    'action',
  ];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.customerList = this.customerService.fetchAll().data;
    this.filteredCustomerList = this.customerList;
  }

  onSearch(input: string) {
    const lower = input.toLowerCase();
    this.filteredCustomerList = this.customerList.filter((customer) => {
      return (
        customer.firstName.toLowerCase().includes(lower) ||
        customer.lastName.toLowerCase().includes(lower)
      );
    });
  }

  onDelete(id: string) {
    this.loading = true;
    const resp = this.customerService.delete(id);
    if (resp.statusCode == ResponseCode.SUCCESS) {
      setTimeout(() => {
        this.loading = false;
        this.loadData();
      }, 300);
    }
  }
}
