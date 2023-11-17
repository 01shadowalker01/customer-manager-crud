import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatProgressBarModule,
  ],
})
export class CustomerModule {}
