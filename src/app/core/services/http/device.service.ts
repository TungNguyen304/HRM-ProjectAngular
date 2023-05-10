import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  delay,
  switchMap,
} from 'rxjs';
import {
  IEmployeeResponse,
  IProviderResponse,
} from 'src/app/shared/interfaces';

interface IDeviceStore {
  type: any[];
  employee: IEmployeeResponse[];
  provider: IProviderResponse[];
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
    status: number = 0,
    distributor_id: string = ''
  ): Observable<object> {
    let url = `assets?page=${page}&limit=${limit}&keyword=${keyword}&user_using_id=${user_using_id}&asset_type_id=${asset_type_id}&distributor_id=${distributor_id}`;
    if (status !== 0) {
      url += `&status=${status}`;
    }
    this.device$.next(url);
    return this.device$.pipe(
      debounceTime(2000),
      switchMap((url) => this.http.get(url))
    );
  }

  getAllDevice(): Observable<object> {
    return this.http.get('assets?page=1&limit=0').pipe(delay(2000));
  }

  getDeviceById(id: number, token?: string): Observable<object> {
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http
        .get(`assets/${id}`, { headers: headers })
        .pipe(delay(2000));
    }
    return this.http.get(`assets/${id}`).pipe(delay(2000));
  }

  getDeviceType(): Observable<object> {
    return this.http.get('assets/types');
  }

  addDevice(data: any): Observable<object> {
    return this.http.post('assets', data);
  }

  updateDevice(data: any, id: string): Observable<object> {
    return this.http.patch(`assets/${id}`, data).pipe(delay(2000));
  }

  deleteDevice(id: string): Observable<object> {
    return this.http
      .post('assets/delete', {
        ids: [id],
      })
      .pipe(delay(2000));
  }

  addRequestBorrow(data: any): Observable<object> {
    return this.http.post('assets/request/create', data).pipe(delay(2000));
  }
}
