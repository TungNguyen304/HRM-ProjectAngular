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
import { ILanguage, IPosition } from 'src/app/shared/interfaces';
import { LanguageService } from '../state/language.service';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  public position$ = new BehaviorSubject<any>(null);
  public member$ = new BehaviorSubject<any>(null);
  public lang: ILanguage;
  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
    this.languageService.language$.subscribe((lang: ILanguage) => {
      this.lang = lang;
    });
  }

  getPosition(
    page: number,
    limit: number,
    keyword?: string
  ): Observable<Object> {
    this.position$.next(
      `job-positions?page=${page}&limit=${limit}${
        keyword ? `&keyword=${keyword}` : ''
      }`
    );
    return this.position$.pipe(
      debounceTime(1000),
      switchMap((url) => {
        return this.http.get(url);
      })
    );
  }

  getAllPosition(): Observable<Object> {
    return this.http.get('job-positions?page=1&limit=0').pipe(delay(2000));
  }

  getMemberByPositionId(
    id: string = '',
    page: number = 1,
    limit: number = 0
  ): Observable<Object> {
    this.member$.next(
      `users?page=${page}&limit=${limit}&job_position_id=${id}`
    );
    return this.member$.pipe(
      debounceTime(2000),
      switchMap((url) => {
        return this.http.get(url);
      })
    );
  }

  getPositionByUnitId(id: string): Observable<Object> {
    return this.http.get(
      `job-positions?page=1&limit=0&organization_unit_id=${id}`
    );
  }

  addPosition(data: IPosition): Observable<Object> {
    return this.http
      .post(`job-positions?lang=${this.lang}`, data)
      .pipe(delay(1000));
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
