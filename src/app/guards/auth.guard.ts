import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // robert.principe36@gmail.co
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const subject = new Subject<boolean>();
    this.authService.isAuthenticated().subscribe(resp => {
      subject.next(resp);
    })
    return subject.pipe(
      map(resp => {
        if (!resp) {
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      })
    )
  }

}
