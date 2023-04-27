import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  delay,
  switchMap,
} from 'rxjs';
import { LanguageService } from '../state/language.service';
import { ILanguage } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public employee$ = new BehaviorSubject<any>(null);
  public lang: ILanguage;
  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
    this.languageService.language$.subscribe((lang: ILanguage) => {
      this.lang = lang;
    });
  }

  getEmployee(
    page: number = 1,
    limit: number = 0,
    keyword: string = '',
    gender: string = '',
    organization_unit_id: string = '',
    job_position_id: string = '',
    employee_status_id: string = ''
  ): Observable<Object> {
    let url = `users?page=${page}&limit=${limit}&keyword=${keyword}&organization_unit_id=${organization_unit_id}&job_position_id=${job_position_id}`;
    if (gender) {
      url += `&gender=${gender}`;
    }
    if (employee_status_id) {
      url += `&employee_status_id=${employee_status_id}`;
    }
    this.employee$.next(url);
    return this.employee$.pipe(
      debounceTime(2000),
      switchMap((url) => this.http.get(url))
    );
  }

  getAllStaff(): Observable<Object> {
    return this.http.get('users?page=1&limit=0').pipe(delay(2000));
  }

  getEmployeeById(id: string): Observable<Object> {
    return this.http.get(`users/${id}`).pipe(delay(2000));
  }

  deleteEmployeeById(id: string): Observable<Object> {
    return this.http.delete(`users/${id}`).pipe(delay(2000));
  }

  getStatus(): Observable<Object> {
    return this.http.get('users/status/list');
  }

  addEmployee(data: FormData): Observable<Object> {
    return this.http.post(`users?lang=${this.lang}`, data).pipe(delay(2000));
  }

  updateEmployee(id: string, data: FormData): Observable<Object> {
    return this.http.patch(`users/${id}`, data);
  }
}
