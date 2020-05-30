import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path: '', component: BackofficeComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
