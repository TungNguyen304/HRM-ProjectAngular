import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  delay,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private http: HttpClient) {}
  public provider$ = new BehaviorSubject<any>('');
  getProvider(
    page: number = 1,
    limit: number = 0,
    keyword: string = ''
  ): Observable<Object> {
    this.provider$.next(
      `distributors?page=${page}&limit=${limit}${
        keyword ? `&keyword=${keyword}` : ''
      }`
    );
    return this.provider$.pipe(
      debounceTime(2000),
      switchMap((url) => {
        return this.http.get(url);
      })
    );
    // .get(`distributors?page=${page}&limit=${limit}&keyword=${keyword}`)
    // .pipe(delay(2000));
  }

  getProviderById(id: string): Observable<Object> {
    return this.http.get(`distributors/${id}`);
  }

  addProvider(data: any): Observable<Object> {
    return this.http.post('distributors', data).pipe(delay(2000));
  }

  updateProvider(data: any, id: string): Observable<Object> {
    return this.http.patch(`distributors/${id}`, data);
  }

  deleteProviderById(id: string): Observable<Object> {
    return this.http.post('distributors/delete', {
      ids: [id],
    });
  }
}
