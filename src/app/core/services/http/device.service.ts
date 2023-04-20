import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private http: HttpClient) {}
  public device$ = new BehaviorSubject<any>(null);
  getDevice(
    page: number,
    limit: number,
    keyword: string = '',
    distributor_id: string = '',
    asset_type_id: string = '',
    user_using_id: string = '',
    status: number = 1
  ): Observable<Object> {
    this.device$.next('assets');
    return this.device$.pipe(
      debounceTime(2000),
      switchMap((url) =>
        this.http.get(url, {
          params: {
            page: page,
            limit: limit,
            keyword: keyword,
            distributor_id: distributor_id,
            asset_type_id: asset_type_id,
            user_using_id: user_using_id,
            status: status,
          },
        })
      )
    );
  }

  getDeviceById(id: number): Observable<Object> {
    return this.http.get(`device/${id}`);
  }
}
