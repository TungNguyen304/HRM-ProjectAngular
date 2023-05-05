import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  delay,
  switchMap,
} from 'rxjs';
import { IProviderRequest } from 'src/app/shared/interfaces';

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
  ): Observable<object> {
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

  getAllProvider(token?: string): Observable<object> {
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http
        .get('distributors?page=1&limit=0', { headers })
        .pipe(delay(2000));
    }
    return this.http.get('distributors?page=1&limit=0').pipe(delay(2000));
  }

  getProviderById(id: string): Observable<object> {
    return this.http.get(`distributors/${id}`);
  }

  addProvider(data: IProviderRequest): Observable<object> {
    return this.http.post('distributors', data).pipe(delay(2000));
  }

  updateProvider(data: IProviderRequest, id: string): Observable<object> {
    return this.http.patch(`distributors/${id}`, data);
  }

  deleteProviderById(id: string): Observable<object> {
    return this.http.post('distributors/delete', {
      ids: [id],
    });
  }
}
