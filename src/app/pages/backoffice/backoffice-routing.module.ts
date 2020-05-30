import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OnlyAdminComponent } from './only-admin/only-admin.component';
import { AdminGuard } from 'src/app/guards/admin.guard';


const routes: Routes = [
  {path: '', component: BackofficeComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'only-admin', canActivate: [AdminGuard],component: OnlyAdminComponent},
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
