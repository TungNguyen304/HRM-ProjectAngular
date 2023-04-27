import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class InterceptorRequest {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url.includes('/assets/i18n/')) {
      return next.handle(request.clone());
    }
    if (localStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }
    request = request.clone({
      url: environment.apiUrl + request.url,
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        switch (error.status) {
          case 401: {
            localStorage.removeItem('token');
            this.router.navigate(['auth/login']);
            break;
          }
          case 403: {
            this.router.navigate(['forbidden']);
            break;
          }
          default:
            break;
        }
        return throwError(error);
      })
    );
  }
}
