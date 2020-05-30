import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackofficeComponent } from './backoffice.component';
import { SharedModule } from './shared/shared.module';
import { OnlyAdminComponent } from './only-admin/only-admin.component';


@NgModule({
  declarations: [DashboardComponent, BackofficeComponent, OnlyAdminComponent],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    SharedModule
  ]
})
export class BackofficeModule { }
