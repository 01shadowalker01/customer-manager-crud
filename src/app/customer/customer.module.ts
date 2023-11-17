import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerServiceImpl } from './services/customer-service-impl.service';
import { CustomerService } from './interfaces/customer.service';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

@NgModule({
  declarations: [CustomerFormComponent, CustomerListComponent],
  providers: [
    {
      provide: CustomerService,
      useClass: CustomerServiceImpl,
    },
  ],
  imports: [CommonModule],
})
export class CustomerModule {}
