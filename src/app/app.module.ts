import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomerModule } from './customer/customer.module';
import { routes } from './app.routing';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CustomerModule, RouterModule],
  providers: [provideAnimations(), provideRouter(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
