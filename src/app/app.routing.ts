import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer/components/customer-list/customer-list.component';
import { NgModule } from '@angular/core';
import { CustomerFormComponent } from './customer/components/customer-form/customer-form.component';

const routes: Routes = [
  { path: 'edit:id', component: CustomerFormComponent },
  { path: 'new', component: CustomerFormComponent },
  { path: '', component: CustomerListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
