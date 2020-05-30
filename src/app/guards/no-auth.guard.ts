import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
      if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
        this.router.navigateByUrl('/admin');
      }

    return true;
  }
}
