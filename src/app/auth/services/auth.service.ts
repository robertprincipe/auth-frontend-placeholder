import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = `${environment.url}/auth`;
  status = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any) {
    return this.http.post(`${this.url}/login`, data).pipe(
      map((resp: any) => {
        if (data.remember) {
          localStorage.setItem('token', resp.token);
          sessionStorage.removeItem('token');
        } else {
          sessionStorage.setItem('token', resp.token);
          localStorage.removeItem('token');
        }

        this.router.navigateByUrl('/admin');
        return resp;
      })
    );
  }

  register(data: any) {
    return this.http.post(`${this.url}/register`, data).pipe(
      map(resp => {
        this.router.navigateByUrl('/login');
        return resp;
      })
    );
  }

  checkEmail(email: string) {
    return this.http.post(`${this.url}/check-email`, {email});
  }

  isAuthenticated(): Observable<boolean> {

    this.http.get(`${this.url}/verify-token`).subscribe(resp => {
      if (resp) {
        this.status.next(true);
      } else {
        this.status.next(false);
      }
    }, () => {
      this.status.next(false);
    });

    return this.status;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  get currentUser() {
    let User: any;
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
      const token = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
      if (token) {
        User = jwtDecode(token)
      }
    }

    return User;
  }

}
