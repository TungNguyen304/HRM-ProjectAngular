import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  getDevice():Observable<Object> {
    return this.http.get("device");
  }

  getDeviceById(id:number):Observable<Object> {
    return this.http.get(`device/${id}`)
  }
}