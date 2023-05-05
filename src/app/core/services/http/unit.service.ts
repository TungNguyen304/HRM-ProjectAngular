import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  delay,
  Observable,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private http: HttpClient) {}
  public member$ = new BehaviorSubject<any>(null);
  getUnit(): Observable<object> {
    return this.http.get('organization-units').pipe(delay(2000));
  }

  getMemberByUnitId(
    id: string = '',
    page: number = 1,
    limit: number = 0
  ): Observable<object> {
    this.member$.next(`users?page=${page}`);
    return this.member$.pipe(
      debounceTime(2000),
      switchMap((url) => {
        return this.http.get(url, {
          params: {
            organization_unit_id: id,
            limit: limit,
          },
        });
      })
    );
  }
}
