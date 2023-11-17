import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerServiceImpl } from './services/customer-service-impl.service';
import { CustomerService } from './interfaces/customer.service';

@NgModule({
  declarations: [CustomerComponent],
  providers: [
    {
      provide: CustomerService,
      useClass: CustomerServiceImpl,
    },
  ],
  imports: [CommonModule],
})
export class CustomerModule {}
