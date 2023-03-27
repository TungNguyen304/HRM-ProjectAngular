import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorRequest {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if(request.url.includes('/assets/i18n/')) {
        return next.handle(
            request.clone()
        )
    }
    return next.handle(
      request.clone({
        url: 'http://localhost:3000/' + request.url,
      })
    );
  }
}
