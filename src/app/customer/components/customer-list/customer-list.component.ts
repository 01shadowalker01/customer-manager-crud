import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../interfaces/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit {
  customerList: Customer[] = [];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'phoneNumber',
    'email',
    'bankAccountNumber',
    'action',
  ];

  constructor(public customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerList = this.customerService.fetchAll().data;
    console.log(this.customerList);
  }
}
