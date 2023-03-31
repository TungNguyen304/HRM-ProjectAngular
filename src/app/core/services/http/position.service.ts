import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  delay,
  mergeMap,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { IPosition } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  public position$ = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  getPosition(page: number, limit: number, keyword?:string): Observable<Object> {
    this.position$.next(`job-positions?page=${page}&limit=${limit}${keyword ? `&keyword=${keyword}` : ''}`);
    return this.position$.pipe(
      debounceTime(1000),
      switchMap((url) => {
        return this.http.get(url);
      })
    );
  }

  addPosition(data: IPosition): Observable<Object> {
    return this.http.post(`job-positions`, data).pipe(delay(1000));
  }

  updatePosition(data: IPosition, id: string): Observable<Object> {
    return this.http.patch(`job-positions/${id}`, data).pipe(delay(1000));
  }

  deletePosition(id: string[]): Observable<Object> {
    return this.http.post('job-positions/delete', {
      ids: id,
    });
  }
}
