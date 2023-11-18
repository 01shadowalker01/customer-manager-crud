import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CustomerServiceImpl } from './services/customer-service-impl.service';
import { CustomerService } from './interfaces/customer.service';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToErrorMessagesPipe } from './components/customer-form/to-error-messages.pipe';

@NgModule({
  declarations: [
    CustomerFormComponent,
    CustomerListComponent,
    ToErrorMessagesPipe,
  ],
  providers: [
    {
      provide: CustomerService,
      useClass: CustomerServiceImpl,
    },
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSnackBarModule,

    ReactiveFormsModule,
  ],
})
export class CustomerModule {}
