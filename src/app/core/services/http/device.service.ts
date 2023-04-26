import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  delay,
  switchMap,
} from 'rxjs';

interface IDeviceStore {
  type: any[];
  employee: any[];
  provider: any[];
  status: any[];
}

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private http: HttpClient) {}
  public device$ = new BehaviorSubject<any>(null);
  public deviceStore$ = new BehaviorSubject<IDeviceStore>({
    type: [],
    employee: [],
    provider: [],
    status: [],
  });

  getDevice(
    page: number = 1,
    limit: number = 0,
    keyword: string = '',
    user_using_id: string = '',
    asset_type_id: string = '',
    status: number = 1,
    distributor_id: string = ''
  ): Observable<Object> {
    this.device$.next(
      `assets?page=${page}&limit=${limit}&keyword=${keyword}&user_using_id=${user_using_id}&asset_type_id=${asset_type_id}&status=${status}&distributor_id=${distributor_id}`
    );
    return this.device$.pipe(
      debounceTime(2000),
      switchMap((url) =>
        this.http.get(
          url
          //    {
          //   params: {
          //     page: page,
          //     limit: limit,
          //     keyword: keyword,
          //     distributor_id: distributor_id,
          //     asset_type_id: asset_type_id,
          //     user_using_id: user_using_id,
          //     status: status,
          //   },
          // }
        )
      )
    );
  }

  getAllDevice(): Observable<Object> {
    return this.http.get('assets?page=1&limit=0').pipe(delay(2000));
  }

  getDeviceById(id: number): Observable<Object> {
    return this.http.get(`assets/${id}`).pipe(delay(2000));
  }

  getDeviceType(): Observable<Object> {
    return this.http.get('assets/types');
  }

  addDevice(data: any): Observable<Object> {
    return this.http.post('assets', data);
  }

  updateDevice(data: any, id: string): Observable<Object> {
    return this.http.patch(`assets/${id}`, data).pipe(delay(2000));
  }

  deleteDevice(id: string): Observable<Object> {
    return this.http
      .post('assets/delete', {
        ids: [id],
      })
      .pipe(delay(2000));
  }

  addRequestBorrow(data: any): Observable<Object> {
    return this.http.post('assets/request/create', data).pipe(delay(2000));
  }
}
