import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'x-access-token': localStorage.getItem('token')
          ? `Bearer ${localStorage.getItem('token')}`
          : `Bearer ${sessionStorage.getItem('token')}`,
    })

    const reqClone = req.clone({headers});

    return next.handle(reqClone).pipe(
      catchError(({error}: HttpErrorResponse) => {
        return throwError(error)
      })
    );
  }
}
