import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    const user = this.authService.currentUser;
    if (user.role === 'ADMINISTRATOR') {
      return true;
    }

    this.router.navigateByUrl('/admin/dashboard')
    return false;
  }

}
