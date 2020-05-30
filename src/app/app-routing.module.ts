import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';


const routes: Routes = [
  {path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./pages/backoffice/backoffice.module')
  .then(m => m.BackofficeModule)},
  {path: '', canActivate: [NoAuthGuard],loadChildren: () => import('./auth/auth.module')
  .then(m => m.AuthModule)},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
