import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackofficeComponent } from './backoffice.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [DashboardComponent, BackofficeComponent],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    SharedModule
  ]
})
export class BackofficeModule { }
