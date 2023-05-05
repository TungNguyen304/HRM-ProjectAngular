import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log(route);
    // this.activatedRoute.queryParams.code
    if (localStorage.getItem('token')) {
      return true;
    } else if (route.routeConfig?.path === 'detail-device/:id/:token') {
      return true;
    }
    return this.router.createUrlTree(['auth', 'login']);
  }
}
