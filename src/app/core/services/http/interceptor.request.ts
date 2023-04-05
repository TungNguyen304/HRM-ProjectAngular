import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class InterceptorRequest {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if(request.url.includes('/assets/i18n/')) {
        return next.handle(
            request.clone()
        )
    }
    if(localStorage.getItem('token')) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    }
    request = request.clone({
      url: environment.apiUrl + request.url
    })
    return next.handle(
      request
    );
  }
}
