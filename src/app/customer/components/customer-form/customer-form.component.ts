import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer, iCustomer } from '../../models/customer.model';
import { CustomerService } from '../../interfaces/customer.service';
import { Response } from 'src/app/models/response.model';
import { ResponseCode } from 'src/app/models/response-code.enum';
import { EmailValidator } from '../../models/email.model';
import { PhoneNumberValidator } from '../../models/phone-number.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
})
export class CustomerFormComponent implements OnInit {
  @Input() id!: string;
  private currentCustomer: Customer | null = null;

  loading = false;
  form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.setupForm();
    if (this.id) {
      this.setFormValue();
    }
  }

  private setupForm() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      bankAccountNumber: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      email: [null, [Validators.required, EmailValidator()]],
      phoneNumber: [null, [Validators.required, PhoneNumberValidator()]],
    });
  }

  private setFormValue() {
    this.currentCustomer = this.customerService.fetchById(this.id).data;
    if (this.currentCustomer) {
      this.form.setValue({
        firstName: this.currentCustomer.firstName,
        lastName: this.currentCustomer.lastName,
        dateOfBirth: this.currentCustomer.dateOfBirth,
        phoneNumber: this.currentCustomer.phoneNumber,
        email: this.currentCustomer.email,
        bankAccountNumber: this.currentCustomer.bankAccountNumber,
      });
    }
  }

  getErrors(fieldName: keyof iCustomer): string[] {
    return Object.values(this.form.get(fieldName)?.errors || {});
  }

  onSubmit(formValue: iCustomer) {
    this.loading = true;
    if (this.form.valid) {
      const customer = new Customer(formValue);
      setTimeout(() => {
        this.loading = false;
        let resp: Response<string> | null = null;
        if (this.isEditMode()) {
          if (this.currentCustomer) {
            this.currentCustomer.update(formValue);
            resp = this.customerService.update(this.currentCustomer);
          }
        } else {
          resp = this.customerService.insert(customer);
        }
        this.showMessage(resp);
        if (resp && this.isSuccessFull(resp.statusCode)) {
          this.router.navigate(['/']);
        }
      }, 300);
    }
  }

  private isEditMode(): boolean {
    return !!this.id;
  }

  private isSuccessFull(status: ResponseCode): boolean {
    return status === ResponseCode.SUCCESS;
  }

  private showMessage(resp: Response<string> | null) {
    if (!resp) return;

    let message: string = '';
    if (this.isSuccessFull(resp.statusCode)) {
      message = this.isEditMode() ? 'Customer updated.' : 'Customer created.';
    } else {
      message =
        resp.errorMessage ||
        `There was an issue ${
          this.isEditMode() ? 'updating' : 'creating'
        } the customer`;
    }
    this.snackBar.open(message, 'x', {
      duration: 3000,
    });
  }
}
