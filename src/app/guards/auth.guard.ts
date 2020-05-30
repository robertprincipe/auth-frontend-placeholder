import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const subject = new Subject<boolean>();
    this.authService.isAuthenticated().subscribe(resp => {
      subject.next(resp);
    })
    subject.subscribe(resp => {
      if (!resp) {
        this.router.navigateByUrl('/login');
      }
    });

    return true;
  }

}
