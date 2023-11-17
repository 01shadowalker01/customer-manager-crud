import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer/components/customer-list/customer-list.component';
import { CustomerFormComponent } from './customer/components/customer-form/customer-form.component';

export const routes: Routes = [
  { path: 'edit:id', component: CustomerFormComponent },
  { path: 'new', component: CustomerFormComponent },
  { path: '', component: CustomerListComponent },
];
