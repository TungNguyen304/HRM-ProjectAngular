import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public employee$ = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  getEmployee(
    page: number,
    limit: number,
    keyword?: string,
    employee_status_id?: string,
    gender?: string,
    organization_unit_id?: string,
    job_position_id?: string
  ): Observable<Object> {
    this.employee$.next(
      `users?page=${page}&limit=${limit}
      ${keyword ? `&keyword=${keyword}` : ''}
      ${employee_status_id ? `&employee_status_id=${employee_status_id}` : ''}
      ${gender ? `&gender=${gender}` : ''}
      ${organization_unit_id? `&organization_unit_id=${organization_unit_id}`: ''}
      ${job_position_id ? `&job_position_id=${job_position_id}` : ''}`
    );
    return this.employee$.pipe(
      debounceTime(2000),
      switchMap((url) => this.http.get(url))
    );
  }
}
