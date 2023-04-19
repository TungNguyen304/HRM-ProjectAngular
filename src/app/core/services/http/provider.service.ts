import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, debounceTime, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private http: HttpClient) {}

  getProvider(page: number, limit: number): Observable<Object> {
    return this.http
      .get(`distributors?page=${page}&limit=${limit}`)
      .pipe(delay(2000));
  }

  getProviderById(id: string): Observable<Object> {
    return this.http.get(`distributors/${id}`);
  }

  addProvider(data: any): Observable<Object> {
    return this.http.post('distributors', data);
  }

  updateProvider(data: any, id: string): Observable<Object> {
    return this.http.patch(`distributors/${id}`, data);
  }
}
